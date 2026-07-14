export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProblemItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  imageUrl: string;
}

export interface HotspotItem {
  id: string;
  name: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
  detail: string;
}

export interface ComparisonRow {
  feature: string;
  luxAir: string;
  isLuxBetter: boolean;
  cheapHandheld: string;
  traditionalVac: string;
}

export interface BeforeAfterScenario {
  id: string;
  title: string;
  beforeImg: string;
  afterImg: string;
  labelBefore: string;
  labelAfter: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatarUrl: string;
  verified: boolean;
  date: string;
}

export interface TikTokVideoItem {
  id: string;
  title: string;
  views: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
