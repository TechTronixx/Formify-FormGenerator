# AI Form Builder

A modern web application that leverages AI to generate dynamic forms instantly with google form and xml export.

## Overview

AI Form Builder simplifies form creation by using artificial intelligence to generate complete form structures from natural language descriptions. Perfect for developers, product managers, and anyone who needs to quickly create professional forms.

## Demo Screenshots

![Form Builder Interface](./assets/Demo-1.png)
_Forms Preview_

![Form Preview](./assets/Demo-2.png)
_Generated form preview with a custom prompt_

![Form Export Options](./assets/Demo-3.png)
_Settings and Export Options_

## Key Features

- **AI-Powered Generation**: Create forms using simple text descriptions
- **Real-time Preview**: Instantly view your generated forms [todo]
- **Theme Support**: Built-in dark/light mode
- **Google Forms Export**: Export your forms directly to Google Forms
- **XML Export**: Export your forms as XML
- **Responsive Design**: Fully responsive across all devices [todo]

## Technical Stack

### Frontend

- Vite
- Tailwind CSS
- Shadcn UI
- React Hook Form
- React Router

### Backend

- Express.js server
- OpenAI API integration
- Google Forms API integration
- Hugging Face API integration

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/TechTronixx/Formify-FormGenerator.git
cd Formify-FormGenerator
```

2. Install Bun (if not already installed):

```bash
curl -fsSL https://bun.sh/install | bash
```

3. Install dependencies:

```bash
bun install
```

4. Set up environment variables:

```bash
cp .env.example .env
```

Fill in your `.env` file with your credentials.

5. Start development servers:

```bash
# Start both frontend and backend
bun run dev:all

# Or start them separately:
bun run dev      # Frontend only
bun run server   # Backend only
```

## Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update the `.env` file with your credentials:

```env
VITE_HUGGINGFACE_API_KEY=           # Get from Hugging Face
OPENAI_API_KEY=                      # Get from OpenAI

# Google OAuth (Required for Google Forms export)
GOOGLE_CLIENT_ID=                    # Get from Google Cloud Console
GOOGLE_REDIRECT_URI=                 # Default: http://localhost:3001/oauth2callback
GOOGLE_REFRESH_TOKEN=                # Generated using 'bun run token'
```

3. For Google Forms integration, follow the "Getting Google Forms Refresh Token" section below to obtain the necessary credentials.

## Getting Google Forms Refresh Token

To use the Google Forms export feature, you'll need to:

1. Set up your Google Cloud Project and enable the Google Forms API
2. Create OAuth 2.0 credentials (Client ID and Secret)
3. Add them to your `.env` file
4. Run the token script:
   ```bash
   bun run token
   ```
5. Follow the prompts to authorize the application
6. Add the resulting refresh token to your `.env` file as `GOOGLE_REFRESH_TOKEN`

## Available Scripts

- `bun run dev` - Start frontend development server
- `bun run server` - Start backend server
- `bun run dev:all` - Start both frontend and backend
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run token` - Generate Google OAuth refresh token

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/)
- [OpenAI](https://openai.com/)
- [Google Forms API](https://developers.google.com/forms/api)
