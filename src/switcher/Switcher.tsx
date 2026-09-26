/** Compare page: the original plus the three variations, side by side. */
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Img } from '../shared/Img'

const VERSIONS = [
  { path: '/original', tag: 'Current', title: 'Original demo', text: 'The one-page site the proposal starts from. No shop.', img: 'storefront-night' },
  { path: '/variation-a-gallery', tag: 'A', title: 'The Gallery', text: 'An exhibition. Specimens as art objects, each one an “acquisition”.', img: 'amethyst-tower' },
  { path: '/variation-b-austin', tag: 'B', title: 'The Austin Destination', text: 'A warm Guadalupe St boutique with a proper shop and pickup up front.', img: 'interior-window' },
  { path: '/variation-c-collector', tag: 'C', title: 'The Collector', text: 'Black, ivory and stone. The collection is the shop.', img: 'tiger-iron-freeform' },
]

export default function Switcher() {
  useEffect(() => { document.title = 'Crystals World — website proposal: compare versions' }, [])
  return (
    <main className="min-h-screen bg-[#f3f1ed] px-5 py-12 text-[#151412] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] uppercase tracking-[0.24em] text-black/60">Proposal · Crystals World, Austin TX</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Three directions for a store that deserves more than a basic website.</h1>
        <p className="mt-4 max-w-2xl text-black/70">Same shop, same catalog, same checkout. Three different ways to feel it. Open each on your phone too.</p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {VERSIONS.map((v) => (
            <li key={v.path}>
              <Link to={v.path} className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden bg-black/5"><Img name={v.img} alt="" sizes="(min-width:640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>
                <div className="flex items-start gap-4 p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-sm font-semibold text-white">{v.tag.slice(0, 1)}</span>
                  <div><p className="text-xl font-semibold">{v.title}</p><p className="mt-1 text-sm text-black/65">{v.text}</p><p className="mt-3 text-sm font-medium underline underline-offset-4">Open {v.title} →</p></div>
                </div>
              </Link>
            </li>))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
          <div className="flex-1"><p className="font-semibold">Owner catalog</p><p className="text-sm text-black/65">Snap a photo, name it, price it, publish. It appears in all three versions instantly.</p></div>
          <Link to="/owner" className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">Try the owner catalog</Link>
        </div>
        <p className="mt-8 text-xs text-black/50">Concept demo · sample prices · no real payments. Photos are the shop’s own (Instagram, TikTok, Yelp).</p>
      </div>
    </main>
  )
}
