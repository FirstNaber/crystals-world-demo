import { Link } from 'react-router-dom'
import { BUSINESS, CATEGORIES } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { useSeo } from '../../shared/seo'
import { useTo } from '../../shared/variation'
import { CallLink, DirectionsLink, Hours, MapEmbed, Ph, Signup, Stars } from '../../shared/ui/bits'
import { ProductCard } from './parts'

const Step = ({ n, label }: { n: string; label: string }) => <p className="vb-step">{n} — {label}</p>

export function Home() {
  const to = useTo(); const { products, isSold } = useStore()
  const featured = products.filter((p) => p.featured && !isSold(p)).slice(0, 8)
  useSeo({ title: 'Crystals World — Crystal & Mineral Shop in Austin, TX', description: `Austin's place for the unexpected. Crystals, minerals and jewelry at ${BUSINESS.address.street}. Shop online, pick up free, or drop in.` })
  return (
    <>
      {/* 01 DISCOVER */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 pb-16 pt-10 sm:px-8 md:grid-cols-12 md:pt-16" aria-labelledby="hero-h">
        <div className="md:col-span-6">
          <Step n="01" label="Discover" />
          <h1 id="hero-h" className="vx-display mt-4 text-[clamp(2.8rem,6.6vw,5.6rem)] leading-[.98]">Austin’s place for the <em className="font-normal text-[var(--accent)]">unexpected.</em></h1>
          <p className="mt-6 max-w-lg text-lg text-[var(--muted)]">Crystals, minerals and jewelry on Guadalupe Street. Walk in and wander, or shop the same shelves online and pick up for free.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={to('visit')} className="vx-btn">Visit the shop</Link>
            <Link to={to('shop')} className="vx-btn-ghost">Shop online</Link>
          </div>
          <a href={BUSINESS.google.profileUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold">
            <Stars /> <span>{BUSINESS.google.rating.toFixed(1)} on Google · {BUSINESS.google.reviewCount} reviews</span>
          </a>
        </div>
        <div className="md:col-span-6">
          <div className="vb-hero-img overflow-hidden rounded-[28px]"><Img name="storefront-night" alt="The Crystals World storefront on Guadalupe Street at night, its purple neon sign glowing" priority sizes="(min-width:768px) 50vw, 100vw" className="aspect-[4/5] w-full object-cover md:aspect-[5/6]" /></div>
        </div>
      </section>

      {/* location card, always prominent */}
      <section aria-label="Find the shop" className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="vb-card grid gap-6 p-6 sm:grid-cols-3 sm:p-8" data-rv="up">
          <div><p className="vx-label">Find us</p><address className="mt-2 not-italic text-lg font-semibold">{BUSINESS.address.street}<br />Austin, TX {BUSINESS.address.postal}</address></div>
          <div><p className="vx-label">Hours</p><Hours className="mt-2 text-sm" /></div>
          <div className="flex flex-col justify-center gap-2"><DirectionsLink where="b_home_card" className="vx-btn">Get directions</DirectionsLink><CallLink where="b_home_card" className="vx-btn-ghost">Call {BUSINESS.phone}</CallLink></div>
        </div>
      </section>

      {/* 02 EXPLORE */}
      <section className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-8" aria-labelledby="explore-h">
        <Step n="02" label="Explore" />
        <h2 id="explore-h" className="vx-display mt-3 text-4xl sm:text-5xl">Three ways in.</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.id} data-rv="up">
              <Link to={to(`shop?cat=${c.id}`)} className="vb-card group block">
                <div className="aspect-[4/3] overflow-hidden"><Img name={c.image} alt="" sizes="(min-width:768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" /></div>
                <div className="flex items-center justify-between p-5"><div><p className="vx-display text-2xl">{c.label}</p><p className="vx-muted text-sm">{c.blurb}</p></div><span aria-hidden className="text-2xl">→</span></div>
              </Link>
            </li>))}
        </ul>
      </section>

      {/* 03 FIND YOUR PIECE */}
      <section className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-8" aria-labelledby="find-h">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><Step n="03" label="Find your piece" /><h2 id="find-h" className="vx-display mt-3 text-4xl sm:text-5xl">Featured this week.</h2></div>
          <Link to={to('shop')} className="vx-link font-semibold">See everything →</Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">{featured.map((p) => <div key={p.slug} data-rv="up"><ProductCard p={p} /></div>)}</div>
        <div className="vb-card mt-8 grid items-center gap-4 bg-[#e7ddc6] p-6 sm:grid-cols-[1fr_auto]">
          <div><p className="vx-display text-2xl">Pick up in store, free.</p><p className="text-sm text-[var(--muted)]">Choose “Pick up in store” at checkout. We’ll set your piece aside on Guadalupe St. Or have it double-boxed and shipped.</p></div>
          <Link to={to('shop')} className="vx-btn">Start shopping</Link>
        </div>
      </section>

      {/* social proof */}
      <section className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-8" aria-labelledby="proof-h">
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="vx-label">Google reviews</p>
            <p id="proof-h" className="vx-display mt-2 text-7xl">{BUSINESS.google.rating.toFixed(1)}</p>
            <Stars /><p className="mt-2 text-sm text-[var(--muted)]">{BUSINESS.google.reviewCount} reviews</p>
            <a href={BUSINESS.google.profileUrl} target="_blank" rel="noopener noreferrer" className="vx-link mt-4 inline-block text-sm font-semibold">Read them on Google ↗</a>
          </div>
          <ul className="grid gap-5 md:col-span-8 md:grid-cols-3">
            {BUSINESS.reviews.map((r) => <li key={r.text} className="vb-card p-6" data-rv="up"><blockquote><p className="vx-display text-xl leading-snug">“{r.text}”</p><footer className="vx-muted mt-4 text-xs">{r.source}</footer></blockquote></li>)}
          </ul>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="What visitors mention">{BUSINESS.reviewThemes.map((t) => <li key={t} className="vb-chip">{t}</li>)}</ul>
      </section>

      {/* inside the shop */}
      <section className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-8" aria-labelledby="inside-h">
        <h2 id="inside-h" className="vx-display text-4xl sm:text-5xl">Inside the shop.</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[['interior-window', 'Amethyst geodes and carvings in the shop window'], ['interior-shelves', 'White shelves of crystals and minerals'], ['mineral-case', 'A glass case of mineral specimens'], ['interior-jewelry', 'A jewelry case beside the window']].map(([n, a], i) => (
            <div key={n} className={`overflow-hidden rounded-2xl ${i % 2 ? 'md:mt-10' : ''}`} data-rv="up"><Img name={n} alt={a} sizes="(min-width:768px) 25vw, 50vw" className="aspect-[3/4] w-full object-cover" /></div>))}
        </div>
      </section>

      {/* 04 VISIT */}
      <section className="mx-auto max-w-[1280px] px-4 pt-24 sm:px-8" aria-labelledby="visit-h">
        <Step n="04" label="Visit" />
        <div className="mt-3 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="visit-h" className="vx-display text-4xl sm:text-5xl">Come see it in person.</h2>
            <address className="mt-6 not-italic text-lg font-semibold">{BUSINESS.address.street}<br />Austin, TX {BUSINESS.address.postal}</address>
            <p className="mt-2 text-sm"><Ph>parking</Ph></p>
            <div className="mt-6 flex flex-wrap gap-3"><DirectionsLink where="b_home_visit" className="vx-btn">Get directions</DirectionsLink><CallLink where="b_home_visit" className="vx-btn-ghost">Call the shop</CallLink></div>
            <Signup className="vb-card mt-8 p-6" />
          </div>
          <div className="overflow-hidden rounded-[24px] md:col-span-7"><MapEmbed className="aspect-[4/3] md:h-full md:min-h-[420px]" /></div>
        </div>
      </section>
    </>
  )
}
