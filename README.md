# Crystals World — website proposal (three directions + shared store)

Pitch demo for Crystals World, 3202 Guadalupe St Ste C, Austin TX. Sample prices, mock checkout, no real payments.
Vite · React 19 · TypeScript · Tailwind v4 · React Router. The live original site lives on `main` and is untouched.

| Route | What |
|---|---|
| `/` | Compare page |
| `/original` | The original one-page demo (unchanged) |
| `/variation-a-gallery` | A · The Gallery |
| `/variation-b-austin` | B · The Austin Destination |
| `/variation-c-collector` | C · The Collector |
| `/owner` | Owner catalog demo |

## Run
```
npm install
npm run build          # tsc + vite build + prerender (81 routes)
npx vite preview --port 4180
```
Open http://localhost:4180/crystals-world-variations/  · dev: `npm run dev`.

## Where things are
- `src/content/` business facts, products, policies (owner-editable) · `assets-src/` source photos → `npm run images` → `public/img` (AVIF+JPEG)
- `src/shared/` store/cart/checkout/SEO/analytics/UI shared by all three · `src/variations/*` the three designs
- `AUDIT.md` sources & facts · `HANDOFF.md` build notes · `REPORT.md` final report · `docs/GOING-LIVE.md` platform, POS sync, tax
- `docs/screenshots/` desktop 1440 + mobile 390 for every variation

## Deploy a preview
GitHub Pages (used): `BASE_PATH=/crystals-world-variations/ npm run build`, then publish `dist/` to a `gh-pages` branch.
Netlify: `BASE_PATH=/ npm run build && npx netlify deploy --dir=dist --prod` (needs `netlify login`).
Vercel: `BASE_PATH=/ npm run build && npx vercel deploy dist --prod` (needs `vercel login`). The `404.html` fallback covers order-confirmation URLs on Pages; on Netlify/Vercel add a rewrite `/* → /index.html 200`.
