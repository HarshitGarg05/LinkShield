---
name: "Neo Memphis"
slug: "neo-memphis"
schema: "freedesignmd/v2"
description: "Playful Memphis geometry for kids and education: chunky Fredoka headlines, thick ink outlines, hard offset shadows and a confetti palette of tomato, sun yellow, mint and sky. Built for learning apps, school tools and family products."
source: "https://freedesignmd.com/system/neo-memphis"
aesthetic: "expressive"
industry: "education"
default_mode: "light"
fonts:
  display: "Fredoka"
  body: "Nunito"
  mono: "Space Mono"
  google_fonts_url: "https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap"
colors:
  light:
    background: "#fff6df"
    foreground: "#1b1530"
    card: "#ffffff"
    cardForeground: "#1b1530"
    muted: "#ffeabd"
    mutedForeground: "#5b4f66"
    primary: "#d62839"
    primaryForeground: "#ffffff"
    secondary: "#b9e8d6"
    secondaryForeground: "#0f3a2d"
    accent: "#ffd23f"
    accentForeground: "#1b1530"
    border: "#1b1530"
    input: "#1b1530"
    ring: "#2b59d9"
    destructive: "#a8182a"
    destructiveForeground: "#ffffff"
    success: "#0e7a54"
    successForeground: "#ffffff"
    warning: "#ffb020"
    warningForeground: "#241800"
  dark:
    background: "#1c1740"
    foreground: "#fff3d6"
    card: "#2a2360"
    cardForeground: "#fff3d6"
    muted: "#352d78"
    mutedForeground: "#cdc3ee"
    primary: "#ff6b7a"
    primaryForeground: "#2a0610"
    secondary: "#2d6b5c"
    secondaryForeground: "#e2fff3"
    accent: "#ffd23f"
    accentForeground: "#1b1530"
    border: "#fff3d6"
    input: "#fff3d6"
    ring: "#7fb2ff"
    destructive: "#ff8b94"
    destructiveForeground: "#2e0508"
    success: "#4fdca5"
    successForeground: "#042418"
    warning: "#ffc54d"
    warningForeground: "#241800"
chart:
  light: ["#d62839", "#ffb020", "#1fa584", "#2b59d9", "#8a4fd6"]
  dark: ["#ff6b7a", "#ffc54d", "#4fdca5", "#7fb2ff", "#c39bff"]
type:
  display: { font: display, size: 80, size_mobile: 45, leading: 1, weight: 700, tracking: "-0.01em" }
  h1: { font: display, size: 52, size_mobile: 35, leading: 1.05, weight: 600, tracking: "-0.01em" }
  h2: { font: display, size: 34, size_mobile: 27, leading: 1.15, weight: 600, tracking: "0em" }
  h3: { font: display, size: 22, size_mobile: 22, leading: 1.25, weight: 600, tracking: "0em" }
  body: { font: body, size: 17, size_mobile: 17, leading: 1.6, weight: 400, tracking: "0em" }
  small: { font: body, size: 15, size_mobile: 15, leading: 1.5, weight: 600, tracking: "0em" }
  label: { font: body, size: 13, size_mobile: 13, leading: 1.3, weight: 700, tracking: "0.04em", uppercase: true }
  mono: { font: mono, size: 13, size_mobile: 13, leading: 1.5, weight: 400, tracking: "0em" }
spacing: [4, 8, 12, 16, 24, 32, 40, 56, 80, 112]
radius: { sm: "8px", md: "14px", lg: "20px", xl: "28px", full: "9999px" }
shadow:
  light:
    sm: "3px 3px 0 #1b1530"
    md: "5px 5px 0 #1b1530"
    lg: "8px 8px 0 #1b1530"
  dark:
    sm: "3px 3px 0 #0d0a26"
    md: "5px 5px 0 #0d0a26"
    lg: "8px 8px 0 #0d0a26"
motion:
  duration_ms: { instant: 80, fast: 140, base: 240, slow: 520 }
  easing: { standard: "cubic-bezier(0.3, 0, 0.2, 1)", out: "cubic-bezier(0.34, 1.56, 0.64, 1)", in: "cubic-bezier(0.5, 0, 1, 1)" }
  reveal: { distance_px: 20, stagger_ms: 70 }
layout: { max_width: 1140, columns: 12, gutter: 24, section_y: 96, section_y_mobile: 56, measure: "56ch" }
---

# Neo Memphis, DESIGN.md

> Playful Memphis geometry for kids and education: chunky Fredoka headlines, thick ink outlines, hard offset shadows and a confetti palette of tomato, sun yellow, mint and sky. Built for learning apps, school tools and family products.

## How to use this file

