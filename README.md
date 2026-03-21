# mayank-portfolio

Personal developer portfolio built with React, TypeScript, and vanilla CSS — featuring a live code typewriter, smooth scroll interactions, and a clean white design system.

**[Live →](https://rajmayank93.github.io/mayank-portfolio)**

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| UI Components | Chakra UI v2 |
| Styling | Vanilla CSS (custom design system) |
| Fonts | Fraunces (display) + DM Sans (body) via Google Fonts |

---

## Features

- **Live code typewriter** — Hero section cycles through 3 real code snippets (SSE hook, IndexedDB cache, JAF agent) with character-by-character typing, syntax colouring, and auto-erase loop
- **Frosted glass navbar** — hides on scroll down, reappears on scroll up; active section tracking via IntersectionObserver
- **Scroll-triggered animations** — sections fade + slide up on viewport entry
- **Skill tag cloud** — grouped pill badges by category, no vanity progress bars
- **Responsive** — all two-column layouts stack at ≤ 768px, hamburger menu on mobile
- **Env-driven config** — name, email, links, resume URL all live in `.env`

---

## Project Structure

```
src/
├── components/
│   ├── Navbar/          # Fixed nav with scroll-hide + active link
│   ├── Hero/            # Two-col layout + CodeTypewriter
│   │   └── CodeTypewriter.tsx   # Typewriter state machine
│   ├── Experience/      # Vertical timeline
│   ├── Projects/        # Card grid with hover lift
│   ├── About/           # Split layout + value cards
│   ├── Skills/          # Tag cloud grouped by category
│   ├── Contact/         # Email + social links
│   └── Footer/
├── data/
│   ├── skills.ts        # Skill categories + tags
│   ├── projects.ts      # Project cards
│   └── experience.ts    # Timeline entries
├── hooks/
│   ├── useScrollDirection.ts      # Navbar hide/show
│   └── useIntersectionObserver.ts # Scroll-triggered animations
├── styles/
│   └── global.css       # Design tokens (CSS variables)
└── types/index.ts
```

---

## Getting Started

```bash
# Install
npm install

# Copy env and fill in your details
cp .env.example .env

# Dev server (localhost)
npm run dev

# Dev server (expose on local network)
npm run dev -- --host

# Production build
npm run build
```

---

## Environment Variables

Create a `.env` file at the root (never commit this):

```env
VITE_NAME=Mayank Gupta
VITE_ROLE=Software Development Engineer
VITE_EMAIL=rajmayank93@gmail.com
VITE_GITHUB=https://github.com/rajmayank93
VITE_LINKEDIN=https://linkedin.com/in/mayankgupta
VITE_LEETCODE=https://leetcode.com/rajmayank93
VITE_RESUME_URL=/resume.pdf
VITE_LOCATION=Bangalore, India
```

---

## Design Tokens

| Token | Value |
|---|---|
| Background | `#ffffff` |
| Surface | `#f3f2ee` |
| Text | `#181810` |
| Muted | `#58584f` |
| Accent | `#2a5c45` |
| Accent light | `#e6f0eb` |
| Display font | Fraunces (serif) |
| Body font | DM Sans (sans-serif) |
| Card radius | `8px` |
| Pill radius | `100px` |

---

## License

MIT
