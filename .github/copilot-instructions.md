# Aurelius Plus - AI Coding Agent Instructions

## Project Overview

**Aurelius Plus** is a Next.js 16 web application for AI-powered content creation, featuring voice synthesis, video generation, and ebook export capabilities. It uses React 19, TypeScript, Tailwind CSS, and the `lucide-react` icon library.

## Architecture

### Core Structure
- **`app/`**: Next.js App Router pages and API routes
  - **Pages**: `dashboard/`, `library/`, `settings/`, `auth-login/`, `auth-register/` (layout structure with fixed sidebar)
  - **API Routes**: `/api/voice/`, `/api/video/`, `/api/generate/`, `/api/export-ebook/` (stub endpoints awaiting implementation)
  - **Root Layout**: [app/layout.tsx](app/layout.tsx) renders a fixed left sidebar (64px offset) with main content area
  
- **`components/`**: Reusable UI components
  - **`shared/Sidebar.tsx`**: Navigation component with menu items (Dashboard, AI Studio, Library, Settings)
  - **`ui/`**: Empty - reserved for composable UI building blocks
  - **`ebook/`, `studio/`**: Feature-specific component directories (currently empty/under development)

- **`services/`**: Empty - intended for API clients and business logic (currently unused)

- **`lib/`**: Not yet populated - designated for utilities and helpers

### Key Design Pattern
The app uses a **sidebar + main content layout**. The sidebar is fixed-position (left: 0), and the main area has `ml-64` margin to avoid overlap. All routes build on [app/layout.tsx](app/layout.tsx) as the root wrapper.

## Tech Stack & Dependencies

- **Framework**: Next.js 16.1.1, React 19.2.3
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + PostCSS, utility-first classes
- **Icons**: lucide-react
- **Build**: TypeScript strict compilation, ESLint (Next.js config)

## Development Workflow

### Commands
```bash
npm run dev     # Start development server (localhost:3000), auto-reload on file changes
npm run build   # Production build
npm run start   # Run production build
npm run lint    # Run ESLint (Next.js + TypeScript rules)
```

### Key Configuration Files
- **[tsconfig.json](tsconfig.json)**: Path alias `@/*` maps to root (use `@/components/...`, `@/app/...`)
- **[eslint.config.mjs](eslint.config.mjs)**: Extends `eslint-config-next` with TypeScript support
- **[next.config.ts](next.config.ts)**: Empty (no custom Next.js config yet)

## Coding Conventions

### File Organization
- **Routes**: Create folders under `app/` with `page.tsx` (e.g., `app/dashboard/page.tsx`)
- **API Routes**: Create `route.ts` files (e.g., `app/api/generate/route.ts`)
- **Components**: Use `.tsx` files with `export default` for page components, named exports for reusable components
- **Imports**: Always use path alias `@/components/...`, `@/lib/...` instead of relative paths

### Component Patterns
- Default export for page/layout components: `export default function ComponentName()`
- Use props interface pattern: `function Component({ children }: { children: React.ReactNode })`
- Apply Tailwind classes directly (no CSS files except globals) - see [Sidebar.tsx](components/shared/Sidebar.tsx) example
- Icons from `lucide-react`: `import { IconName } from 'lucide-react'`

### Styling Conventions
- **Tailwind CSS 4** utility classes only (no custom CSS components)
- **Color scheme**: slate-900 for dark backgrounds, slate-50 for light, blue-400 for accents
- **Layout**: Flexbox-first (`flex`, `flex-col`, `items-center`, etc.)
- **Typography**: Use semantic tags with utility classes (`className="text-xl font-bold"`)
- Example: [Sidebar.tsx](components/shared/Sidebar.tsx) uses `bg-slate-900`, `text-white`, `hover:bg-slate-800`

### TypeScript
- **Strict mode enabled**: All types must be explicit
- **No `any` type**: Use proper interfaces or generics
- **Metadata pattern**: Use Next.js `Metadata` type in layout files (see [app/layout.tsx](app/layout.tsx) line 16)

## Integration Points (TODO/In Progress)

### API Routes Needing Implementation
1. **`/api/voice/`**: Text-to-speech endpoint (referenced in sidebar "AI Studio")
2. **`/api/video/`**: Video generation endpoint
3. **`/api/generate/`**: Generic AI generation endpoint
4. **`/api/export-ebook/`**: E-book export functionality

### Missing Services
- **`services/`**: Create API client functions here (e.g., `generateVoice()`, `exportEbook()`)
- Consider adding fetch wrappers with error handling and typing

## Debugging Tips

- **Dev Server Errors**: Check terminal output for TypeScript compilation errors (strict mode catches many issues)
- **Layout Issues**: Remember sidebar is fixed + `ml-64` on main content; check `className` spacing
- **Import Errors**: Verify path alias usage (`@/...`) in tsconfig paths configuration
- **Styling**: Use Tailwind's class application - no need for `global.css` for utility styling (reserved for resets/base styles)

## Testing Strategy

Currently no test framework configured. When adding tests:
- Consider Jest + React Testing Library for components
- Add test scripts to [package.json](package.json)
