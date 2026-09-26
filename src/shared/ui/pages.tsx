/** Shared themed pages: Visit, Policies, 404. */
import { Link, useParams } from 'react-router-dom'
import { ADDRESS_LINE, BUSINESS } from '../content'
import { POLICIES } from '../../content/policies'
import { Img } from '../Img'
import { useSeo } from '../seo'
import { useTo, useVariation } from '../variation'
import { CallLink, DirectionsLink, Hours, MapEmbed, Ph, Signup } from './bits'

export function VisitPage() {
  useSeo({ title: `Visit ${BUSINESS.name} — Crystal shop on Guadalupe St, Austin TX`, description: `Find ${BUSINESS.name} at ${ADDRESS_LINE}. Directions, phone and hours.` })
  return (
    <section className="vx-page">
      <p className="vx-eyebrow">Visit</p>
      <h1 className="vx-display mt-3 text-5xl sm:text-7xl">3202 Guadalupe St</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <address className="not-italic text-lg">{BUSINESS.address.street}<br />{BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postal}</address>
          <div className="flex flex-wrap gap-3">
            <DirectionsLink where="visit_page" className="vx-btn">Get directions</DirectionsLink>
            <CallLink where="visit_page" className="vx-btn-ghost">Call {BUSINESS.phone}</CallLink>
          </div>
          <div><h2 className="vx-label">Hours</h2><Hours className="mt-2" /></div>
          <div><h2 className="vx-label">Parking & access</h2><p className="mt-2 text-sm"><Ph>parking</Ph> · <Ph>accessibility</Ph></p></div>
          <div><h2 className="vx-label">In-store pickup</h2><p className="mt-2 text-sm">Order online and choose “Pick up in store”. It’s free.</p></div>
          <Signup className="vx-surface p-6" />
        </div>
        <div className="space-y-4">
          <MapEmbed className="aspect-[4/3]" />
          <div className="grid grid-cols-2 gap-4">
            <Img name="storefront-night" alt="The Crystals World storefront at night, purple neon sign lit" sizes="(min-width:1024px) 25vw, 50vw" className="aspect-square h-full w-full object-cover" />
            <Img name="interior-window" alt="Amethyst geodes and carvings displayed in the shop window" sizes="(min-width:1024px) 25vw, 50vw" className="aspect-square h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function PolicyPage() {
  const { page } = useParams(); const to = useTo()
  const pol = POLICIES.find((p) => p.slug === page) ?? POLICIES[0]
  useSeo({ title: `${pol.title} — ${BUSINESS.name}`, description: pol.intro })
  return (
    <section className="vx-page max-w-3xl">
      <p className="vx-note">Placeholder policy text — the owner must confirm before launch.</p>
      <nav aria-label="Policies" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {POLICIES.map((p) => <Link key={p.slug} to={to(`policies/${p.slug}`)} aria-current={p.slug === pol.slug ? 'page' : undefined} className={`vx-link ${p.slug === pol.slug ? 'font-semibold' : ''}`}>{p.title}</Link>)}
      </nav>
      <h1 className="vx-display mt-8 text-4xl sm:text-5xl">{pol.title}</h1>
      <p className="mt-4 text-lg">{pol.intro}</p>
      {pol.sections.map((s) => (
        <div key={s.h} className="mt-8"><h2 className="vx-display text-2xl">{s.h}</h2>{s.p.map((t) => <p key={t} className="mt-2 leading-relaxed">{t}</p>)}</div>))}
    </section>
  )
}

export function NotFound() {
  const v = useVariation(); const to = useTo()
  useSeo({ title: `Not found — ${BUSINESS.name}`, description: 'Page not found' })
  return (
    <section className="vx-page grid min-h-[60vh] place-items-center text-center">
      <div><p className="vx-eyebrow">404</p><h1 className="vx-display mt-3 text-4xl sm:text-6xl">This piece may have found a home.</h1>
        <div className="mt-8 flex justify-center gap-3"><Link to={to(v.shop)} className="vx-btn">{v.words.shopName}</Link><Link to={to()} className="vx-btn-ghost">Home</Link></div></div>
    </section>
  )
}
