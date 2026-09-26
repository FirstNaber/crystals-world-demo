/** Proposal page: pick a direction, then the plan (quoted base + upgrades), terms and next step. */
import { Link } from 'react-router-dom'
import { useEffect, type ReactNode } from 'react'
import { Img } from '../shared/Img'

const DIRECTIONS = [
  { path: '/variation-a-gallery', tag: 'A', title: 'The Gallery', text: 'An exhibition. Specimens as art objects, each one an “acquisition”.', img: 'amethyst-tower' },
  { path: '/variation-b-austin', tag: 'B', title: 'The Austin Destination', text: 'A warm Guadalupe St boutique with a proper shop and pickup up front.', img: 'interior-window' },
  { path: '/variation-c-collector', tag: 'C', title: 'The Collector', text: 'Black, ivory and stone. The collection is the shop.', img: 'tiger-iron-freeform' },
]

const FILMS = [
  { href: 'https://firstnaber.github.io/crystals-world-film/', title: 'Light, held', img: 'film-light' },
  { href: 'https://firstnaber.github.io/crystals-world-film-2/', title: 'The Specimen Room', img: 'film-specimen' },
]

const card = 'rounded-2xl bg-white p-6 ring-1 ring-black/5 sm:p-8'
const Tick = ({ children }: { children: ReactNode }) => <li className="flex gap-3"><span aria-hidden className="mt-[3px] text-black/40">✓</span><span>{children}</span></li>
const Step = ({ n, title, note }: { n: string; title: string; note?: string }) => (
  <div className="mt-20 flex flex-wrap items-baseline gap-x-4 gap-y-1">
    <span className="text-sm font-semibold text-black/40">{n}</span>
    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    {note && <p className="w-full text-black/65 sm:pl-9">{note}</p>}
  </div>)

