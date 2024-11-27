import { FormConfig, FormField } from "../types/form";

export function validateFormConfig(config: FormConfig): string[] {
  const errors: string[] = [];

  // Combine basic validations
  if (!config.title.trim() || config.title.length > 100) {
    errors.push("Form title is required and must be less than 100 characters");
  }

  if ((config.description?.length ?? 0) > 500) {
    errors.push("Form description must be less than 500 characters");
  }

  if (!config.fields?.length) {
    errors.push("At least one form field is required");
    return errors; // Early return if no fields
  }

  // Validate fields using a map of validation rules
  const fieldValidations: Record<
    string,
    (field: FormField, index: number) => string | null
  > = {
    email: (field, index) =>
      !field.validation
        ? `Email field #${index + 1} requires validation`
        : null,
    number: (field, index) => {
      if (
        typeof field.min === "number" &&
        typeof field.max === "number" &&
        field.min > field.max
      ) {
        return `Field #${
          index + 1
        }: minimum value cannot be greater than maximum`;
      }
      return null;
    },
    select: (field, index) =>
      !field.options?.length
        ? `Field #${index + 1} requires at least one option`
        : null,
    radio: (field, index) =>
      !field.options?.length
        ? `Field #${index + 1} requires at least one option`
        : null,
    checkbox: (field, index) =>
      !field.options?.length
        ? `Field #${index + 1} requires at least one option`
        : null,
  };

  config.fields.forEach((field, index) => {
    if (!field.name || !field.type) {
      errors.push(`Field #${index + 1} requires name and type`);
    }

    const validation = fieldValidations[field.type];
    if (validation) {
      const error = validation(field, index);
      if (error) errors.push(error);
    }
  });

  return errors;
}
