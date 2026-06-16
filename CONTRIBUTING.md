# Contributing Guide

This document defines the mandatory coding standards for this project (React + TypeScript + Tauri timetable generator). All pull requests must follow these rules. PRs that violate them will be requested for changes before review.

---

## 1. Project Structure

```
src/
├── api/                 # API client / Tauri command bindings
├── app/                 # App shell: providers, routing, layout
│   ├── providers/       # Context providers, app-wide wrappers
│   └── routes/          # Route definitions / top-level routed views
├── assets/              # Static assets (images, fonts, icons)
├── features/            # Feature-scoped modules (domain logic + UI)
│   └── timetable/
│       ├── components/
│       ├── hooks/
│       ├── utils/
│       ├── types.ts
│       └── index.ts
├── pages/               # Page-level views composed from features
├── shared/              # Shared/reusable code across features
│   ├── components/      # Reusable, generic UI components
│   ├── hooks/            # Shared, app-wide custom hooks
│   ├── store/            # Global state (Zustand/Redux/Context)
│   ├── types/            # Shared/global TypeScript types
│   └── utils/             # Pure utility/helper functions
├── styles/              # Global styles, variables, resets, themes
│   ├── variables.css
│   ├── reset.css
│   └── global.css
├── App.tsx
└── main.tsx

src-tauri/
├── src/
│   ├── commands/        # One file per command domain
│   ├── models/          # Rust structs / data models
│   ├── lib.rs
│   └── main.rs
└── Cargo.toml
```

### Rules

- **Co-locate** component files: a component's `.tsx`, styles, types, and tests live in the same folder.
- **`features/`** holds anything specific to a domain (e.g., timetable generation, course management). **`shared/components/`** holds only generic, reusable, domain-agnostic UI (Button, Modal, Input).
- **`app/`** holds app-level wiring — providers (context/theming/query clients) and route definitions — not feature logic.
- **`api/`** holds API clients and Tauri command bindings shared across features.
- No file should exceed **~300 lines**. Split large components into subcomponents or extract logic into hooks/utils.
- One component per file. The file name must match the component name exactly.

---

## 2. Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Components (files & names) | `PascalCase` | `TimetableGrid.tsx`, `CourseCard.tsx` |
| Hooks | `camelCase`, prefixed `use` | `useTimetableConflicts.ts` |
| Utility/helper functions | `camelCase`, verb-based | `formatTimeSlot()`, `calculateOverlap()` |
| Variables | `camelCase`, descriptive nouns | `selectedCourses`, `isLoading` |
| Booleans | prefixed `is/has/can/should` | `isConflicting`, `hasError` |
| Constants (true constants) | `UPPER_SNAKE_CASE` | `MAX_PERIODS_PER_DAY`, `DEFAULT_TIME_FORMAT` |
| Types & Interfaces | `PascalCase`, no `I` prefix | `Course`, `TimeSlot`, `TimetableConfig` |
| Type files | `*.types.ts` | `Timetable.types.ts` |
| CSS Modules | `*.module.css`, camelCase classes | `courseCard.module.css` → `.courseCard` |
| Enums | `PascalCase` name, `PascalCase` members | `enum DayOfWeek { Monday, Tuesday }` |
| Folders | `kebab-case` (except component folders, which match `PascalCase`) | `time-utils/`, `TimetableGrid/` |
| Tauri commands (Rust) | `snake_case` | `generate_timetable`, `save_schedule` |

Avoid abbreviations unless universally understood (`id`, `url`, `config` are fine; `tt`, `cfg`, `el` are not).

---

## 3. TypeScript Style

### General Principles

- **Strict mode is mandatory.** `tsconfig.json` must keep `"strict": true`. Never disable type checks with `// @ts-ignore` — fix the type instead. If unavoidable, use `// @ts-expect-error` with a comment explaining why.
- **No `any`.** Use `unknown` and narrow it, or define a proper type/interface.
- Prefer `type` for unions, intersections, and props/state shapes. Prefer `interface` only when you expect declaration merging or extension (rare in this project — default to `type`).
- Avoid optional properties (`prop?:`) unless a value can genuinely be absent. Don't use them to paper over incomplete logic.
- Use **discriminated unions** for state representing multiple variants instead of multiple booleans:

  ```typescript
  // Bad
  type FetchState = {
    isLoading: boolean;
    isError: boolean;
    data?: Timetable;
  };

  // Good
  type FetchState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; error: string }
    | { status: "success"; data: Timetable };
  ```

- Functions should have explicit return types when the return type isn't trivially inferable, especially for exported functions.
- Prefer pure functions. Side effects belong in hooks, event handlers, or dedicated service modules — not in utility functions.
- Don't export anything that isn't used outside the module.

### React Component Style

- Function components only, written as `const` arrow functions:

  ```typescript
  type CourseCardProps = {
    course: Course;
    onSelect: (id: string) => void;
  };

  export const CourseCard = ({ course, onSelect }: CourseCardProps) => {
    return (
      <div className={styles.courseCard} onClick={() => onSelect(course.id)}>
        <h3>{course.name}</h3>
      </div>
    );
  };
  ```

