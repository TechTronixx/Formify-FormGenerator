export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  validation?: {
    pattern?: string;
    message?: string;
    min?: number;
    max?: number;
  };
  options?: Array<{
    label: string;
    value: string;
  }>;
}

export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
  validation?: boolean;
  helpText?: boolean;
  placeholders?: boolean;
  author?: string;
}

export interface Toast {
  title: string;
  description: string;
  variant: "default" | "destructive";
}
