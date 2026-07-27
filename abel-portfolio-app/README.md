# Abel Shaji — Portfolio

A single-page React portfolio built with Vite. No Tailwind or CSS framework required — all styling is inline plus one embedded `<style>` block for hover states and keyframes.

## Setup

1. Install [Node.js](https://nodejs.org) (v18 or later) if you don't have it.
2. Unzip this project and open a terminal in the folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the local dev server:

   ```bash
   npm run dev
   ```

   Vite will print a local URL (usually `http://localhost:5173`) — open it in your browser.

## Building for deployment

```bash
npm run build
```

This produces a `dist/` folder with static files you can upload to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Project structure

```
abel-shaji-portfolio/
├── index.html          — HTML shell Vite serves
├── package.json        — dependencies and scripts
├── vite.config.js       — Vite + React plugin config
└── src/
    ├── main.jsx         — mounts the App component
    └── App.jsx          — the entire portfolio (single component)
```

## Editing content

All the resume content (skills, experience, projects, education, certifications, contact links) lives as plain data arrays near the top of `src/App.jsx` — edit those directly rather than hunting through JSX.
