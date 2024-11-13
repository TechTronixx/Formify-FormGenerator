import { useState } from "react";
import { FormConfig } from "../types/form";
import { generateFormStructure } from "../lib/ai";
import { toast } from "sonner";

export function useFormBuilder(initialConfig: FormConfig) {
  const [config, setConfig] = useState<FormConfig>(initialConfig);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleConfigChange = (newConfig: Partial<FormConfig>) => {
    setConfig((prevConfig: FormConfig) => ({ ...prevConfig, ...newConfig }));
  };

  const handleAIGenerate = async (prompt: string) => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for your form");
      return;
    }

    setIsGenerating(true);
    try {
      const generatedForm = await generateFormStructure(prompt);
      handleConfigChange({
        ...generatedForm,
        fields: generatedForm.fields?.map((field: any) => ({
          ...field,
          id: field.id || crypto.randomUUID(),
        })),
      });
      toast.success("Form structure generated successfully!");
    } catch (error) {
      toast.error("Failed to generate form structure");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    config,
    isGenerating,
    handleConfigChange,
    handleAIGenerate,
  };
}
