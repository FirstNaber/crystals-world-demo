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
- Photos: `public/images/`. All current photos are placeholders from Wikimedia Commons
  (credits in `src/credits.json` and in the site footer). Replace them with the store's own photography
  using the same file names, or change the names in the components.

## Deploy
Pushing to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`.