1. Save this file as `DESIGN.md` in the project root and paste the `tokens.css` block (section 10) into your global stylesheet, or import `https://freedesignmd.com/system/neo-memphis.css`, which also contains every component class.
2. **Claude Code:** add `Before any UI work, read @DESIGN.md and use only its tokens and component recipes.` to `CLAUDE.md`.
3. **Cursor:** create `.cursor/rules/design.mdc` with `alwaysApply: true` and the line `Follow @DESIGN.md for every color, font, radius, shadow, spacing and duration.`
4. **Lovable:** paste section 10 into `src/index.css` and add this file to Project Knowledge; ask for changes by role name (`primary`, `muted-foreground`), never by hex.
5. Default mode is **light**: dark mode is `class="dark"` on `<html>` (both modes are fully specified). Use semantic names only (`bg-primary`, `text-muted-foreground`, `.btn-primary`, `var(--radius-lg)`); if a value is not in this file, it does not belong in the UI.

## 1. Overview & personality

Neo Memphis is a classroom wall rather than a lecture hall. Every surface is outlined in a 2.5px ink stroke and lifted by a hard, un-blurred offset shadow, so buttons and cards look like cut-out stickers. Fredoka headlines are round and friendly, Nunito body text stays readable for early readers, and the palette is four saturated confetti colors on warm cream. Squiggles, dots, triangles and half-circles are used as decoration, always behind content and never in the reading path. Dark mode becomes a night-sky indigo with the same sticker outlines in cream.

**At a glance**

- Aesthetic: Bold & expressive · Industry: Education · Default mode: light
- Type: Fredoka (display) · Nunito (body) · Space Mono (mono)
- Brand color (`primary`): `#d62839` light · `#ff6b7a` dark, on primary, text is `#ffffff` / `#2a0610`
- Corners: 8px / 14px / 20px / 28px · Container 1140px · Base motion 240ms

**Signature moves**

- 2.5px ink outlines on every interactive surface with a 4px hard offset shadow and zero blur
- Sticker press: buttons travel 4px down-right on press until the shadow disappears
- Memphis confetti shapes (squiggle, dots, triangle, half-circle) scattered behind hero and empty states
- Each subject owns a color: maths tomato, reading sun yellow, science mint, art sky
- Rounded Fredoka headlines at weight 600 with a slight -0.01em tracking

## 2. Color

Roles follow shadcn/ui naming, so `primary` is always the brand / main-action color and `foreground` is always body text. Every text pair below is WCAG AA (≥ 4.5:1) in both modes.

### Light mode (`:root`)

| Role | CSS variable | Value | Contrast | Usage |
|---|---|---|---|---|
| `background` | `--background` | `#fff6df` |  | Page canvas |
| `foreground` | `--foreground` | `#1b1530` | 16.30:1 on background | Body text and headings on background |
| `card` | `--card` | `#ffffff` |  | Cards, panels, popovers |
| `cardForeground` | `--card-foreground` | `#1b1530` | 17.55:1 on card | Text on card |
| `muted` | `--muted` | `#ffeabd` |  | Subtle fills: table headers, code, skeletons |
| `mutedForeground` | `--muted-foreground` | `#5b4f66` | 6.44:1 on muted | Secondary text, captions, placeholders |
| `primary` | `--primary` | `#d62839` |  | Brand color: primary buttons, links, focus, active states |
| `primaryForeground` | `--primary-foreground` | `#ffffff` | 4.97:1 on primary | Text and icons on primary |
| `secondary` | `--secondary` | `#b9e8d6` |  | Secondary buttons and quiet fills |
| `secondaryForeground` | `--secondary-foreground` | `#0f3a2d` | 9.36:1 on secondary | Text on secondary |
| `accent` | `--accent` | `#ffd23f` |  | Hover and selected backgrounds (rows, menu items, ghost buttons) |
| `accentForeground` | `--accent-foreground` | `#1b1530` | 12.15:1 on accent | Text on accent |
| `border` | `--border` | `#1b1530` |  | Dividers and card outlines |
| `input` | `--input` | `#1b1530` |  | Input borders |
| `ring` | `--ring` | `#2b59d9` |  | Focus ring |
| `destructive` | `--destructive` | `#a8182a` |  | Errors and destructive actions |
| `destructiveForeground` | `--destructive-foreground` | `#ffffff` | 7.42:1 on destructive | Text on destructive |
| `success` | `--success` | `#0e7a54` |  | Positive status |
| `successForeground` | `--success-foreground` | `#ffffff` | 5.34:1 on success | Text on success |
| `warning` | `--warning` | `#ffb020` |  | Caution status |
| `warningForeground` | `--warning-foreground` | `#241800` | 9.52:1 on warning | Text on warning |
| `chart-1…5` | `--chart-1…5` | `#d62839` `#ffb020` `#1fa584` `#2b59d9` `#8a4fd6` | | Data series, in this order |

