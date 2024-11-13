import express, { Request, Response } from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Google OAuth2 setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const forms = google.forms({ version: "v1", auth: oauth2Client });

interface FormField {
  id?: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
}

interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
}

app.post("/api/export-to-google-forms", async (req: Request, res: Response) => {
  try {
    const formConfig: FormConfig = req.body;

    if (!formConfig.title || !Array.isArray(formConfig.fields)) {
      return res.status(400).json({ error: "Invalid form configuration" });
    }

    // First, create the form with just the title
    const form = await forms.forms.create({
      requestBody: {
        info: {
          title: formConfig.title,
        },
      },
    });

    if (!form.data.formId) {
      throw new Error("No form ID received from Google Forms API");
    }

    const formId = form.data.formId;

    // Then, update the form with description and other info
    await forms.forms.batchUpdate({
      formId,
      requestBody: {
        requests: [
          // Add description if it exists
          ...(formConfig.description
            ? [
                {
                  updateFormInfo: {
                    info: {
                      description: formConfig.description,
                    },
                    updateMask: "description",
                  },
                },
              ]
            : []),
          // Add all form fields
          ...formConfig.fields.map((field, index) => ({
            createItem: {
              item: {
                title: field.label,
                description: field.helpText,
                questionItem: {
                  question: {
                    required: field.required,
                    textQuestion: {
                      paragraph: field.type === "textarea",
                    },
                  },
                },
              },
              location: { index },
            },
          })),
        ],
      },
    });

    const formUrl = `https://docs.google.com/forms/d/${formId}/viewform`;
    console.log("Form created successfully:", formUrl);

    res.json({ formUrl });
  } catch (error) {
    console.error("Google Forms API error:", error);
    res.status(500).json({
      error: "Failed to create Google Form",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
