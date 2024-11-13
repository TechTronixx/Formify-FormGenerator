import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { FormConfig } from "../../types/form";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";

interface NavbarProps {
  formConfig: FormConfig;
}

export function Navbar({ formConfig }: NavbarProps) {
  const handlePreview = () => {
    const formData = encodeURIComponent(JSON.stringify(formConfig));
    window.open(`/preview?formData=${formData}`, "_blank");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 font-semibold">
            <Sparkles className="w-5 h-5 text-primary" />
            Formify
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="outline"
            onClick={handlePreview}
            className="flex items-center gap-2 transition-all hover:shadow-md"
            disabled={!formConfig.fields.length}
          >
            Preview Form
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
