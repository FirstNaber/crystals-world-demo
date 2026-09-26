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

// Stripe Payment Links (public URLs, safe to ship). Empty = button hidden.
const PAY = {
  build: 'https://buy.stripe.com/00w00j7NDgQceVDahW2VG00', // $1,000 founding client: website + online store
}
const PayButton = ({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) =>
  href ? <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center rounded-full px-6 text-sm font-semibold ${dark ? 'bg-white text-black' : 'bg-[#2f47ff] text-white'}`}>{children}</a> : null

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
        <p className="mt-4 max-w-2xl text-lg text-black/70">You already have the customers and the reputation: a 5.0 rating from 203 Google reviews. This gives every piece a home online, with a price, a checkout and free pickup on Guadalupe. Open everything on your phone too.</p>

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

        <Step n="02" title="Your plan" note="You’re my founding client, so you get the full website and store at a founding rate." />
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <section className={`${card} relative ring-2 ring-black`} aria-labelledby="base-h">
            <span className="absolute -top-3 left-6 rounded-full bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Founding client</span>
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Your website</p>
            <h3 id="base-h" className="mt-1 text-2xl font-semibold">Website + online store</h3>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
              <span className="text-2xl text-black/40 line-through decoration-2" aria-label="Normally $2,995">$2,995</span>
              <span className="text-5xl font-semibold tracking-tight">$1,000</span> <span className="text-black/60">one-time</span>
            </p>
            <p className="mt-1"><span className="text-2xl font-semibold">$99</span> <span className="text-black/60">/ month care, starting on launch day</span></p>
            <p className="mt-6 text-sm font-semibold">What’s included</p>
            <ul className="mt-2 space-y-2 text-[15px]">
              <Tick>The design direction you pick, built on your real photos</Tick>
              <Tick>Online store with checkout, shipping and free in-store pickup</Tick>
              <Tick>Add a piece from your phone: snap a photo, set a price, mark it sold</Tick>
              <Tick>Your first 25 pieces loaded for you</Tick>
              <Tick>Reviews, map, hours, directions and Google basics</Tick>
              <Tick>Two rounds of changes and one training session</Tick>
            </ul>
            <p className="mt-6 text-sm font-semibold">The founding rate comes with three asks</p>
            <ul className="mt-2 space-y-2 text-[15px]">
              <Tick>Keep the $99 care plan for the first 12 months after launch</Tick>
              <Tick>A short testimonial, and permission to show your site as my work</Tick>
              <Tick>If you know another shop owner who needs a website, point them my way</Tick>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <PayButton href={PAY.build}>Approve &amp; pay $1,000</PayButton>
              <Link to="/owner" className="inline-flex min-h-12 items-center rounded-full border border-black/20 px-5 text-sm font-semibold">Try the owner tools →</Link>
            </div>
          </section>

          <section className={card} aria-labelledby="later-h">
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/55">Add later, when you’re ready</p>
            <h3 id="later-h" className="mt-1 text-2xl font-semibold">Upgrades</h3>
            <p className="mt-2 text-[15px] text-black/70">Not part of the launch. Once the site is live and selling, we can add any of these. Each is quoted separately.</p>
            <ul className="mt-6 divide-y divide-black/10 text-[15px]">
              <li className="py-4"><b>Connect your channels.</b> eBay, Facebook and Instagram, TikTok and your counter on one inventory, so a piece sold anywhere shows as sold everywhere. <span className="text-black/55">Quoted after a short call.</span></li>
              <li className="py-4"><b>Sell straight from TikTok.</b> Paste a video link and the listing fills itself in; <Link className="underline" to="/variation-b-austin/wall">the Wall</Link> shows every piece you’ve filmed. <span className="text-black/55">Quoted after a short call.</span></li>
              <li className="py-4"><b>Scroll-film opening.</b> A cinematic film that plays as visitors scroll. <span className="text-black/55">From $1,200, plus film production at cost.</span>
                <span className="mt-3 grid grid-cols-2 gap-3">
                  {FILMS.map((f) => (
                    <a key={f.href} href={f.href} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl ring-1 ring-black/5">
                      <span className="block aspect-[16/10] overflow-hidden bg-black/5"><Img name={f.img} alt="" sizes="(min-width:1024px) 20vw, 50vw" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /></span>
                      <span className="block p-2 text-xs font-medium">{f.title} ↗</span>
                    </a>))}
                </span>
              </li>
            </ul>
          </section>
        </div>

        <Step n="03" title="The fine print" />
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ['Payment', '$1,000 to start, paid in full. The $99 care plan begins on launch day.'],
            ['Timeline', 'About three weeks from your content session to launch, with two review rounds on your phone.'],
            ['Revisions', 'Two rounds included. Anything beyond that is $75 an hour, always agreed before starting.'],
            ['Monthly plan', '12 months minimum after launch, then month to month with 30 days’ notice.'],
            ['You own everything', 'The store, the payment account and the domain are in your name. Your sales go straight to your bank.'],
            ['Paid directly by you', 'The store platform (for example Shopify, about $40 a month), card fees (about 3% per sale) and your domain (about $20 a year).'],
          ].map(([t, d]) => <div key={t} className="rounded-2xl bg-white p-5 ring-1 ring-black/5"><dt className="font-semibold">{t}</dt><dd className="mt-1 text-[15px] text-black/70">{d}</dd></div>)}
        </dl>
        <p className="mt-4 text-sm text-black/55">Full terms and refund policy: <a className="underline" href="https://naberstudio.com/terms" target="_blank" rel="noopener noreferrer">naberstudio.com/terms</a>.</p>

        <Step n="04" title="What we need from you" />
        <ul className={`${card} mt-8 grid gap-3 text-[15px] sm:grid-cols-2`}>
          <Tick>Your opening hours</Tick>
          <Tick>Photos and prices for your first 25 pieces</Tick>
          <Tick>A store account in your name (we’ll set it up together)</Tick>
          <Tick>What you use to take payments at the counter</Tick>
        </ul>

        <div className="mt-20 rounded-2xl bg-[#151412] p-8 text-white sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Next step: pick a direction and get started.</h2>
          <p className="mt-4 max-w-2xl text-white/70">Pay the founding rate below, and I’ll text you within one business day to book your content session.</p>
          <div className="mt-8 flex flex-wrap gap-3"><PayButton href={PAY.build} dark>Approve &amp; pay $1,000</PayButton></div>
          <p className="mt-6 text-sm text-white/50">Secure payment by Stripe. You’ll get a receipt by email right away.</p>
        </div>

        <p className="mt-8 text-xs text-black/50">Design previews use sample prices. Photos are the shop’s own (Instagram, TikTok, Yelp). Payments on this page are real and processed by Stripe.</p>
      </div>
    </main>
  )
}