### Dark mode (`.dark`)

| Role | CSS variable | Value | Contrast | Usage |
|---|---|---|---|---|
| `background` | `--background` | `#1c1740` |  | Page canvas |
| `foreground` | `--foreground` | `#fff3d6` | 15.28:1 on background | Body text and headings on background |
| `card` | `--card` | `#2a2360` |  | Cards, panels, popovers |
| `cardForeground` | `--card-foreground` | `#fff3d6` | 12.63:1 on card | Text on card |
| `muted` | `--muted` | `#352d78` |  | Subtle fills: table headers, code, skeletons |
| `mutedForeground` | `--muted-foreground` | `#cdc3ee` | 7.03:1 on muted | Secondary text, captions, placeholders |
| `primary` | `--primary` | `#ff6b7a` |  | Brand color: primary buttons, links, focus, active states |
| `primaryForeground` | `--primary-foreground` | `#2a0610` | 6.75:1 on primary | Text and icons on primary |
| `secondary` | `--secondary` | `#2d6b5c` |  | Secondary buttons and quiet fills |
| `secondaryForeground` | `--secondary-foreground` | `#e2fff3` | 5.89:1 on secondary | Text on secondary |
| `accent` | `--accent` | `#ffd23f` |  | Hover and selected backgrounds (rows, menu items, ghost buttons) |
| `accentForeground` | `--accent-foreground` | `#1b1530` | 12.15:1 on accent | Text on accent |
| `border` | `--border` | `#fff3d6` |  | Dividers and card outlines |
| `input` | `--input` | `#fff3d6` |  | Input borders |
| `ring` | `--ring` | `#7fb2ff` |  | Focus ring |
| `destructive` | `--destructive` | `#ff8b94` |  | Errors and destructive actions |
| `destructiveForeground` | `--destructive-foreground` | `#2e0508` | 8.21:1 on destructive | Text on destructive |
| `success` | `--success` | `#4fdca5` |  | Positive status |
| `successForeground` | `--success-foreground` | `#042418` | 9.53:1 on success | Text on success |
| `warning` | `--warning` | `#ffc54d` |  | Caution status |
| `warningForeground` | `--warning-foreground` | `#241800` | 11.07:1 on warning | Text on warning |
| `chart-1…5` | `--chart-1…5` | `#ff6b7a` `#ffc54d` `#4fdca5` `#7fb2ff` `#c39bff` | | Data series, in this order |

## 3. Typography

Load fonts with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap" />
```

| Role | Font | Size (390px → 1440px) | Line height | Weight | Tracking | Style | Class |
|---|---|---|---|---|---|---|---|
| `display` | Fredoka | 45px → 80px | 1 | 700 | -0.01em | – | `.type-display` |
| `h1` | Fredoka | 35px → 52px | 1.05 | 600 | -0.01em | – | `.type-h1` |
| `h2` | Fredoka | 27px → 34px | 1.15 | 600 | 0em | – | `.type-h2` |
| `h3` | Fredoka | 22px | 1.25 | 600 | 0em | – | `.type-h3` |
| `body` | Nunito | 17px | 1.6 | 400 | 0em | – | `.type-body` |
| `small` | Nunito | 15px | 1.5 | 600 | 0em | – | `.type-small` |
| `label` | Nunito | 13px | 1.3 | 700 | 0.04em | uppercase | `.type-label` |
| `mono` | Space Mono | 13px | 1.5 | 400 | 0em | – | `.type-mono` |

- `h1`–`h3` elements map to the roles of the same name; `display` is for one hero headline per page.
- Fluid sizes use `clamp()` between the two values (see `--type-*-size` in tokens.css).
- Only the weights in this table are loaded; never use other weights.

## 4. Spacing & layout

Spacing is a 4px scale. Use these steps only (`--space-N` = N × 4px):

| Token | `--space-1` | `--space-2` | `--space-3` | `--space-4` | `--space-6` | `--space-8` | `--space-10` | `--space-14` | `--space-20` | `--space-28` |
|---|---|---|---|---|---|---|---|---|---|---|
| px | 4 | 8 | 12 | 16 | 24 | 32 | 40 | 56 | 80 | 112 |

- Container: max 1140px, 24px side gutters (`.container`).
- Grid: 12 columns, 24px gap.
- Sections: 96px vertical padding on desktop, 56px on mobile (`.section`).
- Long text: max 56ch per line (`.prose`).
- Content sits in 1140px with confetti shapes allowed to bleed 80px outside the container.
- Lesson screens are one task per screen: a 560px column with a progress bar pinned at the top.
- Cards tilt between -1.5deg and 1.5deg in grids of three; tilt resets on hover.

## 5. Shape & elevation

| Radius | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | badges, checkboxes, small chips |
| `--radius-md` | 14px | buttons, inputs, tabs (= shadcn `--radius`) |
| `--radius-lg` | 20px | cards, panels, menus |
| `--radius-xl` | 28px | dialogs, hero media, large surfaces |
| `--radius-full` | 9999px | avatars, pills, toggles |

| Shadow | Mode | Value |
|---|---|---|
| `--shadow-sm` | light | `3px 3px 0 #1b1530` |
| `--shadow-md` | light | `5px 5px 0 #1b1530` |
| `--shadow-lg` | light | `8px 8px 0 #1b1530` |
| `--shadow-sm` | dark | `3px 3px 0 #0d0a26` |
| `--shadow-md` | dark | `5px 5px 0 #0d0a26` |
| `--shadow-lg` | dark | `8px 8px 0 #0d0a26` |

