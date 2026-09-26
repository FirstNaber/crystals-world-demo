# Final report — Crystals World website proposal

Preview: https://firstnaber.github.io/crystals-world-variations/  (compare page; toolbar bottom-left switches versions)
A: /variation-a-gallery · B: /variation-b-austin · C: /variation-c-collector · Owner demo: /owner · Original: /original

## 1. Scores (1–10, my judgment after building and testing each)
| | First impression | Premium feel | Clarity of Visit CTA | Ease of buying | Mobile | Performance |
|---|---|---|---|---|---|---|
| **A · Gallery** | 9 | 9 | 7 | 6 | 8 | 9 |
| **B · Austin Destination** | 8 | 7 | 10 | 10 | 9 | 8 |
| **C · Collector** | 9 | 9 | 7 | 8 | 8 | 8 |

Measured (Lighthouse 13.5, mobile emulation, local production preview; GitHub Pages adds compression/CDN so real numbers should be similar or better):
| Page | Performance | Accessibility | Best practices | SEO* | LCP | CLS |
|---|---|---|---|---|---|---|
| A home | 97 | 100 | 100 | 66 | 2.3 s | 0.001 |
| A product | 97 | 96 | 100 | 66 | 2.4 s | 0 |
| B home | 92 | 100 | 100 | 66 | 3.3 s | 0.032 |
| B product | 96 | 97 | 100 | 66 | 2.6 s | 0 |
| C home | 92 | 100 | 100 | 66 | 3.2 s | 0.002 |
| C product | 97 | 96 | 100 | 66 | 2.4 s | 0 |

Targets (Performance 85+, Accessibility 95+) are met on every tested page.
\*SEO 66 is one failing audit, `is-crawlable`, caused by the deliberate `noindex` on this pitch demo; every other SEO audit passes.

Verified in a real browser (Chrome via DevTools protocol): **62/62 end-to-end checks pass** across A, B, C (add to cart → cart persists across pages → checkout validation → pickup order → confirmation; shipping order requires an address and adds the flat rate and tax; a purchased one-of-a-kind piece then shows as sold and cannot be added again; pre-sold piece not purchasable; keyboard: skip link, Enter opens cart, Escape closes it; tel: link, Google Maps directions link and embedded map on each home page; zero console errors; email signup validation; owner-added piece appears in the other versions). Reduced motion: no reveal element stays hidden, no parallax, no infinite animation, in all three. Layout: 90 page × width combinations (1440, 1280, 1024, 768, 390, 375) had no horizontal scrolling. Screenshots (desktop 1440, mobile 390) are in `docs/screenshots/`.
Not tested: real devices (only emulated phone widths), Safari/Firefox, screen readers beyond automated audits.

## 2. Strongest aesthetically: **A · The Gallery**
It is the most disciplined: huge photography, negative space, museum wall labels, quiet type, and an "Acquire" action that feels like a gallery rather than a store. C is a close second and more daring.

## 3. Strongest commercially: **B · The Austin Destination**
Location, phone and directions are on screen at every moment; pickup is promoted next to shipping on every product; category browsing, filters, quick-add and Google review proof follow familiar patterns, so it scored 10 on ease of buying and on the Visit CTA. Its Lighthouse home LCP is slower (3.3 s) because the hero is a large photo; still passing.

## 4. Recommendation
Use **B as the base**, because a working shop and "come see us" are the business goals, and add the best parts of A and C to lift its premium feel (below). If the owner wants a pure brand statement over conversion, choose A.

## 5. What to merge into the winner (B)
- From **A:** the cinematic dark opening, museum-style wall labels on product pages (catalogue number, material, provenance), and the full-page pull-quote treatment for the three Google reviews.
- From **C:** the interactive collection index (hover/tap → specimen, number, price → collect) as a "Browse the collection" module, and the sideways "new plates" strip for new arrivals.
- Keep B's always-visible location strip, pickup-first messaging and filters.

## 6. Placeholders, assumptions, reused code
**Placeholders (all visible on the site as `[PLACEHOLDER: …]` unless noted):** full weekly hours (only "open until 10 PM" is known); parking; accessibility; contact email; owner story (not used on the site yet); origin/size/weight for pieces without them; all policy text (shipping rates, handling time, insurance, returns, privacy, terms; each page says "owner must confirm"); production domain; analytics IDs; shipping rate ($15 flat is a demo number, labelled "placeholder rate"); AND all prices and stock (shown with a "sample" tag).
**Assumptions:** catalog = 18 sample pieces built from the shop's own TikTok/Yelp/Instagram photos; a piece's name/material comes from the shop's TikTok captions or the photo itself (e.g. "Iron Tiger Eye Freeform", "Pistachio Calcite Heart" are the shop's own captions); "one of a kind" is assumed for most larger pieces; two pieces list "Brazil" only because the shop's TikTok captions say so; the citrine cluster is seeded as sold to demonstrate the sold state; Texas tax estimate 8.25%; TikTok/Google numbers as of Sept 2026; the videos referenced are the shop's public TikToks (embedded on click, never copied); nothing about history, awards or sourcing beyond those captions was invented.
**Reused code/patterns (from the other repos):** `-store`/`-refined`: cart rules (localStorage, one-of-a-kind capped at 1, sold state), ship-vs-pickup checkout structure, filter/sort/search UX (rebuilt as B's Shop), policy page structure, visit page pieces (map embed, signup); `-neon`: TikTok "facade" pattern, wholesale/shipping facts; base demo: photo set, Google-review quotes, address/phone plate. Most of it was rewritten to share one content/store layer rather than copied verbatim.
**Photo caveat:** several source photos are small (141–503 px); they are enlarged and lightly sharpened, so they look softer than professional photography. The three Yelp product photos (1000 px) are the sharpest.

## 7. What the owner must supply
Real prices and inventory (or a spreadsheet export from the register) · original full-size product photos (and a few of the interior/exterior) · confirmed weekly hours · policies (shipping rates, returns, privacy, terms) · contact email · parking/accessibility info · the payment/POS decision (recommended: Shopify + Shopify POS, see `docs/GOING-LIVE.md`) · Texas sales tax permit and tax setup · a domain · owner story if wanted · approval to use each photo/video publicly.

## 8. Preview URLs and screenshots
- Compare: https://firstnaber.github.io/crystals-world-variations/
- A: https://firstnaber.github.io/crystals-world-variations/variation-a-gallery/
- B: https://firstnaber.github.io/crystals-world-variations/variation-b-austin/
- C: https://firstnaber.github.io/crystals-world-variations/variation-c-collector/
- Owner catalog: https://firstnaber.github.io/crystals-world-variations/owner/
- Original: https://firstnaber.github.io/crystals-world-variations/original/
- Screenshots: `docs/screenshots/` (`a|b|c`-`home|home-2|shop|product|checkout|visit`-`desktop|mobile`.jpg)
- Netlify/Vercel: CLIs are not installed here, so the preview is on GitHub Pages; exact Netlify/Vercel commands are in `README.md`.
