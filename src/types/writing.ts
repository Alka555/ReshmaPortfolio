import { WritingCategory } from "./project";

export interface WritingItem {
  id: string;
  title: string;
  category?: WritingCategory | string;
  categorySlug?: string;
  category_slug?: string;
  summary: string;
  thumbnail?: string;
  externalUrl?: string;
  external_url?: string;
  content?: string;
  featured: boolean;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  projectTitle?: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company?: string;
  avatarUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  isArchived: boolean;
  createdAt: string;
}
