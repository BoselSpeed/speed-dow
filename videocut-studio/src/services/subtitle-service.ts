export interface Subtitle {
  id: string;
  index: number;
  startTime: number;
  endTime: number;
  text: string;
  style?: SubtitleStyle;
}

export interface SubtitleStyle {
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  alignment: "left" | "center" | "right";
  position: { x: number; y: number };
}

export class SubtitleService {
  private static instance: SubtitleService;

  static getInstance(): SubtitleService {
    if (!SubtitleService.instance) {
      SubtitleService.instance = new SubtitleService();
    }
    return SubtitleService.instance;
  }

  parseSRT(text: string): Subtitle[] {
    const subtitles: Subtitle[] = [];
    const blocks = text.trim().split(/\n\s*\n/);

    for (const block of blocks) {
      const lines = block.trim().split("\n");
      if (lines.length < 3) continue;

      const indexMatch = lines[0]?.match(/^\d+$/);
      const timeMatch = lines[1]?.match(
        /(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/
      );

      if (!indexMatch || !timeMatch) continue;

      const index = parseInt(lines[0], 10);
      const [, startH, startM, startS, startMS, endH, endM, endS, endMS] = timeMatch;
      const content = lines.slice(2).join("\n").replace(/<[^>]+>/g, "");

      subtitles.push({
        id: crypto.randomUUID(),
        index,
        startTime: this.srtTimeToSeconds(parseInt(startH), parseInt(startM), parseInt(startS), parseInt(startMS)),
        endTime: this.srtTimeToSeconds(parseInt(endH), parseInt(endM), parseInt(endS), parseInt(endMS)),
        text: content.trim(),
      });
    }

    return subtitles.sort((a, b) => a.startTime - b.startTime);
  }

  parseVTT(text: string): Subtitle[] {
    const subtitles: Subtitle[] = [];
    const lines = text.split("\n");
    let index = 0;
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (line === "WEBVTT" || line === "" || line.startsWith("NOTE")) {
        i++;
        continue;
      }

      const timeMatch = line.match(
        /(\d{2}):(\d{2}):(\d{2})[.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[.](\d{3})/
      );

      if (timeMatch) {
        const [, startH, startM, startS, startMS, endH, endM, endS, endMS] = timeMatch;
        const contentLines: string[] = [];
        i++;

        while (
          i < lines.length &&
          lines[i].trim() !== "" &&
          !lines[i].match(/^\d{2}:\d{2}:\d{2}/)
        ) {
          contentLines.push(lines[i].trim().replace(/<[^>]+>/g, ""));
          i++;
        }

        subtitles.push({
          id: crypto.randomUUID(),
          index: ++index,
          startTime: this.vttTimeToSeconds(parseInt(startH), parseInt(startM), parseInt(startS), parseInt(startMS)),
          endTime: this.vttTimeToSeconds(parseInt(endH), parseInt(endM), parseInt(endS), parseInt(endMS)),
          text: contentLines.join("\n").trim(),
        });
      } else {
        i++;
      }
    }

    return subtitles.sort((a, b) => a.startTime - b.startTime);
  }

  exportSRT(subtitles: Subtitle[]): string {
    return subtitles
      .map((subtitle, index) => {
        const start = this.secondsToSRTTime(subtitle.startTime);
        const end = this.secondsToSRTTime(subtitle.endTime);
        const text = subtitle.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        return `${index + 1}\n${start} --> ${end}\n${text}`;
      })
      .join("\n\n");
  }

  exportVTT(subtitles: Subtitle[]): string {
    const srtContent = subtitles
      .map((subtitle, index) => {
        const start = this.secondsToVTTTime(subtitle.startTime);
        const end = this.secondsToVTTTime(subtitle.endTime);
        const text = subtitle.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        return `${index + 1}\n${start} --> ${end}\n${text}`;
      })
      .join("\n\n");

    return `WEBVTT\n\n${srtContent}`;
  }

  burnSubtitles(
    ctx: CanvasRenderingContext2D,
    subtitles: Subtitle[],
    currentTime: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const activeSubtitles = subtitles.filter(
      (subtitle) => currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
    );

    for (const subtitle of activeSubtitles) {
      const style = subtitle.style || {
        fontSize: 24,
        fontFamily: "Arial",
        color: "#FFFFFF",
        backgroundColor: "#000000",
        alignment: "center" as const,
        position: { x: 50, y: 90 },
      };

      ctx.font = `${style.fontSize}px ${style.fontFamily}`;
      ctx.textAlign = style.alignment;
      ctx.textBaseline = "middle";

      const x = (style.position.x / 100) * canvasWidth;
      const y = (style.position.y / 100) * canvasHeight;

      const lines = subtitle.text.split("\n");
      const lineHeight = style.fontSize * 1.2;
      const totalHeight = lines.length * lineHeight;

      lines.forEach((line, index) => {
        const lineY = y - totalHeight / 2 + index * lineHeight;

        ctx.fillStyle = style.backgroundColor;
        const metrics = ctx.measureText(line);
        const padding = 8;
        ctx.fillRect(
          x - metrics.width / 2 - padding,
          lineY - style.fontSize / 2 - padding / 2,
          metrics.width + padding * 2,
          style.fontSize + padding
        );

        ctx.fillStyle = style.color;
        ctx.fillText(line, x, lineY);
      });
    }
  }

  private srtTimeToSeconds(hours: number, minutes: number, seconds: number, milliseconds: number): number {
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  }

  private vttTimeToSeconds(hours: number, minutes: number, seconds: number, milliseconds: number): number {
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  }

  private secondsToSRTTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
  }

  private secondsToVTTTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
  }

  createSubtitle(
    text: string,
    startTime: number,
    endTime: number,
    style?: SubtitleStyle
  ): Subtitle {
    return {
      id: crypto.randomUUID(),
      index: 0,
      startTime,
      endTime,
      text,
      style: style ? {
        fontSize: style.fontSize,
        fontFamily: style.fontFamily,
        color: style.color,
        backgroundColor: style.backgroundColor,
        alignment: style.alignment,
        position: style.position,
      } : undefined,
    };
  }

  mergeSubtitles(subtitles1: Subtitle[], subtitles2: Subtitle[]): Subtitle[] {
    const merged = [...subtitles1, ...subtitles2];
    return merged.sort((a, b) => a.startTime - b.startTime);
  }

  splitSubtitle(subtitle: Subtitle, splitTime: number): Subtitle[] {
    if (splitTime <= subtitle.startTime || splitTime >= subtitle.endTime) {
      return [subtitle];
    }

    return [
      {
        ...subtitle,
        id: crypto.randomUUID(),
        endTime: splitTime,
      },
      {
        ...subtitle,
        id: crypto.randomUUID(),
        startTime: splitTime,
      },
    ];
  }

  getDefaultStyle(): SubtitleStyle {
    return {
      fontSize: 24,
      fontFamily: "Arial",
      color: "#FFFFFF",
      backgroundColor: "#000000",
      alignment: "center",
      position: { x: 50, y: 90 },
    };
  }
}

export const subtitleService = SubtitleService.getInstance();
