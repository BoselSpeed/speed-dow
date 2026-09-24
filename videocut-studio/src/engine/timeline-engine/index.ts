import type { Track, Clip, Project, SnapPoint, DropResult } from "@/types";
import { TIMELINE_CONSTANTS, SNAP_THRESHOLD } from "@/utils/constants";

export interface TimelineEngineOptions {
  zoom: number;
  scrollLeft: number;
  snapEnabled: boolean;
  showGrid: boolean;
}

export interface ClipDragResult {
  clip: Clip;
  newTrackId: string;
  newStart: number;
  originalTrackId: string;
  originalStart: number;
}

export class TimelineEngine {
  private static instance: TimelineEngine;
  private project: Project | null = null;
  private options: TimelineEngineOptions;
  private currentDrag: ClipDragResult | null = null;
  private zoom = 1;
  private scrollLeft = 0;

  static getInstance(): TimelineEngine {
    if (!TimelineEngine.instance) {
      TimelineEngine.instance = new TimelineEngine();
    }
    return TimelineEngine.instance;
  }

  constructor(options?: Partial<TimelineEngineOptions>) {
    this.options = {
      zoom: options?.zoom ?? 1,
      scrollLeft: options?.scrollLeft ?? 0,
      snapEnabled: options?.snapEnabled ?? true,
      showGrid: options?.showGrid ?? false,
    };
    this.zoom = this.options.zoom;
  }

  setProject(project: Project): void {
    this.project = project;
  }

  setOptions(options: Partial<TimelineEngineOptions>): void {
    this.options = { ...this.options, ...options };

    if (options.zoom !== undefined) {
      this.zoom = options.zoom;
    }

    if (options.scrollLeft !== undefined) {
      this.scrollLeft = options.scrollLeft;
    }
  }

  getTracks(): Track[] {
    if (!this.project) return [];
    return [...this.project.tracks].sort((a, b) => a.order - b.order);
  }

  getTrackById(trackId: string): Track | undefined {
    return this.project?.tracks.find((track) => track.id === trackId);
  }

  getClipById(clipId: string): { clip: Clip; trackId: string } | null {
    if (!this.project) return null;

    for (const track of this.project.tracks) {
      const clip = track.clips.find((c) => c.id === clipId);
      if (clip) {
        return { clip, trackId: track.id };
      }
    }

    return null;
  }

  getClipsAtTime(time: number): { clip: Clip; trackId: string }[] {
    if (!this.project) return [];

    const result: { clip: Clip; trackId: string }[] = [];

    for (const track of this.project.tracks) {
      for (const clip of track.clips) {
        if (time >= clip.start && time < clip.start + clip.duration) {
          result.push({ clip, trackId: track.id });
        }
      }
    }

    return result;
  }

  getDuration(): number {
    if (!this.project) return 0;

    let maxEnd = 0;

    for (const track of this.project.tracks) {
      for (const clip of track.clips) {
        const clipEnd = clip.start + clip.duration;
        if (clipEnd > maxEnd) {
          maxEnd = clipEnd;
        }
      }
    }

    return Math.max(maxEnd, this.project.duration);
  }

  timeToPixel(time: number): number {
    return time * TIMELINE_CONSTANTS.TRACK_HEIGHT * this.zoom;
  }

  pixelToTime(pixel: number): number {
    return pixel / (TIMELINE_CONSTANTS.TRACK_HEIGHT * this.zoom);
  }

  getTrackAtPosition(y: number): Track | null {
    if (!this.project) return null;

    const tracks = this.getTracks();
    const trackIndex = Math.floor(y / TIMELINE_CONSTANTS.TRACK_HEIGHT);

    if (trackIndex >= 0 && trackIndex < tracks.length) {
      return tracks[trackIndex];
    }

    return null;
  }

  getSnapPoints(): SnapPoint[] {
    if (!this.project || !this.options.snapEnabled) {
      return [];
    }

    const points: SnapPoint[] = [];

    for (const track of this.project.tracks) {
      for (const clip of track.clips) {
        points.push({
          time: clip.start,
          trackId: track.id,
          type: "clip-start",
        });
        points.push({
          time: clip.start + clip.duration,
          trackId: track.id,
          type: "clip-end",
        });
      }
    }

    return points;
  }

  findSnapPoint(time: number, trackId?: string): SnapPoint | null {
    if (!this.options.snapEnabled) {
      return null;
    }

    const snapPoints = this.getSnapPoints();
    const threshold = SNAP_THRESHOLD / this.zoom;

    let closest: SnapPoint | null = null;
    let closestDistance = threshold;

    for (const point of snapPoints) {
      if (trackId && point.trackId !== trackId) {
        continue;
      }

      const distance = Math.abs(point.time - time);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = point;
      }
    }

