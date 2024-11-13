import { FormConfig, FormField } from "../types/form";

export function validateFormConfig(config: FormConfig): string[] {
  const errors: string[] = [];

  // Validate basic requirements
  if (!config.title.trim()) {
    errors.push("Form title is required");
  }

  if (config.title.length > 100) {
    errors.push("Form title must be less than 100 characters");
  }

  if (config.description && config.description.length > 500) {
    errors.push("Form description must be less than 500 characters");
  }

  // Validate fields
  if (!config.fields || config.fields.length === 0) {
    errors.push("At least one form field is required");
  }

  // Validate individual fields
  config.fields?.forEach((field: FormField, index: number) => {
    if (!field.name) {
      errors.push(`Field #${index + 1} requires a name`);
    }

    if (!field.type) {
      errors.push(`Field #${index + 1} requires a type`);
    }

    if (field.required === undefined) {
      errors.push(`Field #${index + 1} must specify if it's required`);
    }

    // Validate specific field types
    switch (field.type) {
      case "email":
        if (!field.validation) {
          errors.push(`Email field #${index + 1} requires validation`);
        }
        break;
      case "number":
        if (
          field.min !== undefined &&
          field.max !== undefined &&
          field.min > field.max
        ) {
          errors.push(
            `Field #${index + 1}: minimum value cannot be greater than maximum`
          );
        }
        break;
      case "select":
      case "radio":
      case "checkbox":
        if (!field.options || field.options.length === 0) {
          errors.push(`Field #${index + 1} requires at least one option`);
        }
        break;
    }
  });

  return errors;
}
