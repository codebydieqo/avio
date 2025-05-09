import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DM_Serif_Display } from "next/font/google";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export { cn, dmSerifDisplay };
