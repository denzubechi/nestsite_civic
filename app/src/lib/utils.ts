import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const DEPLOYED_URL = process.env.DEPLOYED_URL;

export { BACKEND_URL,DEPLOYED_URL};
