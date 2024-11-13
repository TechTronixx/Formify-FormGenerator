import { Button } from "@/components/ui/button";

interface FormBuilderHeaderProps {
  title: string;
}

export function FormBuilderHeader({ title }: FormBuilderHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-primary">{title}</h1>
      <Button
        variant="outline"
        onClick={() => window.open("/preview", "_blank")}
      >
        Preview Form
      </Button>
    </header>
  );
}
