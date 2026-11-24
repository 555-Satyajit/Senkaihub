# SenkaiHub Frontend Development Rules

These rules are permanent project guidelines and must be followed on every task.

## 1. Component & UI Architecture
- **Strictly use shadcn/ui components**: Always check `frontend/src/components/ui/` first.
- **Auto-install missing shadcn components**: If a component is needed and not yet present in `src/components/ui/`, install it using the shadcn CLI:
  ```bash
  cd frontend
  pnpm dlx shadcn@canary add <component-name>
  ```
- Do not build custom ad-hoc primitives when an official shadcn component exists (e.g., Tooltip, Sheet, Separator, Accordion, ScrollArea, Select, Slider, Switch, etc.).

## 2. Design Tokens & Styling
- **Zero hardcoded arbitrary colors**: Never use arbitrary hex colors like `bg-[#1a1b22]` or inline `color: #fff`.
- **Strict CSS variable & theme usage**: All colors, borders, rings, and backgrounds MUST come from the design tokens defined in `src/app/globals.css`:
  - `bg-background` (`--background`)
  - `bg-card` / `text-card-foreground` (`--card`)
  - `bg-secondary` (`--secondary`)
  - `bg-muted` / `text-muted-foreground` (`--muted`)
  - `border-border` (`--border`)
  - `text-primary` / `bg-primary` (`--primary` - Crimson Flame)
  - `text-accent` / `bg-accent` (`--accent` - Solar Flame Gold)
- Use standard radii tokens (`rounded-lg`, `rounded-md`, `rounded-sm`).

## 3. Mandatory Skills & Workflows
- **`modern-web-guidance`**: Execute first for modern web development best practices (HTML semantics, accessibility, layout).
- **`senkaihub-code-standards`**: Adhere strictly to the layered architecture:
  - `api/` -> `model/` -> `hooks/` -> `containers/` -> `components/`.
  - Presentational components in `components/` accept props and return JSX with no embedded fetch calls.
