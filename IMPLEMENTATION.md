# Portfolio — Implementation Plan & Checklist

## Tech Stack
- **Framework:** React 18 + TypeScript (Vite)
- **UI Library:** Chakra UI v2 (for interactive components: Button, Badge, IconButton)
- **Styling:** Vanilla CSS files per component (no CSS-in-JS for custom styles)
- **Fonts:** Google Fonts — `Fraunces` (serif display) + `DM Sans` (body)
- **Build tool:** Vite

---

## Folder Structure

```
Portfolio/
├── public/
│   └── resume.pdf              ← Drop your resume PDF here
├── src/
│   ├── assets/                 ← Static images / SVGs
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.css
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.css
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   └── About.css
│   │   ├── Skills/
│   │   │   ├── Skills.tsx
│   │   │   └── Skills.css
│   │   ├── Projects/
│   │   │   ├── Projects.tsx
│   │   │   └── Projects.css
│   │   ├── Experience/
│   │   │   ├── Experience.tsx
│   │   │   └── Experience.css
│   │   ├── Contact/
│   │   │   ├── Contact.tsx
│   │   │   └── Contact.css
│   │   └── Footer/
│   │       ├── Footer.tsx
│   │       └── Footer.css
│   ├── data/
│   │   ├── skills.ts           ← Skill categories + progress values
│   │   ├── projects.ts         ← Project cards data
│   │   └── experience.ts       ← Timeline entries
│   ├── hooks/
│   │   ├── useScrollDirection.ts    ← Navbar hide/show logic
│   │   └── useIntersectionObserver.ts  ← Animate on scroll
│   ├── styles/
│   │   └── global.css          ← CSS variables + resets + fonts
│   ├── types/
│   │   └── index.ts            ← Shared TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── .env                        ← Personal details (gitignored)
├── .env.example                ← Template for other devs
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── IMPLEMENTATION.md           ← This file
```

---

## Design System

| Token              | Value                          |
|--------------------|-------------------------------|
| White              | `#ffffff`                     |
| Off-white          | `#fafaf9`                     |
| Surface            | `#f3f2ee`                     |
| Text               | `#181810`                     |
| Muted              | `#58584f`                     |
| Accent green       | `#2a5c45`                     |
| Accent light       | `#e6f0eb`                     |
| Border radius card | `8px`                         |
| Border radius pill | `100px`                       |
| Card border        | `1px solid rgba(0,0,0,0.08)` |
| Transition         | `all 0.2s ease`               |
| Hover shadow       | `0 8px 32px rgba(0,0,0,0.07)` |
| Section padding    | `100px 0`                     |
| Display font       | `Fraunces` (serif)            |
| Body font          | `DM Sans` (sans-serif)        |

---

## Implementation Checklist

### Setup
- [x] `package.json` with Vite + React + TS + Chakra UI
- [x] `vite.config.ts`
- [x] `tsconfig.json` + `tsconfig.node.json`
- [x] `index.html` with Google Fonts import
- [x] `.env` + `.env.example`

### Global Styles
- [x] CSS custom properties (design tokens)
- [x] Font imports + base reset
- [x] Section fade-in / slide-up animation keyframes
- [x] Scrollbar styling

### Types & Data
- [x] `src/types/index.ts` — Skill, Project, Experience interfaces
- [x] `src/data/skills.ts` — Grouped skill categories
- [x] `src/data/projects.ts` — 3 project cards
- [x] `src/data/experience.ts` — Timeline entries

### Custom Hooks
- [x] `useScrollDirection` — returns 'up' | 'down' based on scroll delta
- [x] `useIntersectionObserver` — returns ref + isVisible for animate-on-scroll

### Components

#### Navbar
- [x] Fixed position, frosted glass (`backdrop-filter: blur(12px)`)
- [x] Logo left, nav links right
- [x] Hide on scroll down, show on scroll up (useScrollDirection)
- [x] Active link highlight based on current section in viewport
- [x] Smooth scroll on link click

#### Hero
- [x] Two-column layout (text left, card right)
- [x] Animated availability badge ("Open to Work")
- [x] Large serif display name with italic accent word
- [x] Two CTAs — "View Projects" + "Download Resume"
- [x] Right: asymmetric decorative card with stats
- [x] Fade-in entrance animation

#### About
- [x] Split layout — paragraph left, 3 value cards right
- [x] Cards: Clean Code, Performance First, Pixel Perfect

#### Skills
- [x] Grid of skill cards grouped by category
- [x] Each card: emoji icon + skill name + animated progress bar
- [x] Progress bars animate when section enters viewport (IntersectionObserver)

#### Projects
- [x] 3-column grid of project cards
- [x] Each card: title, description, tech tags, Live Demo + GitHub links
- [x] Hover lift effect (translateY -4px + shadow)

#### Experience
- [x] Vertical timeline layout
- [x] 3 entries from resume (Juspay, Intervue.io, AppAvengers)
- [x] Fade-in per timeline node

#### Contact
- [x] Centered section with tagline
- [x] Email CTA button
- [x] Social links row

#### Footer
- [x] Single line — name + year + "Built with care"

---

## Environment Variables

All sensitive / configurable personal details live in `.env`:

```
VITE_NAME            → Display name
VITE_ROLE            → Job title / headline
VITE_EMAIL           → Contact email
VITE_PHONE           → Phone (optional display)
VITE_LOCATION        → City, Country
VITE_GITHUB_URL      → Full GitHub profile URL
VITE_LINKEDIN_URL    → Full LinkedIn profile URL
VITE_LEETCODE_URL    → Full LeetCode profile URL
VITE_RESUME_URL      → Path or URL to resume PDF
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env
# Edit .env with your details

# Drop your resume PDF into public/resume.pdf

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## UX Behaviours (implemented)

| Behaviour | Mechanism |
|---|---|
| Navbar hide/show | `useScrollDirection` hook + CSS `transform: translateY(-100%)` |
| Skill bar animation | `useIntersectionObserver` + CSS `width` transition from 0 |
| Section entrance | `IntersectionObserver` adds `.visible` class → fade + slide-up |
| Active nav link | Scroll listener tracks which section is in viewport |
| Project card lift | CSS `:hover` `transform: translateY(-4px)` + `box-shadow` |
| Smooth scroll | `scroll-behavior: smooth` on `html` + JS `scrollIntoView` |
