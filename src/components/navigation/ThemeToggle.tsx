import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { Switch } from "../ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="w-4 h-4" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <Moon className="w-4 h-4" />
    </div>
  );
}
