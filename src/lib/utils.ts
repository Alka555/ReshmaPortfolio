import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single merged Tailwind class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a raw date string into an editorial date representation (e.g. "2024").
 */
export function formatDateYear(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

/**
 * Parses YouTube video URL or ID to return standard embed URL.
 */
export function getYouTubeEmbedUrl(urlOrId: string): string {
  if (!urlOrId) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrId.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : urlOrId;
  return `https://www.youtube.com/embed/${videoId}`;
}
