# Project Structure

## Directory Organization

### Root Structure
- `src/` - Main source code
- `static/` - Static assets (favicon, etc.)
- `messages/` - Internationalization message files
- `.kiro/` - Kiro specifications and steering rules
- `.husky/` - Git hooks configuration

### Source Code Structure
- `src/app.html` - HTML template
- `src/app.d.ts` - TypeScript declarations
- `src/hooks.ts` - SvelteKit hooks
- `src/hooks.server.ts` - Server-side SvelteKit hooks

### Library Structure
- `src/lib/` - Shared library code
  - `components/` - Reusable UI components
    - `layout/` - Layout components (Header, Footer, Navigation)
  - `styles/` - Global styles and CSS variables
  - `utils/` - Utility functions
  - `paraglide/` - Generated internationalization code
  - `data/` - Static data files (skills, profile)
  - `projects/` - Project components and data

### Routing Structure
- `src/routes/` - SvelteKit routes
  - `+page.svelte` - Home page
  - `+layout.svelte` - Root layout
  - `projects/` - Project routes
    - `+page.svelte` - Projects list page
    - `[slug]/` - Dynamic project routes
      - `+page.svelte` - Project detail page

## Code Conventions

### Component Structure
- Use `.svelte` extension for Svelte components
- Use TypeScript with `<script lang="ts">` in components
- Follow the component structure:
  1. Script section
  2. Template section
  3. Style section

### Naming Conventions
- **Components**: PascalCase (e.g., `ProjectCard.svelte`)
- **Files/Directories**: kebab-case (e.g., `scroll-utils.ts`)
- **Functions**: camelCase (e.g., `handleNavClick`)
- **CSS Classes**: kebab-case (e.g., `nav-item`)

### CSS Organization
- Global styles in `src/lib/styles/global.css`
- CSS variables in `src/lib/styles/variables.css`
- Component-specific styles within component files
- Follow BEM naming convention for CSS classes

### Data Management
- Project data stored in Svelte components with metadata exports
- Utility functions for data access in index files
- Type definitions for data structures

## Key Architectural Patterns

### Component Composition
- Small, focused components
- Composition over inheritance
- Props for component configuration

### Responsive Design
- Mobile-first approach
- CSS variables for consistent styling
- Media queries for breakpoints

### Internationalization
- Message keys organized by feature
- Paraglide.js for language switching
- URL-based language selection