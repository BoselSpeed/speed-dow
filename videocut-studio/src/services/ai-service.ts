import type { Subtitle } from "@/services/subtitle-service";

export interface AITranslationResult {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  confidence: number;
}

export interface AISceneDetectionResult {
  scenes: {
    startTime: number;
    endTime: number;
    confidence: number;
    type: string;
  }[];
}

export interface AISummaryResult {
  summary: string;
  keyMoments: { time: number; description: string }[];
  duration: number;
}

export interface AITitleSuggestion {
  titles: string[];
}

export interface AIEnhancementResult {
  original: number;
  enhanced: number;
  improvement: string;
}

export class AIService {
  private static instance: AIService;
  private demoSettings = {
    enabled: true,
    mockDelay: 500,
  };

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private mockDelay(ms = this.demoSettings.mockDelay): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async autoTranslate(
    text: string,
    sourceLang: string,
    targetLang: string
  ): Promise<AITranslationResult> {
    await this.mockDelay();

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    const mockTranslations: Record<string, string> = {
      "en-es": `[ES] ${text}`,
      "en-fr": `[FR] ${text}`,
      "en-de": `[DE] ${text}`,
      "en-ja": `[JA] ${text}`,
      "en-zh": `[ZH] ${text}`,
      "en-ko": `[KO] ${text}`,
      "en-pt": `[PT] ${text}`,
      "en-it": `[IT] ${text}`,
      "en-ru": `[RU] ${text}`,
      "en-ar": `[AR] ${text}`,
    };

    const key = `${sourceLang}-${targetLang}`;
    const translatedText = mockTranslations[key] || `[${targetLang.toUpperCase()}] ${text}`;

    return {
      translatedText,
      sourceLang,
      targetLang,
      confidence: 0.85 + Math.random() * 0.15,
    };
  }

  async removeSilence(audioUrl: string): Promise<{ audioUrl: string; removedSegments: { start: number; end: number }[] }> {
    await this.mockDelay(1000);

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    const removedSegments = [
      { start: 2.5, end: 5.3 },
      { start: 12.1, end: 15.8 },
      { start: 23.4, end: 28.9 },
    ];

    return {
      audioUrl,
      removedSegments,
    };
  }

  async detectScenes(videoUrl: string): Promise<AISceneDetectionResult> {
    await this.mockDelay(1500);

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    const scenes = [
      { startTime: 0, endTime: 5.2, confidence: 0.95, type: "scene_change" },
      { startTime: 5.2, endTime: 12.8, confidence: 0.92, type: "scene_change" },
      { startTime: 12.8, endTime: 18.5, confidence: 0.88, type: "scene_change" },
      { startTime: 18.5, endTime: 25.0, confidence: 0.91, type: "scene_change" },
    ];

    return { scenes };
  }

  async generateSummary(videoUrl: string): Promise<AISummaryResult> {
    await this.mockDelay(2000);

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    return {
      summary:
        "This video covers key topics including introduction, main discussion points, and conclusion. The content is informative and well-structured.",
      keyMoments: [
        { time: 0, description: "Introduction and overview" },
        { time: 5, description: "Main topic begins" },
        { time: 15, description: "Key insight revealed" },
        { time: 25, description: "Conclusion and summary" },
      ],
      duration: 30,
    };
  }

  async suggestTitles(videoUrl: string): Promise<AITitleSuggestion> {
    await this.mockDelay();

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    return {
      titles: [
        "The Ultimate Guide to Understanding This Topic",
        "Everything You Need to Know in 5 Minutes",
        "Expert Insights and Key Takeaways",
        "A Deep Dive Into the Subject Matter",
        "Unlocking the Secrets Behind This Video",
      ],
    };
  }

  async enhanceAudio(audioUrl: string): Promise<AIEnhancementResult> {
    await this.mockDelay(1000);

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    return {
      original: 0.6,
      enhanced: 0.9,
      improvement: "Audio clarity improved by reducing background noise and normalizing volume levels",
    };
  }

  async removeNoise(audioUrl: string): Promise<{ audioUrl: string; noiseLevel: number }> {
    await this.mockDelay(800);

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    return {
      audioUrl,
      noiseLevel: 0.15,
    };
  }

  async textToSpeech(text: string): Promise<{ audioUrl: string; duration: number }> {
    await this.mockDelay(500);

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    const duration = text.length * 0.05;

    return {
      audioUrl: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2LkYuAf3FydI6Qj4uBfH+Bk5GOjoF9f4OUkpKSgH1/gJKSkpCAfX+AkpKSkYB9f4CQkpKQgH1/gJCQkJC",
      duration,
    };
  }

  async changeBackground(
    videoFrame: string,
    background: string
  ): Promise<{ imageUrl: string; confidence: number }> {
    await this.mockDelay(2000);

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    return {
      imageUrl: videoFrame,
      confidence: 0.82,
    };
  }

  async autoCaption(videoUrl: string): Promise<Subtitle[]> {
    await this.mockDelay(1500);

    if (!this.demoSettings.enabled) {
      throw new Error("AI features are disabled in production");
    }

    const subtitles = [
      {
        id: crypto.randomUUID(),
        index: 1,
        startTime: 0,
        endTime: 5,
        text: "[Auto-generated caption] Welcome to this video.",
      },
      {
        id: crypto.randomUUID(),
        index: 2,
        startTime: 5,
        endTime: 12,
        text: "[Auto-generated caption] Today we'll be discussing important topics.",
      },
      {
        id: crypto.randomUUID(),
        index: 3,
        startTime: 12,
        endTime: 20,
        text: "[Auto-generated caption] Let's dive into the details.",
      },
    ];

    return subtitles;
  }

  isEnabled(): boolean {
    return this.demoSettings.enabled;
  }

  setEnabled(enabled: boolean): void {
    this.demoSettings.enabled = enabled;
  }
}

export const aiService = AIService.getInstance();
