[![Node.js Version](https://img.shields.io/node/v/vite)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

<img width="1207" height="544" alt="cover" src="https://github.com/user-attachments/assets/ec80e1e9-c5e5-4c97-aa1e-776841f873f9" />

# MD Hub — Agent Skill Registry

MD Hub is a web platform for uploading, versioning, and distributing skills that make AI agents smarter. It serves as a community registry where developers can share and discover agent capabilities.

## Features

- **Browse Skills** — Explore community-built agent skills across multiple categories
- **Search & Filter** — Find skills by name, description, tags, or category
- **Skill Details** — View skill documentation, versions, and metadata
- **Version History** — Track changes across skill versions
- **Publish Skills** — Share your own agent skills with the community (requires referral)
- **User Profiles** — View skill authors and their contributions

## Categories

- Web Development
- Data Science
- DevOps
- Security
- AI/ML
- Automation
- Design
- Infrastructure

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: TanStack React Query
- **Routing**: React Router DOM
- **Forms**: React Hook Form, Zod
- **Icons**: Lucide React
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

### Preview

```bash
# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/          # shadcn/ui components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and mock data
└── test/            # Test files
```

## License

MIT
