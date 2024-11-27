import { FormConfig } from "../types/form";

const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const MODEL_NAME = "Qwen/Qwen2.5-Coder-32B-Instruct";

// Define the field interface to type the map function parameter
interface GeneratedField {
  id?: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[]; // for radio/select fields
  validation?: {
    pattern?: string;
    message?: string;
    maxSize?: number; // for file uploads
    acceptedTypes?: string[]; // for file uploads
  };
}

const systemPrompt = `You are an advanced form generation assistant. Generate a sophisticated and user-friendly form structure based on the user's description.

Guidelines for form generation:
1. Analyze the context and purpose of the form carefully
2. Include appropriate validation rules and helpful error messages
3. Use clear, concise labels and descriptive help text
4. Consider user experience and accessibility

Respond with a JSON object containing:
- title: string
- description: string
- fields: array of field objects with:
  - type: "text" | "email" | "number" | "textarea" | "radio" | "file" | "select"
  - label: string
  - required: boolean
  - placeholder?: string
  - helpText?: string
  - options?: string[] (for radio/select)
  - validation?: {
      pattern?: string
      message?: string
      maxSize?: number
      acceptedTypes?: string[]
    }`;

export async function generateFormStructure(
  prompt: string
): Promise<FormConfig> {
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL_NAME}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: `${systemPrompt}\n\nUser request: ${prompt}\n\nRespond with valid JSON only:`,
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.7,
            top_p: 0.9,
            return_full_text: false,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate form structure");
    }

    const data = await response.json();
    const generatedText = Array.isArray(data)
      ? data[0].generated_text
      : data.generated_text;

    if (!generatedText) {
      throw new Error("No generated text received from API");
    }

    // Clean up the response text to ensure valid JSON
    const cleanedText = generatedText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON object
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const formConfig = JSON.parse(jsonMatch[0]);

    // Validate the structure
    if (!formConfig.title || !Array.isArray(formConfig.fields)) {
      throw new Error("Invalid form structure received");
    }

    // Add IDs to fields and return
    return {
      ...formConfig,
      fields: formConfig.fields.map((field: GeneratedField) => ({
        ...field,
        id: field.id || crypto.randomUUID(),
      })),
    };
  } catch (error) {
    console.error("Form generation error:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to generate form structure");
  }
}