- Props type is named `<ComponentName>Props` and declared directly above the component (or imported from `*.types.ts` if shared).
- Destructure props in the function signature.
- One default export maximum per file — prefer **named exports** everywhere for consistency and easier refactors.
- Keep components focused on rendering. Extract data-fetching, calculations, and complex state logic into custom hooks (`useXyz`).
- Order within a component file:
  1. Imports (external → internal → styles)
  2. Types
  3. Constants (if local to the file)
  4. Component definition
  5. Helper functions (if small and only used here — otherwise move to `utils/`)

### Imports

- Group and order imports:
  1. External libraries (`react`, `@tauri-apps/api`, etc.)
  2. Internal absolute imports (`@/shared`, `@/features`, `@/api`, `@/app`)
  3. Relative imports (`./`, `../`)
  4. Styles (always last)
- Use absolute imports via path aliases (`@/`) for anything outside the current feature folder. Use relative imports only within the same folder/feature.

---

## 4. CSS Style

- **CSS Modules** are mandatory for component styling (`Component.module.css`). No global class names, no inline styles except for truly dynamic, computed values (e.g., a calculated grid position).
- Global styles (resets, variables, themes, typography base) live only in `src/styles/`.

### Naming

- Class names: `camelCase`, descriptive of purpose, not appearance:

  ```css
  /* Bad */
  .redText { color: var(--color-danger); }

  /* Good */
  .conflictWarning { color: var(--color-danger); }
  ```

- BEM-style modifiers when variants are needed, scoped within the module:

  ```css
  .card { }
  .card_header { }
  ```

### Design Tokens

- All colors, spacing, font sizes, radii, and shadows must come from CSS custom properties defined in `src/styles/variables.css`. No magic numbers or hardcoded hex values in component files.

  ```css
  :root {
    --color-primary: #2563eb;
    --color-danger: #dc2626;
    --color-bg: #ffffff;
    --color-text: #1a1a1a;

    --space-1: 4px;
    --space-2: 8px;
    --space-3: 16px;
    --space-4: 24px;
    --space-5: 32px;

    --radius-sm: 4px;
    --radius-md: 8px;

    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.25rem;
  }
  ```

  ```css
  /* Good */
  .courseCard {
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background: var(--color-bg);
  }

  /* Bad */
  .courseCard {
    padding: 17px;
    border-radius: 6px;
    background: #fdfdfd;
  }
  ```

### Layout

- Prefer **Flexbox** and **CSS Grid** over absolute positioning or floats.
- Computer-first: write base styles for large screens, then use `max-width` media queries for smaller viewports.
- Avoid deep nesting/specificity wars — a CSS Modules class should rarely need more than one level of descendant selector.

### Formatting

- One property per line, alphabetical order is **not** required, but group logically: positioning → box model → typography → visual → misc.
- Use `var(--font-size-*)` for font sizes, `px` for borders, `var(--space-*)` for spacing.
- No `!important`, ever.

```css
.timetableGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-2);

  padding: var(--space-3);

  background: var(--color-bg);
  border-radius: var(--radius-md);
}
```

---

## 5. Rust / Tauri Backend Style

- Run `cargo fmt` before every commit (enforced via pre-commit hook / CI).
- Run `cargo clippy -- -D warnings` — no warnings allowed.
- One Tauri command per logical operation, grouped into files under `src-tauri/src/commands/` by domain (e.g., `commands/timetable.rs`, `commands/storage.rs`).
- All commands return `Result<T, String>` (or a custom error type implementing `Serialize`) — never `unwrap()`/`panic!()` in command handlers.
- Data structures shared with the frontend live in `src-tauri/src/models/` and must derive `Serialize, Deserialize` with `serde`.

---

## 6. General Clean Code Principles

- **Single Responsibility**: a function/component does one thing. If you need "and" to describe what it does, split it.
- **No magic values**: extract numbers, strings, and config into named constants.
- **Early returns** over nested conditionals.
- **No commented-out code** in commits — delete it (git history preserves it).
- **No console.log** in committed code — use a proper logger or remove before PR.
- Write self-documenting code; add comments only to explain *why*, not *what*.
- Keep functions short — if a function needs scrolling to read, it should likely be split.

---

## 7. Tooling & Enforcement

- **ESLint** (with `@typescript-eslint`, `eslint-plugin-react-hooks`) and **Prettier** are required and run via `npm run lint` / `npm run format`.
- **Stylelint** is required for CSS Modules.
- Pre-commit hooks (via `husky` + `lint-staged`) run linting and formatting on staged files automatically.
- CI must pass: type-check, lint, stylelint, and `cargo clippy`/`cargo fmt --check` before merge.

---

## 8. Pull Requests

- Branch naming: `feature/<short-description>`, `fix/<short-description>`, `chore/<short-description>`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.
- Each PR should be small and focused on a single change. Large unrelated changes will be asked to be split.
- Update relevant documentation/types when changing shared interfaces.

---

By contributing, you agree to follow these standards. Reviewers will request changes for any violations of this guide.