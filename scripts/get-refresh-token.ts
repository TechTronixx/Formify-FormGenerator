import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";
import { OAuth2Client } from "google-auth-library";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const REQUIRED_ENV_VARS = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
] as const;

// Validate required environment variables
const missingVars = REQUIRED_ENV_VARS.filter((envVar) => !process.env[envVar]);
if (missingVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
) as OAuth2Client;

// Generate auth URL with required scope
const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/forms"],
  prompt: "consent", // Force consent screen to ensure refresh token
});

console.log("\n=== Google OAuth2 Token Generator ===");
console.log("\nPlease visit this URL to authorize the application:");
console.log(authUrl);

async function handleAuthCode(code: string): Promise<void> {
  try {
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      throw new Error(
        "No refresh token received. Please ensure you've revoked previous access and try again."
      );
    }

    console.log("\nSuccess! Your refresh token:", tokens.refresh_token);
    console.log("\nAdd this to your .env file as:");
    console.log("GOOGLE_REFRESH_TOKEN=", tokens.refresh_token);
    process.exit(0);
  } catch (error) {
    console.error(
      "\nError getting tokens:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exit(1);
  }
}

// Handle user input
process.stdin.resume();
console.log("\nEnter the code from the redirect URL: ");
process.stdin.on("data", (data) => {
  const code = data.toString().trim();
  if (!code) {
    console.error("Please provide a valid authorization code");
    return;
  }
  handleAuthCode(code);
});

// Handle process termination
process.on("SIGINT", () => {
  console.log("\nProcess terminated by user");
  process.exit(0);
});
