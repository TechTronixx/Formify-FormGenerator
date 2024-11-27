export interface FormField {
  type: "text" | "email" | "number" | "select" | "radio" | "checkbox";
  name: string;
  label?: string;
  validation?: {
    required?: boolean;
    pattern?: string;
    message?: string;
  };
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  min?: number;
  max?: number;
}

export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
}

export interface Toast {
  title: string;
  description: string;
  variant: "default" | "destructive";
}
