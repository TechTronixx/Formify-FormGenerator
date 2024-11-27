import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AIFormBuilder } from "./components/form-builder/AIFormBuilder";
import { FormPreview } from "./pages/FormPreview";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster position="top-center" richColors closeButton />
          <Routes>
            <Route path="/" element={<AIFormBuilder />} />
            <Route path="/preview" element={<FormPreview />} />
          </Routes>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
