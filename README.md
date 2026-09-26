# Crystals World — website concept demo

A concept homepage for Crystals World, a rock & crystal shop at 3202 Guadalupe St Ste C, Austin, TX.
Built as a demo for the owner; not the official site (it is marked `noindex`).

**Stack:** Vite · React · TypeScript · Tailwind CSS v4 · Motion · Lenis

## Run locally
```
npm install
npm run dev
```

## Edit
- Business facts and review quotes: `src/site.ts` (verified info only)
- Sections: `src/components/`
- Photos: `public/images/`. These are the shop's own photos (some small files were enlarged and sharpened for display).
  Replace them with larger originals using the same file names.

## Deploy
Run `./deploy.sh` to build and publish `dist/` to the `gh-pages` branch, which GitHub Pages serves.
