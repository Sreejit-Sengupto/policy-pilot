import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseKestraOutput = (data: any) => {
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
    try {
      return JSON.parse(data[0]);
    } catch (e) {
      console.error("Failed to parse inner JSON string:", e);
    }
  }
  return data;
};
