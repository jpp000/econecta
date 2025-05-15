import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S*?v=|(?:v|embed)\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);

  return match ? match[1] : null;
}

