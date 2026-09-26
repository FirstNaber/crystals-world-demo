# HANDOFF — Crystals World variations (pitch demo)

Stopped cleanly at the end of **Phase 3** at the owner's request. Resume at **Phase 4**.

## Branches (repo FirstNaber/crystals-world-demo) — `main` is untouched
| Branch | Contents |
|---|---|
| `phase-1-audit` | `AUDIT.md`: pages, facts, assets, reusable code across all 4 repos (+ Yelp/TikTok sources) |
| `phase-2-foundation` | Shared foundation (branched from phase 1) |
| `phase-3-gallery` | Variation A — The Gallery (branched from phase 2) **← latest** |

Continue with `git checkout phase-3-gallery && git checkout -b phase-4-austin`.

## How it's built
- Vite + React 19 + TS + Tailwind v4, React Router (BrowserRouter, basename = `BASE_PATH`, default `/crystals-world-variations/`).
- Routes: `/` compare page · `/original` (the old one-page demo, unchanged, code in `src/original/`) · `/variation-a-gallery/*` · `/variation-b-austin/*` · `/variation-c-collector/*` · `/owner` (owner catalog).
- **Shared (identical plumbing for all three):** `src/shared/`
  - `content.ts` ← `src/content/business.json` (verified facts; `null` = placeholder), `products.json` (18 sample products from the shop's own TikTok/Yelp photos, sample prices), `images.json` (generated)
  - `store.tsx` cart, sold state (one-of-a-kind sells once), orders, owner catalog + overrides — all localStorage
  - `Shell.tsx` route shell: a variation supplies `Layout`, `Home`, `Shop`, `Product`; shared: cart drawer, checkout (ship/pickup, mock card, est. TX tax 8.25%), confirmation, visit, policies, 404, compare toolbar
  - `seo.tsx` meta/OG/JSON-LD at runtime; `scripts/prerender.mjs` writes static HTML per route (81 routes) at build
  - `analytics.ts` dataLayer events: get_directions, call, add_to_cart, begin_checkout, sign_up, purchase_demo, owner_publish
  - `motion.tsx` `[data-rv]` reveal + `[data-parallax]` (no animation library in variations; reduced-motion safe). Mask reveals clip the *child* (Chrome's IO ignores clipped targets).
  - `Img.tsx` AVIF+JPEG responsive `<picture>`; `npm run images` rebuilds `public/img/` from `assets-src/`
- Shared CSS primitives `.vx-*` in `src/index.css`, themed by CSS variables per variation (`.v-a` in `src/variations/a-gallery/gallery.css`).

## Status
- Phase 1 ✅ · Phase 2 ✅ (smoke-tested: add → checkout → confirmation → item shows Sold; owner catalog; original; compare page)
- Phase 3 ✅ Variation A — The Gallery: cinematic opening, rooms I–III with wall labels + quiet "Acquire", review pull-quote interludes, Visit as final chapter, collection (Exhibition / Checklist views, room filter, include-sold), museum object page (figures, provenance, TikTok facade, prev/next work), index overlay. Checked at 1440 and 390.
- Phase 4 ⏭ Variation B — The Austin Destination (`src/variations/b-austin/` still uses the temporary `_stub.tsx`)
- Phase 5 ⏭ Variation C — The Collector (still stub)
- Phase 6 ⏭ Verification: full e2e per variation, reduced motion, keyboard, Lighthouse mobile, deploy, final report. Remove `src/variations/_stub.tsx` when B and C exist.

## Run / preview
```
npm install
npm run build            # tsc + vite build + prerender
npx vite preview --port 4180   # → http://localhost:4180/crystals-world-variations/
```

## Deploy plan (not yet done)
Do NOT run `deploy.sh` (it publishes to the live site's gh-pages). Preview deploy target: a new repo `FirstNaber/crystals-world-variations`, gh-pages branch, built with the default BASE_PATH. Netlify/Vercel CLIs are not installed; equivalent commands go in the final report.

## Known notes
- Hours unknown (only "closes 10 PM" on Google) → `[PLACEHOLDER: full weekly hours]` everywhere; no `openingHours` in JSON-LD.
- No aggregateRating in JSON-LD on purpose (Google disallows self-served review stars).
- The compare toolbar (bottom-left) is pitch-only and can be hidden from its menu.