`sm` = resting card · `md` = hover / raised · `lg` = dialogs and popovers. Nothing else casts a shadow.

## 6. Motion

**Sticker pop.** Elements land like stickers: scale from 0.92 to 1 with a small overshoot on the `out` curve, while confetti shapes drift 6px over `slow`. Buttons press by moving 4px down-right as their hard shadow collapses.

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 80ms | press feedback, toggles |
| `--duration-fast` | 140ms | hover, focus, color changes |
| `--duration-base` | 240ms | menus, tabs, popovers, cards lifting |
| `--duration-slow` | 520ms | dialogs and scroll reveals |
| `--ease-standard` | `cubic-bezier(0.3, 0, 0.2, 1)` | state changes |
| `--ease-out` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | entrances and reveals |
| `--ease-in` | `cubic-bezier(0.5, 0, 1, 1)` | exits |

- Scroll reveal (`.reveal` → `.reveal.is-in` via IntersectionObserver): rise 20px and fade over `--duration-slow` with `--ease-out`; siblings stagger by 70ms (`--reveal-index`).
- Use no durations other than the four above.
- `prefers-reduced-motion: reduce` → no transforms, reveals show immediately (included in tokens.css).

## 7. Components

Every component reads only variables from section 10, so light and dark mode work with no extra code. These are the exact rules (also in `https://freedesignmd.com/system/neo-memphis.css`). In React/shadcn projects, put the same declarations on the matching shadcn component variants.

### Button

```html
<button class="btn btn-primary">Save</button>  <!-- btn-secondary · btn-outline · btn-ghost -->
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 52px;
  padding: 0 26px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0em;
  border-radius: var(--radius-full);
  border: 2.5px solid var(--foreground);
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  transition: background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard);
}
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: var(--shadow-sm);
}
.btn-primary:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 var(--foreground);
}
.btn-primary:active:not(:disabled) {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 var(--foreground);
}
.btn-secondary {
  background: var(--accent);
  color: var(--accent-foreground);
  box-shadow: var(--shadow-sm);
}
.btn-secondary:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 var(--foreground);
}
.btn-secondary:active:not(:disabled) {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 var(--foreground);
}
.btn-outline {
  background: var(--card);
  color: var(--foreground);
  box-shadow: var(--shadow-sm);
}
.btn-outline:hover:not(:disabled) {
  background: var(--secondary);
  color: var(--secondary-foreground);
}
.btn-outline:active:not(:disabled) {
  transform: translate(3px, 3px);
  box-shadow: 0 0 0 var(--foreground);
}
.btn-ghost {
  background: transparent;
  color: var(--foreground);
  border-color: transparent;
}
.btn-ghost:hover:not(:disabled) {
  background: var(--muted);
  border-color: var(--foreground);
}
.btn-ghost:active:not(:disabled) {
  background: var(--accent);
}
.btn:focus-visible {
  outline: 3px solid var(--ring);
  outline-offset: 4px;
}
.btn:disabled, .btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
```

### Input

```html
<input class="input" placeholder="you@company.com" />  <!-- aria-invalid="true" for errors -->
```

