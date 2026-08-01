export type WorkCategory = "ad-films" | "product-videos" | "instagram-reels";
export type WritingCategory = "blogs" | "creative-writing" | "scripts" | "screenplays";

export interface ProjectNarrative {
  challenge?: string;
  idea?: string;
  execution?: string;
  outcome?: string;
}

export interface ProjectMediaItem {
  id: string;
  projectId: string;
  mediaUrl: string;
  caption?: string;
  displayOrder: number;
  mediaType: "image" | "video";
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  year: number;
  category: WorkCategory;
  description: string;
  narrative?: ProjectNarrative;
  thumbnail: string;
  videoUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  media?: ProjectMediaItem[];
}
