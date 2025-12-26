# NanoFi Dashboard

IP-NFT Tokenization Platform with Authentication, Vault Management, and Profile Features.

## Features

- 🔐 **Authentication**: Login/Signup with protected routes
- 🏦 **Vault Management**: View and manage patent vaults
- 📝 **Tokenize Patents**: Multi-step form for patent tokenization
- 👤 **Profile Management**: User profile with multiple sections
- 🎨 **Modern UI**: Built with React, TypeScript, Tailwind CSS, and shadcn-ui

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── ui/          # shadcn-ui components
│   ├── vault/       # Vault-related components
│   ├── patent-form/ # Patent tokenization form components
│   └── profile/     # Profile-related components
├── contexts/        # React contexts (Auth, etc.)
├── hooks/          # Custom React hooks
├── lib/            # Utilities and helpers
├── pages/          # Page components
└── main.tsx        # Application entry point
```

## Authentication

The app includes dummy accounts for testing:

- **Regular User**: `demo@nanofi.com` / `Demo123`
- **SPV User**: `spv@nanofi.com` / `SPV123`

## Available Routes

- `/login` - Login page
- `/signup` - Signup page
- `/vault` - Vault main page (protected)
- `/vault/tokenize` - Tokenize patent page (protected)
- `/profile` - Profile main page (protected)
- `/profile/edit` - Edit profile page (protected)

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **shadcn-ui** - UI components
- **Lucide React** - Icons

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## License

Copyright © 2024 NanoFi. All rights reserved.

