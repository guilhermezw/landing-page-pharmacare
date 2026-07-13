---
name: Liquid Care
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#454557'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757589'
  outline-variant: '#c5c4db'
  surface-tint: '#353cff'
  primary: '#0300c2'
  on-primary: '#ffffff'
  primary-container: '#1111ff'
  on-primary-container: '#b8bbff'
  inverse-primary: '#bfc2ff'
  secondary: '#5b5e64'
  on-secondary: '#ffffff'
  secondary-container: '#e0e2e9'
  on-secondary-container: '#61646a'
  tertiary: '#383838'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f4f4f'
  on-tertiary-container: '#c1c1c1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bfc2ff'
  on-primary-fixed: '#01006e'
  on-primary-fixed-variant: '#0500ef'
  secondary-fixed: '#e0e2e9'
  secondary-fixed-dim: '#c4c6cd'
  on-secondary-fixed: '#181c21'
  on-secondary-fixed-variant: '#44474c'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Instrument Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is defined by a "Liquid Glass" aesthetic—a sophisticated synthesis of clinical precision and organic fluidity. Designed for a high-end SaaS environment, the visual language evokes feelings of clarity, innovation, and pharmaceutical-grade reliability. 

The style prioritizes **Glassmorphism** and **Minimalism**. It utilizes high transparency, expansive white space, and subtle background blurs to create a sense of depth without clutter. The interface should feel like light passing through sterile glass and purified water, mirroring the transparency and care essential to the healthcare industry. UI elements use organic, fluid paths rather than rigid geometric constraints to feel approachable yet cutting-edge.

## Colors

The palette is anchored by a **Vibrant Cobalt Blue**, pulled directly from the brand’s core identity to signify authority and digital-first innovation. This is supported by a sophisticated range of "Liquid Neutrals"—translucent whites and cool-toned greys that form the basis of the glassmorphic surfaces.

- **Primary Blue:** Used for high-priority actions, brand moments, and critical data points.
- **Glass Surfaces:** These are not solid; they use varying levels of opacity (40% to 80%) over soft-colored background gradients to create the "liquid" effect.
- **Functional Greys:** Reserved for secondary text and subtle borders to maintain a high-contrast, accessible reading experience against the vibrant primary blue.

## Typography

This design system employs a high-contrast typographic pairing to balance heritage with modernity. 

**Instrument Serif** is used for all headlines and display text. Its elegant, high-contrast strokes reflect professional authority and an editorial quality suitable for healthcare leadership. **Inter** is the workhorse for body copy and UI labels, chosen for its exceptional legibility in data-dense SaaS environments. 

Headlines should be set with tight letter-spacing to feel cohesive, while body text maintains a generous line height to ensure readability across long-form medical documentation or complex dashboards.

## Layout & Spacing

The layout philosophy follows a **fluid grid system** that prioritizes white space to prevent cognitive overload. We use a 12-column grid for desktop with 24px gutters, transitioning to a 4-column grid for mobile with 16px margins.

Spacing is strictly governed by an 8px rhythmic scale. However, to achieve the "liquid" feel, outer container paddings are often more generous than internal component spacing, creating "islands" of content that appear to float on the background. Content should be grouped in logical clusters with clear hierarchical separation using the `lg` (48px) and `xl` (80px) units for section breaks.

## Elevation & Depth

Depth is achieved through **Backdrop Blurs** and **Tonal Layering** rather than traditional heavy shadows. This design system uses three distinct levels of depth:

1.  **Base Layer:** The solid white background or soft mesh gradient.
2.  **Glass Layer (Mid):** Containers using `rgba(255, 255, 255, 0.7)` with a 20px-32px `backdrop-filter: blur()`. These surfaces feature a 1px solid white border at 20% opacity to simulate the edge of a glass pane.
3.  **Floating Layer (Top):** Modals or tooltips using higher opacity and a very soft, diffused ambient shadow (Blue-tinted: `0 20px 40px rgba(17, 17, 255, 0.08)`) to indicate immediate priority.

Avoid solid drop shadows. Every elevated element must allow some color from the layer below to bleed through, maintaining the liquid transparency.

## Shapes

The shape language combines **Rounded** corners with **Organic Curves**. While the system defaults to a `0.5rem` (8px) radius for standard components, decorative elements and large "Liquid Glass" sections should utilize asymmetric border-radii or "squircle" shapes to mimic fluid droplets.

- **Standard UI:** 8px to 16px radius.
- **Interactive Elements:** Pill-shaped buttons (full radius) are preferred for primary calls-to-action to provide a friendly, tactile contrast to the sharper serif headings.
- **Organic Accents:** Use large, blurred vector shapes in the background with irregular, soft-moving gradients in the primary blue and soft lavender.

## Components

- **Buttons:** Primary buttons are solid Vibrant Blue with white text. Secondary buttons are "Glass" buttons—transparent backgrounds with a subtle white border and blurred backdrop.
- **Inputs:** Fields should be semi-transparent with a 1px border. On focus, the border transitions to the primary blue with a soft outer glow.
- **Cards:** Use the "Mid-Layer" elevation settings. Cards should not have shadows; instead, they are defined by their backdrop blur and a thin, light-reflecting border.
- **Chips:** Small, pill-shaped indicators with high-transparency backgrounds. Use the primary blue for text and icons within chips to maintain legibility.
- **Lists:** Clean, borderless rows separated by 1px translucent dividers. Hover states should trigger a subtle increase in background opacity (from 10% to 20% white).
- **Navigation:** A persistent top-bar with a heavy backdrop-blur (40px) to ensure content remains readable as it scrolls underneath the "glass" header.