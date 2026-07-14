# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing **landing page for PharmaCare**, a clinical-pharmacist SaaS. Content is **Portuguese (pt-BR)**. It is a static site — no backend, no routing; CTAs are in-page anchors.

## Commands

```bash
npm run dev      # Vite dev server (HMR)
npm run build    # production build to dist/
npm run lint     # ESLint (flat config, targets **/*.{js,jsx})
npm run preview  # serve the production build
```

There is **no test suite**. Verify changes visually in the browser (dev server) and by running `lint` + `build`.

## Stack & conventions

- **Vite + React 19, JavaScript/JSX only.** No TypeScript — do not add `.ts`/`.tsx` files or a tsconfig. `@types/*` are installed but unused.
- **Tailwind CSS v4**, configured CSS-first (no `tailwind.config.js`). All design tokens live in the `@theme` block of `src/index.css`.
- **shadcn/ui** in JS mode (`components.json`, `tsx: false`). Primitives are hand-maintained under `src/components/ui/`.
- **Framer Motion** via the `motion` package — always import from `motion/react` (e.g. `import { motion } from "motion/react"`).
- **lucide-react** for icons; **@fontsource** for self-hosted Instrument Serif + Inter (imported in `src/main.jsx`).
- Path alias **`@` → `src`** (set in `vite.config.js` and `jsconfig.json`).

## Design system is a contract

Two root docs are the source of truth and must be followed exactly when changing visuals:

- **`DESIGN.md`** — the "Liquid Care" / Liquid Glass system: cobalt blue (`#1111ff`), glassmorphism, Instrument Serif (display) + Inter (body), pill CTAs. Its tokens are mapped 1:1 into `@theme` in `src/index.css`.
- **`pharmacare.md`** — brand voice and required sections: serene, scientific, minimal copy; the slogan is *"Cuidar é nossa ciência."*; the PharmAssist (AI) section must keep *"A decisão clínica continua sendo do farmacêutico."*

`src/index.css` is where the whole visual language originates. It defines: brand color tokens (`--color-surface`, `--color-primary`, `--color-ink`, `--color-inverse`, `--color-lavender`, …), a **shadcn token bridge** (`:root` vars + `@theme inline`) so shadcn primitives inherit the brand, the `.glass` / `.glass-strong` / `.eyebrow` component classes, and a global `prefers-reduced-motion` reset. Prefer these tokens/utility classes over ad-hoc hex values.

## Architecture

`src/App.jsx` composes the whole page as an ordered list of section components from `src/components/`: `Navbar → Hero → Manifesto → Plataforma → PharmAssist → Visao → Crenca → CTAFinal → Footer`. Each section is self-contained and owns its own copy and layout.

Shared building blocks:
- **`components/LiquidMesh.jsx`** — the signature animated cobalt/lavender blob background; reused behind the hero, the AI panel, and the final CTA. Decorative (`aria-hidden`) and freezes under reduced motion.
- **`components/Reveal.jsx`** + **`lib/motion.js`** — the standard scroll-reveal. Section content uses `whileInView` with `viewport={{ once: true }}` and the shared `fadeUp`/`stagger` variants. Keep motion quiet and disciplined; the hero mesh is the one bold element.
- **`lib/utils.js`** — `cn()` (clsx + tailwind-merge), used by all shadcn primitives.

### Screenshots

The system-screen screenshots in `src/assets/` (`dashboard_pharma.png`, `dashboard_admin.png`, `prontuario_paciente.png`, `pharma_assist.png`) are high-res exports (~2940px wide). They render at full-bleed sizes inside `.glass-strong` frames; the `<img>` `width`/`height` attributes must match each file's true 2940×1740 (or 2940×1664 for the hero) aspect ratio to avoid layout shift.
