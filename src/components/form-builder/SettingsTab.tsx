import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FormConfig } from "../../types/form";
// import { Card, CardContent } from "../ui/card";
import {
  exportAsJSON,
  exportToGoogleForms,
  exportAsExcel,
} from "../../lib/export-utils";
import { toast } from "sonner";
import { FileJson, FileSpreadsheet, FileDown, Loader2 } from "lucide-react";
import { useState } from "react";

export interface SettingsTabProps {
  config: FormConfig;
  setConfig: (config: Partial<FormConfig>) => void;
}

export function SettingsTab({ config, setConfig }: SettingsTabProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const handleJSONExport = async () => {
    try {
      await exportAsJSON(config);
      toast.success("Form exported as JSON successfully!");
    } catch {
      toast.error("Failed to export form as JSON");
    }
  };

  const handleGoogleFormsExport = async () => {
    setIsExporting(true);
    try {
      const formUrl = await exportToGoogleForms(config);
      window.open(formUrl, "_blank");
      toast.success("Form exported to Google Forms successfully!");
    } catch {
      toast.error("Failed to export to Google Forms");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExcelExport = async () => {
    setIsExportingExcel(true);
    try {
      await exportAsExcel(config);
      toast.success("Form exported as Excel successfully!");
    } catch {
      toast.error("Failed to export form as Excel");
    } finally {
      setIsExportingExcel(false);
    }
  };

  return (
    <div className="min-h-[400px]">
      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-center justify-between px-1">
          <div className="space-y-1">
            <h3 className="text-lg font-medium leading-none tracking-tight">
              Form Configuration
            </h3>
            <p className="text-sm text-muted-foreground">
              Customize your form settings and export options
            </p>
          </div>
        </div>

        <div className="px-1 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-foreground"
              >
                Form Title
              </Label>
              <Input
                id="title"
                value={config.title}
                onChange={(e) => setConfig({ title: e.target.value })}
                placeholder="Enter form title..."
                className="h-9 bg-muted/50"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-foreground"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={config.description}
                onChange={(e) => setConfig({ description: e.target.value })}
                placeholder="Enter form description..."
                className="resize-none min-h-[100px] bg-muted/50"
                rows={3}
              />
            </div>
          </div>

          <div className="pt-4 space-y-3 border-t">
            <h4 className="text-sm font-medium text-foreground">
              Export Options
            </h4>
            <div className="grid gap-2">
              <Button
                onClick={handleJSONExport}
                className="justify-start px-4 h-9 bg-muted/50 hover:bg-muted"
                variant="ghost"
              >
                <FileJson className="w-4 h-4 mr-2" />
                Export as JSON
              </Button>

              <Button
                onClick={handleGoogleFormsExport}
                className="relative justify-start px-4 h-9 text-muted-foreground hover:bg-muted group"
                variant="ghost"
                disabled={isExporting}
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin " />
                ) : (
                  <FileSpreadsheet className="w-4 h-4 mr-2 " />
                )}
                Export to Google Forms
                <span className="absolute -top-1 -right-2 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide rounded-full bg-primary/10 text-primary border border-primary/20">
                  BETA
                </span>
              </Button>

              <Button
                onClick={handleExcelExport}
                className="justify-start px-4 h-9 bg-muted/50 hover:bg-muted"
                variant="ghost"
                disabled={isExportingExcel}
              >
                {isExportingExcel ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4 mr-2" />
                )}
                Export as Excel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
