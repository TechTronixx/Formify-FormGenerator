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
  validation?: {
    pattern?: string;
    message?: string;
  };
}

export async function generateFormStructure(
  prompt: string
): Promise<FormConfig> {
  const systemPrompt = `You are a form generation assistant. Generate a form structure based on the user's description.
  The response should be valid JSON with the following structure:
  {
    "title": "Form Title",
    "description": "Form Description",
    "fields": [
      {
        "type": "text|email|number|textarea",
        "label": "Field Label",
        "required": boolean,
        "placeholder": "Optional Placeholder",
        "helpText": "Optional Help Text",
        "validation": { "pattern": "optional", "message": "optional" }
      }
    ]
  }`;

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
          inputs: [systemPrompt, prompt].join("\n"),
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

    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const formConfig = JSON.parse(jsonMatch[0]);

    if (!formConfig.title || !Array.isArray(formConfig.fields)) {
      throw new Error("Invalid form structure received");
    }

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
