# Phase 1 — Audit (Crystals World)

Source of truth = the four repos below plus the facts the owner's brief supplied (Google listing, Linktree, review quotes).
Nothing else is treated as fact. Missing things are `[PLACEHOLDER: …]` and are collected at the end of this file.

## 1. The four repos

| Repo | What it is | Live |
|---|---|---|
| `crystals-world-demo` (**base**, the "winner") | One-page luxury site: ivory / charcoal / brass, Cormorant + Manrope, motion + Lenis, real photos | firstnaber.github.io/crystals-world-demo |
| `crystals-world-store` | Full "playful" store: catalog, filters, cart, mock checkout, quiz, events, visit, gift cards, policies | …/crystals-world-store |
| `crystals-world-refined` | Calm version of the same store (ivory/charcoal/brass) | …/crystals-world-refined |
| `crystals-world-neon` | Dark "night shop" store + TikTok feed + wholesale page | …/crystals-world-neon |

## 2. Base site (original) — pages & navigation
Single page, anchor navigation: **Explore · About · Visit · Reviews + "Visit Us" button** (mobile: full-screen menu).
Sections in order: Hero ("Discover something *extraordinary.*") → 01 The Collection (Crystals / Minerals / Jewelry / Collector Pieces) → 02 Reputation (5.0 · 203 reviews · four themes) → 03 Visit (address plate, Get Directions, Call) → 04 The Experience (photo collage + one quote) → 05 Featured ("Pieces worth seeing in person", 6 photos, no prices) → 06 Reviews (5.0, two quotes, link to Google) → Final CTA → Footer (address, phone, photo note).
No shop, no cart, no policy pages, no signup, no analytics, no OG image, no structured data beyond a plain `<title>`/description; marked `noindex`.

## 3. Business facts we may use (with where they come from)
| Fact | Value | Source |
|---|---|---|
| Name / type | CRYSTALS WORLD, "Rock & Crystal Shop" | Google listing (owner brief) |
| Address | 3202 Guadalupe St Ste C, Austin, TX 78705 | Google listing, Linktree/TikTok captions |
| Phone | (737) 320-8079 | Google listing |
| Rating | 5.0 stars, 203 Google reviews | Google listing |
| Services | In-store pickup | Google listing |
| Hours | **Only "open until 10 PM" (a single moment in time)** — full schedule unknown | Google listing |
| Review quotes (3, verbatim) | "This store has the most beautiful pieces, the vibe and the staff is unmatched!" · "Such a nice place with nice owner, gave me nice discount for my first visit!" · "Great service and super clean organized environment." | Google listing screenshot |
| Socials | Instagram @crystals_world01, TikTok @crystals_world01, Facebook, Linktree, Google Maps, Yelp | Linktree |
| Bio | "wholesale supplier of Crystals & Minerals living in Austin, Tx" | Linktree |
| Retail + wholesale, shipping via USPS/UPS/DHL, US & worldwide, "DM for details" | shop's own TikTok captions (`crystals-world-neon/src/data/feed.ts`) | TikTok |
| Follower stats | 40.7K followers / 476K likes / 447 videos (Sept 2026, manual) | TikTok public profile |
| Two citrine pieces "from Brazil"; white-onyx (blue shade) vase | TikTok captions | TikTok |
| Owner story, history, awards, sourcing story, prices, full inventory, policies | **not supplied** | → placeholders |

## 4. Assets (every image)
Real shop photos only. Source files are small (141–480 px wide); the base repo ships 15 enlarged+sharpened versions.
`storefront-night` (purple neon sign) · `shop-shelves` · `shop-counter` · `shop-case-clusters` · `shop-interior` · `citrine-heart`/`hero-citrine-heart` · `citrine-cluster` · `citrine-lineup` · `amethyst-heart` · `amethyst-heart-instore` · `amethyst-cluster` · `amethyst-diamond` · `lapis-heart` · `lapis-freeform` · `lapis-necklace` · `banded-vase` · `display-case` · `shop-window-shelf`.
Not in base but in the other repos: `amethyst-heart-instore`, `citrine-heart` (raw), `display-case`, `shop-window-shelf`.
No logo file exists — the wordmark is type (`CRYSTALS World`). No OG image exists (to be generated from the storefront photo).
Fonts so far: Cormorant Garamond, Manrope, (neon: Oswald), (store: Bricolage Grotesque, DM Sans/Mono) — all Google Fonts.

### 4b. Additional real sources found during the audit
- **Yelp business photos** (yelp.com/biz/crystals-world-austin): 3 product shots at 1000 px — an amethyst crescent cluster, an amethyst cluster “tower” on an acrylic stand, an amethyst cluster slab on a white stand. Sharpest images available.
- **TikTok @crystals_world01 video covers** (503×720, the shop’s own posts, 51 fetched): higher-resolution versions of the hearts/freeforms already known, plus new pieces the shop itself lists as “Available for sale”: pistachio calcite heart, iron tiger-eye freeform, blue aragonite moon, fluorite specimens, epidote quartz, lapis triple-strand necklace, Herkimer diamond pendant, jade pendant, garnet earrings, etc. Also interior shots (window with geodes, jewelry cases, mineral case, citrine lineup) and the storefront at night.
- TikTok captions are the shop’s own words: “Retail & wholesale supplier of Crystals, Minerals, gemstone and Jewelry”, “Shipment: USPS, UPS and DHL”, “Delivery: 🇺🇸 & 🌍”, “For more details please DM”, “Citrine … from Brazil”.
- Nothing here gives prices, hours, dimensions or stock counts.

## 5. Code worth reusing (report at end will list what was actually reused)
- **`-store`/`-refined`/`-neon` commerce**: `state/cart.tsx` (localStorage cart, caps one-of-a-kind at 1, gift cards), `pages/Checkout.tsx` (mock ship vs pickup, gift wrap/note), `pages/Shop.tsx` (search, type/color/size/price/intention filters, sort, "show sold"), `pages/Product.tsx`, `data/products.ts` (9 real-photo products, science vs. tradition split, sold state), `components/bits.tsx` (open badge, product card, field card), `pages/Events.tsx`, `pages/GiftCards.tsx`, `pages/Policies.tsx`, `pages/Visit.tsx` (map embed, contact form), `components/Seo.tsx`.
- **`-neon`**: `data/feed.ts` + `components/Video.tsx` (TikTok referenced, loaded on click), `pages/Wholesale.tsx`.
- **base**: `components/ui.tsx` (Reveal, Lines, Photo mask-reveal, Button, Stars), Lenis smooth scroll + curtain intro, motion patterns.

## 6. Gaps to build in Phase 2
Router with three variation shells + switcher · unified data source · editable `products.json` · 12–18 sample products · full mock checkout (contact → delivery → payment mock → confirmation) · Shipping/Returns/Privacy/Terms pages · email signup (front-end) · analytics hooks · LocalBusiness + Product JSON-LD, meta, OG image · Lighthouse-minded image handling.

## 7. Open placeholders (running list; final list is in the report)
`[PLACEHOLDER: full hours]` · `[PLACEHOLDER: prices]` · `[PLACEHOLDER: real inventory/stock]` · `[PLACEHOLDER: owner story]` · `[PLACEHOLDER: contact email]` · `[PLACEHOLDER: shipping rates]` · `[PLACEHOLDER: policy text — owner to confirm]` · `[PLACEHOLDER: parking/accessibility]` · `[PLACEHOLDER: product dimensions/weights/origins]`.
