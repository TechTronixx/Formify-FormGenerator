import { useSearchParams } from "react-router-dom";
import { FormConfig } from "../types/form";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

export function FormPreview() {
  const [searchParams] = useSearchParams();
  const formData = searchParams.get("formData");
  const config: FormConfig = formData
    ? JSON.parse(decodeURIComponent(formData))
    : null;

  if (!config) {
    return <div className="container p-8">No form data available</div>;
  }

  return (
    <div className="container max-w-2xl mx-auto p-8">
      <Card className="p-6 border-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{config.title}</h1>
            {config.description && (
              <p className="text-sm text-muted-foreground">
                {config.description}
              </p>
            )}
          </div>

          <form className="space-y-6">
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
                    required={field.required}
                    className="resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
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
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
