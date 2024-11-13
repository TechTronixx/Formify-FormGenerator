export const FORM_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  NUMBER: "number",
  TEXTAREA: "textarea",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
} as const;

export const AI_MODELS = {
  CLAUDE: "claude-3-sonnet-20240229",
  GPT4: "gpt-4-turbo-preview",
} as const;

export const TOAST_VARIANTS = {
  DEFAULT: "default",
  DESTRUCTIVE: "destructive",
} as const;
