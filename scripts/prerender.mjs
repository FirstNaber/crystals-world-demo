// Post-build: write a static HTML file for every known route (so GitHub Pages returns 200 and
// crawlers/link previews see the right title, description, Open Graph tags and JSON-LD without JS).
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const BASE = process.env.BASE_PATH ?? '/crystals-world-variations/'
const SITE = 'https://firstnaber.github.io' // [PLACEHOLDER: production domain]
const biz = JSON.parse(readFileSync('src/content/business.json', 'utf8'))
const { products } = JSON.parse(readFileSync('src/content/products.json', 'utf8'))
const images = JSON.parse(readFileSync('src/content/images.json', 'utf8'))
const policies = ['shipping', 'returns', 'privacy', 'terms']
const tpl = readFileSync(join(DIST, 'index.html'), 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const imgUrl = (name) => { const m = images[name]; return m ? `${SITE}${BASE}img/${name}-${m.widths.at(-1)}.jpg` : `${SITE}${BASE}og.jpg` }

const store = {
  '@context': 'https://schema.org', '@type': 'Store', name: biz.name, telephone: biz.phoneE164, url: SITE + BASE, image: `${SITE}${BASE}og.jpg`,
  address: { '@type': 'PostalAddress', streetAddress: biz.address.street, addressLocality: biz.address.city, addressRegion: biz.address.region, postalCode: biz.address.postal, addressCountry: 'US' },
  hasMap: biz.google.profileUrl, sameAs: [biz.social.instagram, biz.social.tiktok, biz.social.facebook, biz.social.yelp],
}
const VAR = [
  { base: 'variation-a-gallery', shop: 'collection', name: 'The Gallery', lcp: 'amethyst-tower', sizes: '(min-width:768px) 56vw, 100vw' },
  { base: 'variation-b-austin', shop: 'shop', name: 'The Austin Destination', lcp: 'storefront-night', sizes: '(min-width:768px) 50vw, 100vw' },
  { base: 'variation-c-collector', shop: 'collection', name: 'The Collector', lcp: 'amethyst-slab', sizes: '100vw' },
]
const preload = (name, sizes) => { const m = images[name]; const set = m.widths.map((w) => `${BASE}img/${name}-${w}.avif ${w}w`).join(', '); return `<link rel="preload" as="image" type="image/avif" imagesrcset="${set}" imagesizes="${sizes}" fetchpriority="high" />` }
const routes = [
  { path: '', title: 'Crystals World — website proposal', desc: 'Compare three directions for the Crystals World website.' },
  { path: 'original', title: 'Crystals World — Rock & Crystal Shop in Austin, TX', desc: 'Crystals, minerals and jewelry at 3202 Guadalupe St, Austin.' },
  { path: 'owner', title: 'Owner catalog — Crystals World', desc: 'Add, price and mark pieces sold.' },
]
for (const v of VAR) {
  routes.push({ path: v.base, preload: preload(v.lcp, v.sizes), title: `Crystals World — Crystal & Mineral Shop in Austin, TX`, desc: `Crystals, minerals and jewelry at ${biz.address.street}, Austin. Shop one-of-a-kind pieces online with free in-store pickup.`, ld: [store] })
  routes.push({ path: `${v.base}/${v.shop}`, title: `Shop crystals, minerals & jewelry — Crystals World, Austin`, desc: 'One-of-a-kind crystals, mineral specimens and jewelry from our Austin shop. Ship or pick up free on Guadalupe St.', ld: [store] })
  routes.push({ path: `${v.base}/visit`, title: `Visit Crystals World — 3202 Guadalupe St, Austin TX`, desc: `Directions, phone and hours for Crystals World, ${biz.address.street}, Austin, TX ${biz.address.postal}.`, ld: [store] })
  routes.push({ path: `${v.base}/checkout`, title: 'Checkout — Crystals World', desc: 'Checkout' })
  for (const s of policies) routes.push({ path: `${v.base}/policies/${s}`, title: `${s[0].toUpperCase() + s.slice(1)} — Crystals World`, desc: `Crystals World ${s} policy.` })
  for (const p of products) routes.push({
    path: `${v.base}/${v.shop}/${p.slug}`, title: `${p.name} — Crystals World, Austin TX`, desc: p.description, image: imgUrl(p.images[0]),
    ld: [store, { '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.no, description: p.description, image: [imgUrl(p.images[0])], category: p.category,
      brand: { '@type': 'Brand', name: biz.name }, offers: p.price == null ? undefined : { '@type': 'Offer', price: p.price, priceCurrency: 'USD', availability: p.sold || p.stock < 1 ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock' } }],
  })
}
let n = 0
for (const r of routes) {
  const url = `${SITE}${BASE}${r.path}`
  const head = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    ...(r.image ? [`<meta property="og:image" content="${esc(r.image)}" />`] : []),
    ...(r.preload ? [r.preload] : []),
    ...(r.ld ?? []).map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ')
  let html = tpl
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(r.desc)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(r.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(r.desc)}`)
    .replace('<!--prerender-head-->', head)
  if (r.image) html = html.replace(/<meta property="og:image" content="[^"]*og\.jpg" \/>\n?\s*/, '')
  const dir = join(DIST, r.path); mkdirSync(dir, { recursive: true }); writeFileSync(join(dir, 'index.html'), html); n++
}
copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html')) // SPA fallback for dynamic routes (order confirmations)
writeFileSync(join(DIST, '.nojekyll'), '')
console.log(`prerendered ${n} routes`)
