import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import { FormConfig } from "../../types/form";
import { Card } from "../ui/card";
import { Label } from "../ui/label";

interface BuildTabProps {
  config: FormConfig;
  isGenerating: boolean;
  onGenerate: (prompt: string) => Promise<void>;
}

export function BuildTab({ config, isGenerating, onGenerate }: BuildTabProps) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    await onGenerate(prompt);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-sm font-medium">
            Describe your form
          </Label>
          <div className="relative">
            <Textarea
              id="prompt"
              placeholder="Describe the form you want to create... (e.g., Create a contact form with name, email, and message fields)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none pr-20 text-sm"
            />
            <div className="absolute right-2 bottom-2">
              <Button
                size="sm"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="h-8 gap-2"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Tip: Be specific about the fields you need and any validation
            requirements.
          </p>
        </div>
      </div>

      {config.fields.length > 0 && (
        <Card className="p-6 border-2 bg-card">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{config.title}</h3>
              {config.description && (
                <p className="text-sm text-muted-foreground">
                  {config.description}
                </p>
              )}
            </div>
            <div className="space-y-4">
              {config.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label className="text-sm font-medium">
                    {field.label}
                    {field.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      className="resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 text-sm border rounded-md border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  )}
                  {field.helpText && (
                    <p className="text-xs text-muted-foreground">
                      {field.helpText}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
