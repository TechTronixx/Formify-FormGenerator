import { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { BuildTab } from "./BuildTab";
import { SettingsTab } from "./SettingsTab";
import { FormConfig } from "../../types/form";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { generateFormStructure } from "../../lib/ai";
import { Navbar } from "../navigation/Navbar";
import { Sparkles } from "lucide-react";

// Initial form configuration
const initialConfig: FormConfig = {
  title: "",
  description: "",
  fields: [],
  validation: true,
  helpText: true,
  placeholders: true,
};

export function AIFormBuilder() {
  const [config, setConfig] = useState<FormConfig>(initialConfig);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleConfigChange = useCallback((newConfig: Partial<FormConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleGenerate = useCallback(
    async (prompt: string) => {
      setIsGenerating(true);
      try {
        const generatedConfig = await generateFormStructure(prompt);
        handleConfigChange(generatedConfig);
        toast.success("Form generated successfully!");
      } catch (error) {
        toast.error("Failed to generate form");
        console.error(error);
      } finally {
        setIsGenerating(false);
      }
    },
    [handleConfigChange]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar formConfig={config} />

      <main className="container px-4 pt-24 pb-16 mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">
                Form Builder
              </h1>
            </div>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Create professional forms instantly using AI. Describe your form
              requirements, and watch as AI generates a complete form structure
              for you.
            </p>
          </div>

          <Card className="overflow-hidden border-2">
            <Tabs defaultValue="build" className="space-y-6">
              <div className="px-6 pt-6 pb-2 border-b bg-card">
                <TabsList className="inline-flex items-center justify-center p-1 rounded-lg h-9 bg-muted">
                  <TabsTrigger
                    value="build"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    Build
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="build" className="mt-0 space-y-4">
                  <BuildTab
                    config={config}
                    isGenerating={isGenerating}
                    onGenerate={handleGenerate}
                  />
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <SettingsTab config={config} setConfig={handleConfigChange} />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </main>
    </div>
  );
}
