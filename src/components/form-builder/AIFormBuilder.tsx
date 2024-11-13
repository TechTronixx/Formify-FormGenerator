import { useFormBuilder } from "@/hooks/useFormBuilder";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { BuildTab } from "./BuildTab";
import { SettingsTab } from "./SettingsTab";
import { Card } from "../ui/card";
import { Navbar } from "../navigation/Navbar";
import { Sparkles } from "lucide-react";
import { initialFormConfig } from "@/constants/form";

export function AIFormBuilder() {
  const { config, isGenerating, handleConfigChange, handleAIGenerate } =
    useFormBuilder(initialFormConfig);

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
                <TabsList>
                  <TabsTrigger value="build">Build</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="build" className="mt-0 space-y-4">
                  <BuildTab
                    config={config}
                    isGenerating={isGenerating}
                    onGenerate={handleAIGenerate}
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