```css
.input {
  display: block;
  width: 100%;
  height: 52px;
  padding: 0 18px;
  font-family: var(--font-sans);
  font-size: 17px;
  color: var(--foreground);
  background: var(--card);
  border: 2.5px solid var(--input);
  border-radius: var(--radius-md);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard);
}
.input::placeholder {
  color: var(--muted-foreground);
  opacity: 1;
}
.input:hover:not(:disabled):not(:focus) {
  border-color: var(--primary);
}
.input:focus, .input:focus-visible {
  border-color: var(--ring);
  box-shadow: 4px 4px 0 var(--ring);
}
.input[aria-invalid="true"] {
  border-color: var(--destructive);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--destructive) 22%, transparent);
}
.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--muted);
}
```

### Card

```html
<article class="card">…</article>  <!-- add card-interactive when the whole card is a link -->
```

```css
.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 2.5px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 24px;
  transition: border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out), background-color var(--duration-base) var(--ease-out);
}
.card-interactive:hover {
  transform: translate(-2px, -2px) rotate(-0.5deg);
  box-shadow: var(--shadow-lg);
}
```

### Badge

```html
<span class="badge badge-soft" data-tone="success">Paid</span>  <!-- badge-solid · badge-outline; tones: primary (default) · success · warning · destructive -->
```

```css
.badge {
  --tone: var(--primary);
  --tone-foreground: var(--primary-foreground);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 12px;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}
.badge[data-tone="success"] {
  --tone: var(--success);
  --tone-foreground: var(--success-foreground);
}
.badge[data-tone="warning"] {
  --tone: var(--warning);
  --tone-foreground: var(--warning-foreground);
}
.badge[data-tone="destructive"] {
  --tone: var(--destructive);
  --tone-foreground: var(--destructive-foreground);
}
.badge-solid {
  background: var(--tone);
  color: var(--tone-foreground);
  border: 1px solid var(--tone);
}
.badge-soft {
  background: color-mix(in oklab, var(--tone) 24%, var(--card));
  color: var(--foreground);
  border: 1px solid color-mix(in oklab, var(--tone) 40%, transparent);
}
.badge-outline {
  background: transparent;
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

### Navigation bar

```html
<nav class="nav"><a class="nav-link" aria-current="page">Home</a><a class="nav-link">Docs</a></nav>
```

```css
.nav {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 72px;
  padding: 0 24px;
  background: var(--background);
  border-bottom: 2.5px solid var(--foreground);
}
.nav-link {
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0em;
  color: var(--muted-foreground);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard);
}
.nav-link:hover {
  color: var(--foreground);
  background: var(--muted);
}
.nav-link[aria-current="page"] {
  color: var(--primary-foreground);
  background: var(--primary);
}
```

### Tabs

```html
<div class="tabs" role="tablist"><button class="tab" role="tab" aria-selected="true">Overview</button>…</div>
```

```css
.tabs {
  display: flex;
  gap: 8px;
}
.tab {
  height: 44px;
  padding: 0 16px;
  border: 2px solid var(--foreground);
  border-radius: 0;
  background: var(--card);
  color: var(--foreground);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0em;
  transition: color var(--duration-base) var(--ease-standard), background-color var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard);
}
.tab:hover:not([aria-selected="true"]) {
  background: var(--accent);
  color: var(--accent-foreground);
}
.tab[aria-selected="true"] {
  background: var(--foreground);
  color: var(--background);
  box-shadow: 4px 4px 0 var(--primary);
}
```

### Table

```html
<table class="table"><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td></tr></tbody></table>
```

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  font-variant-numeric: tabular-nums;
}
.table th {
  text-align: left;
  height: 40px;
  padding: 0 16px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: var(--foreground);
  color: var(--background);
}
.table td {
  height: 52px;
  padding: 0 16px;
  border-bottom: 2px solid var(--border);
  color: var(--foreground);
  transition: background-color var(--duration-fast) var(--ease-standard);
}
.table tbody tr:hover td {
  background: var(--accent);
  color: var(--accent-foreground);
}
```

### Dialog / modal

```html
<div class="dialog-overlay"><div class="dialog" role="dialog" aria-modal="true">…</div></div>
```

```css
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(27,21,48,0.6);
  display: grid;
  place-items: center;
  padding: 24px;
}
.dialog {
  width: min(500px, 100%);
  background: var(--card);
  color: var(--card-foreground);
  border: 2.5px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 32px;
}
```

### Text link

```html
<a class="link" href="…">Read more</a>
```

```css
.link {
  color: var(--foreground);
  text-decoration: underline;
  text-decoration-color: var(--primary);
  text-decoration-thickness: 3px;
  text-underline-offset: 4px;
  transition: color var(--duration-fast) var(--ease-standard), text-decoration-color var(--duration-fast) var(--ease-standard);
}
.link:hover {
  background: var(--accent);
  text-decoration-color: var(--foreground);
}
```

## 8. Imagery & iconography