export default function Switcher() {
  useEffect(() => { document.title = 'Crystals World — website proposal' }, [])
  return (
    <main className="min-h-screen bg-[#f3f1ed] px-5 py-12 text-[#151412] sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] uppercase tracking-[0.24em] text-black/60">Proposal · Crystals World, 3202 Guadalupe St, Austin TX</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">A website that sells what you already post.</h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70">You film almost every piece for TikTok. This gives each piece a price, a checkout and free pickup on Guadalupe, without anyone having to DM you first. Open everything on your phone too.</p>

        <Step n="01" title="Pick a direction" note="Same store, same checkout, same owner tools. Three ways for it to feel." />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIRECTIONS.map((v) => (
            <li key={v.path}>
              <Link to={v.path} className="group block h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg">
                <div className="aspect-[16/10] overflow-hidden bg-black/5"><Img name={v.img} alt="" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>
                <div className="flex items-start gap-4 p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-sm font-semibold text-white">{v.tag}</span>
                  <div><p className="text-xl font-semibold">{v.title}</p><p className="mt-1 text-sm text-black/65">{v.text}</p><p className="mt-3 text-sm font-medium underline underline-offset-4">Open {v.title} →</p></div>
                </div>
              </Link>
            </li>))}
        </ul>
        <p className="mt-4 text-sm text-black/55">Where we started: <Link className="underline" to="/original">the original one-page demo</Link>.</p>

        <Step n="02" title="The plan" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className={card} aria-labelledby="base-h">
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Your website</p>
            <h3 id="base-h" className="mt-1 text-2xl font-semibold">Website + online store</h3>
            <p className="mt-4"><span className="text-4xl font-semibold tracking-tight">$1,000</span> <span className="text-black/60">one-time</span></p>
            <p className="mt-1"><span className="text-2xl font-semibold">$99</span> <span className="text-black/60">/ month</span></p>
            <ul className="mt-6 space-y-2 text-[15px]">
              <Tick>The direction you pick, built on your real photos</Tick>
              <Tick>Online store with checkout, shipping and free in-store pickup</Tick>
              <Tick>Owner catalog on your phone: snap a photo, set a price, mark it sold</Tick>
              <Tick>Your first 25 pieces loaded for you</Tick>
              <Tick>Reviews, map, directions and Google basics</Tick>
              <Tick>One training session</Tick>
            </ul>
            <p className="mt-6 text-sm font-semibold">Every month</p>
            <ul className="mt-2 space-y-2 text-[15px]">
              <Tick>Site kept running and secure</Tick>
              <Tick>Fixes, plus small updates (about an hour a month)</Tick>
              <Tick>Help whenever something isn’t working</Tick>
            </ul>
            <Link to="/owner" className="mt-8 inline-flex rounded-full border border-black/20 px-5 py-3 text-sm font-semibold">Try the owner catalog →</Link>
          </section>

          <section className={`${card} relative ring-2 ring-black`} aria-labelledby="tt-h">
            <span className="absolute -top-3 left-6 rounded-full bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Recommended upgrade</span>
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Sell straight from TikTok</p>
            <h3 id="tt-h" className="mt-1 text-2xl font-semibold">TikTok package</h3>
            <p className="mt-4"><span className="text-4xl font-semibold tracking-tight">+$600</span> <span className="text-black/60">one-time</span></p>
            <p className="mt-1 text-black/70">Monthly plan becomes <span className="text-2xl font-semibold text-black">$149</span> <span className="text-black/60">/ month</span></p>
            <ul className="mt-6 space-y-2 text-[15px]">
              <Tick><b>Automatic listings.</b> Post a piece with <code className="rounded bg-black/5 px-1.5 py-0.5 text-[14px]">Price: $185</code> in the caption and it’s for sale on your site within minutes</Tick>
              <Tick><b>Paste a link.</b> Paste any TikTok link and the listing fills itself in</Tick>
              <Tick><b>The Wall.</b> Every piece you’ve filmed on one wall, sorted by colour, ready to sell</Tick>
              <Tick><b>Your video on every product page,</b> playing right next to the buy button</Tick>
            </ul>
            <p className="mt-6 text-sm text-black/60">Posts without a price never go live, so deliveries and show videos stay off the store. Connecting needs one TikTok sign-in; TikTok approves the connection, which can take a few days to two weeks.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/variation-b-austin/wall" className="inline-flex rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">See the Wall →</Link>
              <Link to="/owner" className="inline-flex rounded-full border border-black/20 px-5 py-3 text-sm font-semibold">Try paste-a-link →</Link>
            </div>
          </section>
        </div>

        <section className={`${card} mt-6 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center`} aria-labelledby="film-h">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Optional</p>
            <h3 id="film-h" className="mt-1 text-2xl font-semibold">Scroll-film opening</h3>
            <p className="mt-4"><span className="text-3xl font-semibold tracking-tight">from $1,200</span> <span className="text-black/60">one-time, plus film production at cost</span></p>
            <p className="mt-4 text-[15px] text-black/70">A cinematic film opens your homepage and plays as visitors scroll, then hands over to the shop. Built to make people stop scrolling.</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {FILMS.map((f) => (
              <li key={f.href}><a href={f.href} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl ring-1 ring-black/5">
                <div className="aspect-[16/10] overflow-hidden bg-black/5"><Img name={f.img} alt="" sizes="(min-width:1024px) 25vw, 100vw" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /></div>
                <p className="p-3 text-sm font-medium">{f.title} ↗</p>
              </a></li>))}
          </ul>
        </section>

        <Step n="03" title="The fine print" />
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ['Payment', '50% to start, 50% at launch.'],
            ['Revisions', 'Two rounds included. Anything beyond that is $75 an hour.'],
            ['Monthly plan', '12 months minimum, then month to month with 30 days’ notice.'],
            ['Paid directly by you', 'The store platform (for example Shopify, about $40 a month), card fees (about 3% per sale) and your domain (about $20 a year).'],
          ].map(([t, d]) => <div key={t} className="rounded-2xl bg-white p-5 ring-1 ring-black/5"><dt className="font-semibold">{t}</dt><dd className="mt-1 text-[15px] text-black/70">{d}</dd></div>)}
        </dl>

        <Step n="04" title="What we need from you" />
        <ul className={`${card} mt-8 grid gap-3 text-[15px] sm:grid-cols-2`}>
          <Tick>Your opening hours</Tick>
          <Tick>Prices for your first 25 pieces</Tick>
          <Tick>A store account in your name (we’ll set it up together)</Tick>
          <Tick>For the TikTok package: one sign-in to connect your account</Tick>
        </ul>

        <div className="mt-20 rounded-2xl bg-[#151412] p-8 text-white sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Next step: pick a direction and a plan.</h2>
          <p className="mt-4 max-w-2xl text-white/70">That’s all it takes to start. Everything above can be added now or after launch.</p>
        </div>

        <p className="mt-8 text-xs text-black/50">Concept demo · sample prices · no real payments. Photos are the shop’s own (Instagram, TikTok, Yelp).</p>
      </div>
    </main>
  )
}
