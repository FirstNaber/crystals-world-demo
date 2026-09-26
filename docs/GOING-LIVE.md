# Going live: platform, owner editing, and in-store sync

## Recommendation: Shopify (Basic) + Shopify POS
Why it fits a one-shop, one-of-a-kind inventory business:
- **One inventory for shop + web.** Shopify POS at the counter and the online store share the same stock. A one-of-a-kind piece sold at the register drops to 0 online immediately, so it cannot also sell online. (That is the "sync" requirement; with Shopify there is nothing to build.)
- **Owner-friendly cataloguing.** The Shopify mobile app lets the owner photograph a piece, type a name and price, set inventory to 1 and publish in about 30 seconds. This is exactly the flow of the `/owner` screen in this demo.
- **Built in:** local pickup, shipping rates (USPS/UPS/DHL), Texas sales tax, gift cards, gift notes, fraud checks, PCI-compliant checkout, receipts and refunds.
- Cost: roughly the Basic plan + card fees (confirm current pricing). Alternatives: **Square Online** if the shop already runs a Square register (free tier, native sync); Stripe/Snipcart work but leave inventory and shipping rates to build.

### How this design connects to Shopify
The demo's product model maps 1:1:

| Demo field (`products.json`) | Shopify |
|---|---|
| `name`, `description`, `images[]` | Title, description, media |
| `price` | Price (currency USD) |
| `category` | Product type → collections "Crystals / Minerals / Jewelry" |
| `stock`, `one_of_a_kind` | Inventory quantity (1 = one of a kind); "Continue selling when out of stock" OFF |
| `sold` | Automatic: inventory 0 → "Sold" (keep the product published so it stays visible to collectors) |
| `new`, `featured` | Tags `new`, `featured` |
| `material`, `origin`, `size`, `weight` | Metafields (or the product's native weight) |
| `no` (CW-###) | SKU |
| `tiktok` | Metafield (video ID) |

Two ways to use the chosen design:
1. **Headless (best fit for these designs):** keep this React front end and replace `src/shared/store.tsx` with calls to Shopify's Storefront API (products, cart, checkout URL). The variations, cart drawer and pages stay; checkout redirects to Shopify's hosted checkout. Environment variables: `VITE_SHOPIFY_DOMAIN`, `VITE_SHOPIFY_STOREFRONT_TOKEN` (never committed).
2. **Theme:** rebuild the chosen look as a Shopify theme (Liquid). Simpler hosting, less custom motion.

## Owner: adding and pricing pieces "as you go"
- **Demo:** `/owner` (camera photo → name → category → price → one-of-a-kind → Publish). Saves in the browser and appears instantly in all three variations. Also: edit any price, mark a piece sold, export `products.json`.
- **Without Shopify (cheapest path):** the same `/owner` screen can write to a small backend (Cloudflare Worker + KV/R2, or Supabase) instead of localStorage. Photos upload to storage, products are JSON. Needs a login for the owner and a payment provider for checkout.
- **Static path:** edit `src/content/products.json`, drop the photo in `assets-src/` as `p-<name>.jpg`, run `npm run images` and redeploy.

## In-store register sync (planned, not built in PITCH DEMO mode)
Goal: a piece sold in person can never also sell online.
1. **Shopify POS** (recommended): same inventory system, nothing to build.
2. **Square POS + Square Online:** same idea, native sync.
3. **Other register (or standalone):** poll or webhook the register's "item sold" event → set the matching product's inventory to 0 via the platform API. Also reserve stock at checkout start (10-minute hold) and re-verify at payment time. Refund automatically if a race still oversells; the terms already promise this.
4. Until a sync exists: staff mark items sold in the owner screen the moment they sell at the counter.

## Tax, shipping, policies
- **Texas sales tax** must be collected on taxable sales (tangible goods, and delivery charges on taxable items). The demo shows an *estimate* at 8.25% (Austin combined rate). In production the platform computes the real rate per address; the owner needs a Texas sales tax permit and to enable tax collection. Confirm with the owner's accountant.
- Policy pages (Shipping, Returns, Privacy, Terms) contain **placeholder text marked for owner confirmation**. Do not launch with it unreviewed.

## Analytics
`src/shared/analytics.ts` pushes `get_directions`, `call`, `add_to_cart`, `begin_checkout`, `sign_up`, `purchase_demo`, `owner_publish` to `window.dataLayer`. Add a GA4 (or Plausible) snippet with the real ID at launch; no IDs are configured.

## Launch checklist
Remove `noindex` from `index.html`; set the real domain in `SITE_URL` (`src/shared/seo.tsx`, `scripts/prerender.mjs`); supply hours; replace sample prices/stock with real ones; replace enlarged thumbnails with original full-size photos.