**Imagery.** Flat cut-paper illustration with 2.5px ink outlines: friendly animals, number and letter characters, and chunky objects, filled with the four confetti colors. Photography, when needed, is of real classrooms cropped into circles, triangles or arches with the same ink outline and offset shadow. No gradients, no realistic 3D.

**Icons.** 28px chunky icons at 2.5px stroke with round caps, filled with a flat confetti color inside the outline. Subject icons: a plus sign for maths, an open book for reading, a flask for science, a brush for art.

## 9. Do / Don't

**Do**

- Outline every interactive surface at 2.5px in `foreground` and give it a hard offset shadow with no blur
- Give each subject one confetti color and reuse it for icons, progress and badges
- Keep body copy at 17px with 1.6 line height so early readers can track lines
- Make correct answers pop with `success` and a sticker burst; wrong answers shake once and offer a hint
- Place confetti shapes behind content and keep them out of the reading path

**Don't**

- Don't blur shadows; softness breaks the sticker look
- Don't use more than three confetti colors in one view
- Don't use `destructive` red on a child's mistakes; use `warning` and a hint instead
- Don't put text over confetti shapes; contrast is only guaranteed on `card` and `background`
- Don't use thin outlines or hairlines; 2.5px is the minimum stroke

## 10. tokens.css

Drop-in, shadcn/ui-compatible. Works with Tailwind v4 as-is (the `@theme inline` block creates `bg-primary`, `text-muted-foreground`, `font-heading`, `text-display`, `rounded-ui-lg`, `shadow-ui-md`…). Plain CSS projects can ignore the `@theme` block.

