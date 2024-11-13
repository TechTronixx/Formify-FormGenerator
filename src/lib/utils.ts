import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormConfig } from "../types/form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ValidationResult {
  success: boolean;
  error?: string;
}

export function validateFormConfig(
  config: Partial<FormConfig>
): ValidationResult {
  try {
    if (config.title && typeof config.title !== "string") {
      return { success: false, error: "Title must be a string" };
    }

    if (config.description && typeof config.description !== "string") {
      return { success: false, error: "Description must be a string" };
    }

    if (config.author && typeof config.author !== "string") {
      return { success: false, error: "Author must be a string" };
    }

    if (
      config.validation !== undefined &&
      typeof config.validation !== "boolean"
    ) {
      return { success: false, error: "Validation must be a boolean" };
    }

    if (config.helpText !== undefined && typeof config.helpText !== "boolean") {
      return { success: false, error: "Help text must be a boolean" };
    }

    if (
      config.placeholders !== undefined &&
      typeof config.placeholders !== "boolean"
    ) {
      return { success: false, error: "Placeholders must be a boolean" };
    }

    if (config.fields && !Array.isArray(config.fields)) {
      return { success: false, error: "Fields must be an array" };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "Invalid configuration format" };
  }
}
