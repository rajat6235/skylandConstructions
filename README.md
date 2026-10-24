# Skyland Construction

Website for Skyland Construction, built with Next.js (App Router), TypeScript and Tailwind CSS.

## Requirements

- Node.js 20.9 or newer

## Getting started

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the development server      |
| `npm run build`     | Create a production build         |
| `npm run start`     | Serve the production build        |
| `npm run lint`      | Lint with ESLint                  |
| `npm run typecheck` | Type-check with TypeScript        |

## Project structure

```
src/
  app/              Routes, layouts and global styles (App Router)
  components/
    layout/         Site-wide layout pieces (header, footer, ...)
    ui/             Reusable presentational components
  config/           Site-wide configuration (name, URL, ...)
  lib/              Framework-agnostic utilities
public/             Static assets served from the site root
```

Components are Server Components by default; add `"use client"` only where interactivity is needed.