```css
/* Neo Memphis, tokens.css
 * https://freedesignmd.com/system/neo-memphis
 * shadcn/ui-compatible variables. Light on :root, dark on .dark.
 * Default mode: light.
 */
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap");

:root {
  --font-display: "Fredoka", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-sans: "Nunito", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "Space Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  --type-display-size: clamp(45px, 32.00px + 3.333vw, 80px);
  --type-display-leading: 1;
  --type-display-weight: 700;
  --type-display-tracking: -0.01em;
  --type-h1-size: clamp(35px, 28.69px + 1.619vw, 52px);
  --type-h1-leading: 1.05;
  --type-h1-weight: 600;
  --type-h1-tracking: -0.01em;
  --type-h2-size: clamp(27px, 24.40px + 0.667vw, 34px);
  --type-h2-leading: 1.15;
  --type-h2-weight: 600;
  --type-h2-tracking: 0em;
  --type-h3-size: 22px;
  --type-h3-leading: 1.25;
  --type-h3-weight: 600;
  --type-h3-tracking: 0em;
  --type-body-size: 17px;
  --type-body-leading: 1.6;
  --type-body-weight: 400;
  --type-body-tracking: 0em;
  --type-small-size: 15px;
  --type-small-leading: 1.5;
  --type-small-weight: 600;
  --type-small-tracking: 0em;
  --type-label-size: 13px;
  --type-label-leading: 1.3;
  --type-label-weight: 700;
  --type-label-tracking: 0.04em;
  --type-mono-size: 13px;
  --type-mono-leading: 1.5;
  --type-mono-weight: 400;
  --type-mono-tracking: 0em;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-14: 56px;
  --space-20: 80px;
  --space-28: 112px;
  --radius: 14px;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;
  --duration-instant: 80ms;
  --duration-fast: 140ms;
  --duration-base: 240ms;
  --duration-slow: 520ms;
  --ease-standard: cubic-bezier(0.3, 0, 0.2, 1);
  --ease-out: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in: cubic-bezier(0.5, 0, 1, 1);
  --reveal-distance: 20px;
  --reveal-stagger: 70ms;
  --container-max: 1140px;
  --gutter: 24px;
  --section-y: 96px;
  --section-y-mobile: 56px;
  --measure: 56ch;
  --background: #fff6df;
  --foreground: #1b1530;
  --card: #ffffff;
  --card-foreground: #1b1530;
  --muted: #ffeabd;
  --muted-foreground: #5b4f66;
  --primary: #d62839;
  --primary-foreground: #ffffff;
  --secondary: #b9e8d6;
  --secondary-foreground: #0f3a2d;
  --accent: #ffd23f;
  --accent-foreground: #1b1530;
  --border: #1b1530;
  --input: #1b1530;
  --ring: #2b59d9;
  --destructive: #a8182a;
  --destructive-foreground: #ffffff;
  --success: #0e7a54;
  --success-foreground: #ffffff;
  --warning: #ffb020;
  --warning-foreground: #241800;
  --chart-1: #d62839;
  --chart-2: #ffb020;
  --chart-3: #1fa584;
  --chart-4: #2b59d9;
  --chart-5: #8a4fd6;
  --shadow-sm: 3px 3px 0 #1b1530;
  --shadow-md: 5px 5px 0 #1b1530;
  --shadow-lg: 8px 8px 0 #1b1530;
}

.dark {
  --background: #1c1740;
  --foreground: #fff3d6;
  --card: #2a2360;
  --card-foreground: #fff3d6;
  --muted: #352d78;
  --muted-foreground: #cdc3ee;
  --primary: #ff6b7a;
  --primary-foreground: #2a0610;
  --secondary: #2d6b5c;
  --secondary-foreground: #e2fff3;
  --accent: #ffd23f;
  --accent-foreground: #1b1530;
  --border: #fff3d6;
  --input: #fff3d6;
  --ring: #7fb2ff;
  --destructive: #ff8b94;
  --destructive-foreground: #2e0508;
  --success: #4fdca5;
  --success-foreground: #042418;
  --warning: #ffc54d;
  --warning-foreground: #241800;
  --chart-1: #ff6b7a;
  --chart-2: #ffc54d;
  --chart-3: #4fdca5;
  --chart-4: #7fb2ff;
  --chart-5: #c39bff;
  --shadow-sm: 3px 3px 0 #0d0a26;
  --shadow-md: 5px 5px 0 #0d0a26;
  --shadow-lg: 8px 8px 0 #0d0a26;
}

/* Tailwind v4: utilities like bg-primary, text-muted-foreground, font-heading, text-display, rounded-ui-lg, shadow-ui-md */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --font-heading: var(--font-display);
  --font-body: var(--font-sans);
  --font-code: var(--font-mono);
  --radius-ui-sm: var(--radius-sm);
  --radius-ui-md: var(--radius-md);
  --radius-ui-lg: var(--radius-lg);
  --radius-ui-xl: var(--radius-xl);
  --text-display: var(--type-display-size);
  --text-display--line-height: var(--type-display-leading);
  --text-display--letter-spacing: var(--type-display-tracking);
  --text-display--font-weight: var(--type-display-weight);
  --text-h1: var(--type-h1-size);
  --text-h1--line-height: var(--type-h1-leading);
  --text-h1--letter-spacing: var(--type-h1-tracking);
  --text-h1--font-weight: var(--type-h1-weight);
  --text-h2: var(--type-h2-size);
  --text-h2--line-height: var(--type-h2-leading);
  --text-h2--letter-spacing: var(--type-h2-tracking);
  --text-h2--font-weight: var(--type-h2-weight);
  --text-h3: var(--type-h3-size);
  --text-h3--line-height: var(--type-h3-leading);
  --text-h3--letter-spacing: var(--type-h3-tracking);
  --text-h3--font-weight: var(--type-h3-weight);
  --text-body: var(--type-body-size);
  --text-body--line-height: var(--type-body-leading);
  --text-body--letter-spacing: var(--type-body-tracking);
  --text-body--font-weight: var(--type-body-weight);
  --text-small: var(--type-small-size);
  --text-small--line-height: var(--type-small-leading);
  --text-small--letter-spacing: var(--type-small-tracking);
  --text-small--font-weight: var(--type-small-weight);
  --text-label: var(--type-label-size);
  --text-label--line-height: var(--type-label-leading);
  --text-label--letter-spacing: var(--type-label-tracking);
  --text-label--font-weight: var(--type-label-weight);
  --text-mono: var(--type-mono-size);
  --text-mono--line-height: var(--type-mono-leading);
  --text-mono--letter-spacing: var(--type-mono-tracking);
  --text-mono--font-weight: var(--type-mono-weight);
  --shadow-ui-sm: var(--shadow-sm);
  --shadow-ui-md: var(--shadow-md);
  --shadow-ui-lg: var(--shadow-lg);
}

@layer base {
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    font-size: var(--type-body-size);
    line-height: var(--type-body-leading);
    font-weight: var(--type-body-weight);
    letter-spacing: var(--type-body-tracking);
    -webkit-font-smoothing: antialiased;
  }
  .type-display {
    font-family: var(--font-display);
    font-size: var(--type-display-size);
    line-height: var(--type-display-leading);
    font-weight: var(--type-display-weight);
    letter-spacing: var(--type-display-tracking);
  }
  .type-h1 {
    font-family: var(--font-display);
    font-size: var(--type-h1-size);
    line-height: var(--type-h1-leading);
    font-weight: var(--type-h1-weight);
    letter-spacing: var(--type-h1-tracking);
  }
  .type-h2 {
    font-family: var(--font-display);
    font-size: var(--type-h2-size);
    line-height: var(--type-h2-leading);
    font-weight: var(--type-h2-weight);
    letter-spacing: var(--type-h2-tracking);
  }
  .type-h3 {
    font-family: var(--font-display);
    font-size: var(--type-h3-size);
    line-height: var(--type-h3-leading);
    font-weight: var(--type-h3-weight);
    letter-spacing: var(--type-h3-tracking);
  }
  .type-body {
    font-family: var(--font-sans);
    font-size: var(--type-body-size);
    line-height: var(--type-body-leading);
    font-weight: var(--type-body-weight);
    letter-spacing: var(--type-body-tracking);
  }
  .type-small {
    font-family: var(--font-sans);
    font-size: var(--type-small-size);
    line-height: var(--type-small-leading);
    font-weight: var(--type-small-weight);
    letter-spacing: var(--type-small-tracking);
  }
  .type-label {
    font-family: var(--font-sans);
    font-size: var(--type-label-size);
    line-height: var(--type-label-leading);
    font-weight: var(--type-label-weight);
    letter-spacing: var(--type-label-tracking);
    text-transform: uppercase;
  }
  .type-mono {
    font-family: var(--font-mono);
    font-size: var(--type-mono-size);
    line-height: var(--type-mono-leading);
    font-weight: var(--type-mono-weight);
    letter-spacing: var(--type-mono-tracking);
  }
  h1 {
    font-family: var(--font-display);
    font-size: var(--type-h1-size);
    line-height: var(--type-h1-leading);
    font-weight: var(--type-h1-weight);
    letter-spacing: var(--type-h1-tracking);
  }
  h2 {
    font-family: var(--font-display);
    font-size: var(--type-h2-size);
    line-height: var(--type-h2-leading);
    font-weight: var(--type-h2-weight);
    letter-spacing: var(--type-h2-tracking);
  }
  h3 {
    font-family: var(--font-display);
    font-size: var(--type-h3-size);
    line-height: var(--type-h3-leading);
    font-weight: var(--type-h3-weight);
    letter-spacing: var(--type-h3-tracking);
  }
  code, kbd, samp, pre {
    font-family: var(--font-mono);
  }
  ::selection {
    background: var(--primary);
    color: var(--primary-foreground);
  }
  .container {
    width: 100%;
    max-width: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--gutter);
  }
  .section {
    padding-block: var(--section-y);
  }
  .prose {
    max-width: var(--measure);
  }
  .reveal {
    opacity: 0;
    transform: translateY(var(--reveal-distance));
    transition: opacity var(--duration-slow) var(--ease-out), transform var(--duration-slow) var(--ease-out);
    transition-delay: calc(var(--reveal-index, 0) * var(--reveal-stagger));
  }
  .reveal.is-in {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; transition: none; }
    *, *::before, *::after { transition-duration: 0s !important; animation-duration: 0s !important; animation-iteration-count: 1 !important; }
  }
}
```