    return closest;
  }

  canMoveClip(clipId: string, newTrackId: string, newStart: number): boolean {
    const clipInfo = this.getClipById(clipId);
    if (!clipInfo || !this.project) return false;

    const track = this.getTrackById(newTrackId);
    if (!track) return false;

    if (track.locked) return false;
    if ((clipInfo.clip as { locked?: boolean }).locked) return false;

    const duration = clipInfo.clip.duration;
    const newEnd = newStart + duration;

    for (const otherClip of track.clips) {
      if (otherClip.id === clipId) continue;
      if (otherClip.locked) continue;

      const otherEnd = otherClip.start + otherClip.duration;

      if (newStart < otherEnd && newEnd > otherClip.start) {
        return false;
      }
    }

    return true;
  }

  moveClip(clipId: string, newTrackId: string, newStart: number): ClipDragResult | null {
    if (!this.project) return null;

    const clipInfo = this.getClipById(clipId);
    if (!clipInfo) return null;

    if (!this.canMoveClip(clipId, newTrackId, newStart)) {
      return null;
    }

    const snapPoint = this.findSnapPoint(newStart, newTrackId);
    if (snapPoint) {
      newStart = snapPoint.time;
    }

    const result: ClipDragResult = {
      clip: clipInfo.clip,
      newTrackId,
      newStart: Math.max(0, newStart),
      originalTrackId: clipInfo.trackId,
      originalStart: clipInfo.clip.start,
    };

    this.currentDrag = result;
    return result;
  }

  trimClip(clipId: string, trimType: "start" | "end", deltaTime: number): { newStart: number; newDuration: number } | null {
    const clipInfo = this.getClipById(clipId);
    if (!clipInfo || !this.project) return null;

    const clip = clipInfo.clip;
    const track = this.getTrackById(clipInfo.trackId);
    if (!track || track.locked || clip.locked) return null;

    let newStart = clip.start;
    let newDuration = clip.duration;

    if (trimType === "start") {
      newStart = Math.max(0, clip.start + deltaTime);
      newDuration = clip.start + clip.duration - newStart;

      if (newDuration < 0.1) {
        newDuration = 0.1;
        newStart = clip.start + clip.duration - 0.1;
      }
    } else if (trimType === "end") {
      newDuration = Math.max(0.1, clip.duration + deltaTime);
    }

    const snapPoint = this.findSnapPoint(newStart, clipInfo.trackId);
    if (snapPoint && trimType === "start") {
      newStart = snapPoint.time;
      newDuration = clip.start + clip.duration - newStart;
    }

    return { newStart, newDuration };
  }

  getClipsInRect(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): { clip: Clip; trackId: string }[] {
    if (!this.project) return [];

    const results: { clip: Clip; trackId: string }[] = [];
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    const startTime = this.pixelToTime(minX);
    const endTime = this.pixelToTime(maxX);

    for (const track of this.project.tracks) {
      const trackTop = track.order * TIMELINE_CONSTANTS.TRACK_HEIGHT;
      const trackBottom = trackTop + TIMELINE_CONSTANTS.TRACK_HEIGHT;

      if (trackBottom < minY || trackTop > maxY) continue;

      for (const clip of track.clips) {
        const clipStart = clip.start;
        const clipEnd = clip.start + clip.duration;

        if (clipStart < endTime && clipEnd > startTime) {
          results.push({ clip, trackId: track.id });
        }
      }
    }

    return results;
  }

  getZoom(): number {
    return this.zoom;
  }

  setZoom(zoom: number): void {
    this.zoom = Math.max(0.1, Math.min(10, zoom));
    this.options.zoom = this.zoom;
  }

  getScrollLeft(): number {
    return this.scrollLeft;
  }

  setScrollLeft(scrollLeft: number): void {
    this.scrollLeft = Math.max(0, scrollLeft);
    this.options.scrollLeft = this.scrollLeft;
  }

  getPlayheadPosition(time: number): number {
    return this.timeToPixel(time) - this.scrollLeft;
  }

  getTimeAtPlayhead(playheadX: number): number {
    return this.pixelToTime(playheadX + this.scrollLeft);
  }

  getDropResult(
    clientX: number,
    clientY: number,
    files?: File[]
  ): DropResult | null {
    if (!this.project) return null;

    const track = this.getTrackAtPosition(clientY);
    if (!track) return null;

    const time = this.pixelToTime(clientX);

    return {
      trackId: track.id,
      start: Math.max(0, time),
      duration: 5,
    };
  }

  getGridLines(): { time: number; x: number }[] {
    if (!this.project || !this.options.showGrid) {
      return [];
    }

    const lines: { time: number; x: number }[] = [];
    const interval = 1 / this.zoom;

    for (let time = 0; time <= this.project.duration; time += interval) {
      lines.push({
        time,
        x: this.timeToPixel(time),
      });
    }

    return lines;
  }

  getVisibleRange(): { startTime: number; endTime: number } {
    const timelineWidth = this.project?.width || 1920;
    const startTime = this.pixelToTime(this.scrollLeft);
    const endTime = this.pixelToTime(this.scrollLeft + timelineWidth);

    return {
      startTime: Math.max(0, startTime),
      endTime: Math.min(this.getDuration(), endTime),
    };
  }

  isClipVisible(clip: Clip): boolean {
    const range = this.getVisibleRange();
    const clipEnd = clip.start + clip.duration;

    return clip.start < range.endTime && clipEnd > range.startTime;
  }

  dispose(): void {
    this.project = null;
    this.currentDrag = null;
  }
}

export const timelineEngine = TimelineEngine.getInstance();
