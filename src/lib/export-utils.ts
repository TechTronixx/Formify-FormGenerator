import { FormConfig } from "../types/form";

export async function exportAsJSON(config: FormConfig) {
  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${config.title
    .toLowerCase()
    .replace(/\s+/g, "-")}-form.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function exportToGoogleForms(config: FormConfig) {
  try {
    const response = await fetch(
      "http://localhost:3001/api/export-to-google-forms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to export to Google Forms");
    }

    const data = await response.json();
    return data.formUrl;
  } catch (error) {
    console.error("Google Forms export error:", error);
    throw error;
  }
}
