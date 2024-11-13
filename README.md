# AI Form Builder

A modern web application that leverages AI to generate dynamic forms instantly with google form and xml export.

## Overview

AI Form Builder simplifies form creation by using artificial intelligence to generate complete form structures from natural language descriptions. Perfect for developers, product managers, and anyone who needs to quickly create professional forms.

## Key Features

- **AI-Powered Generation**: Create complex forms using simple text descriptions
- **Real-time Preview**: Instantly view your generated forms {TODO}
- **Theme Support**: Built-in dark/light mode
- **Google Forms Export**: Export your forms directly to Google Forms
- **Responsive Design**: Fully responsive across all devices
- **Type Safety**: Full TypeScript support for reliable development {TODO}

## 🛠️ Technical Stack

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

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone ..
cd ai-form-builder
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

5. Start development servers:

```bash
# Start both frontend and backend
bun run dev:all

# Or start them separately:
bun run dev      # Frontend only
bun run server   # Backend only
```

## Environment Setup

Create a `.env` file with the following variables:

```env
# Frontend
VITE_HUGGINGFACE_API_KEY=your_huggingface_key

# Backend
OPENAI_API_KEY=your_openai_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/oauth2callback
```

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

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful components
- [OpenAI](https://openai.com/) for AI capabilities
- [Google Forms API](https://developers.google.com/forms/api) for form export functionality
