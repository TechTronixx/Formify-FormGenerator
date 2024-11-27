export interface FormField {
  id: string;
  type: "text" | "email" | "number" | "textarea" | "radio" | "file" | "select";
  label: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  validation?: {
    pattern?: string;
    message?: string;
    maxSize?: number;
    acceptedTypes?: string[];
  };
}

export interface FormConfig {
  title: string;
  description: string;
  fields: FormField[];
}

export interface Toast {
  title: string;
  description: string;
  variant: "default" | "destructive";
}