Tailwind v3:

```js
// tailwind.config.js, Tailwind v3 (v4 users: the @theme block in tokens.css does this)
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "var(--background)",
        "foreground": "var(--foreground)",
        "card": { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
        "muted": { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
        "primary": { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
        "secondary": { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
        "accent": { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
        "border": "var(--border)",
        "input": "var(--input)",
        "ring": "var(--ring)",
        "destructive": { DEFAULT: "var(--destructive)", foreground: "var(--destructive-foreground)" },
        "success": { DEFAULT: "var(--success)", foreground: "var(--success-foreground)" },
        "warning": { DEFAULT: "var(--warning)", foreground: "var(--warning-foreground)" },
        chart: { 1: "var(--chart-1)", 2: "var(--chart-2)", 3: "var(--chart-3)", 4: "var(--chart-4)", 5: "var(--chart-5)" },
      },
      fontFamily: { heading: ["var(--font-display)"], body: ["var(--font-sans)"], code: ["var(--font-mono)"] },
      borderRadius: { "ui-sm": "var(--radius-sm)", "ui-md": "var(--radius-md)", "ui-lg": "var(--radius-lg)", "ui-xl": "var(--radius-xl)" },
      boxShadow: { "ui-sm": "var(--shadow-sm)", "ui-md": "var(--shadow-md)", "ui-lg": "var(--shadow-lg)" },
      transitionDuration: { instant: "var(--duration-instant)", fast: "var(--duration-fast)", base: "var(--duration-base)", slow: "var(--duration-slow)" },
      transitionTimingFunction: { standard: "var(--ease-standard)", out: "var(--ease-out)", in: "var(--ease-in)" },
      maxWidth: { container: "var(--container-max)", measure: "var(--measure)" },
    },
  },
};
```
