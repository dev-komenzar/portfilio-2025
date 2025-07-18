# Technology Stack

## Core Technologies
- **Framework**: SvelteKit 2.x with Svelte 5.x (using runes)
- **Language**: TypeScript
- **Internationalization**: Paraglide.js (@inlang/paraglide-js)
- **Deployment**: Static site generation (@sveltejs/adapter-static)
- **Styling**: Native CSS with CSS Variables (no external CSS frameworks)
- **Build Tool**: Vite

## Project Structure
- SvelteKit page-based routing
- Component-oriented architecture
- Svelte-based data management for projects

## Development Tools
- **Package Manager**: Bun
- **Linting**: ESLint with flat config (eslint.config.js)
- **Git Hooks**: Husky with lint-staged
- **Type Checking**: TypeScript + svelte-check

## Common Commands

### Development
```bash
# Start development server
bun run dev

# Check types
bun run type-check

# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Run all checks (lint + type-check)
bun run check:all
```

### Build and Preview
```bash
# Build for production
bun run build

# Preview production build locally
bun run preview
```

## Internationalization
- Base language: Japanese (ja)
- Additional language: English (en)
- Message files located in `/messages` directory
- Paraglide.js configuration in `project.inlang/settings.json`

## Deployment
- Static site generation with adapter-static
- Designed to be deployed on Coolify with Docker
- Optimized for performance and SEO