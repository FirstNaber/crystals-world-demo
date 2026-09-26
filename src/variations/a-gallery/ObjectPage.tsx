import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BUSINESS, money } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { productLd, useSeo } from '../../shared/seo'
import { useTo } from '../../shared/variation'
import { Ph } from '../../shared/ui/bits'
import { NotFound } from '../../shared/ui/pages'
import { TikTokCard } from '../../shared/ui/TikTok'
import { ROOM } from './parts'

/** A museum object page with a quiet "Acquire". */
export function ObjectPage() {
  const { slug } = useParams(); const to = useTo()
  const { products, bySlug, isSold, add, lines } = useStore()
  const p = bySlug(slug ?? '')
  const [fig, setFig] = useState(0)
  const sold = p ? isSold(p) : false
  useSeo(p
    ? { title: `${p.name} — Crystals World, Austin TX`, description: p.description, jsonLd: productLd(p, !sold, `${location.origin}${import.meta.env.BASE_URL}img/${p.images[0]}-960.jpg`) }
    : { title: 'Not found — Crystals World', description: '' })
  if (!p) return <NotFound />
  const i = products.findIndex((x) => x.slug === p.slug)
  const prev = products[(i - 1 + products.length) % products.length], next = products[(i + 1) % products.length]
  const inBag = lines.some((l) => l.slug === p.slug)

  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 sm:px-10 md:pt-16">
      <nav aria-label="Breadcrumb" className="ga-tiny"><Link to={to('collection')} className="hover:underline">The Collection</Link> / <Link to={to(`collection?room=${p.category}`)} className="hover:underline">Room {ROOM[p.category].n}</Link> / {p.no}</nav>
      <div className="mt-8 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="md:sticky md:top-20">
            <div className="overflow-hidden bg-[var(--surface)]">
              <Img key={p.images[fig]} name={p.images[fig]} alt={`${p.name}${fig ? ' — detail' : ''}: ${p.description}`} priority sizes="(min-width:768px) 58vw, 100vw" className={`aspect-[4/5] w-full object-cover ${sold ? 'opacity-70 grayscale' : ''}`} />
            </div>
            {p.images.length > 1 && (
              <div className="mt-4 flex gap-5" role="group" aria-label="Figures">
                {p.images.map((_, k) => <button key={k} onClick={() => setFig(k)} aria-pressed={fig === k} className={`ga-tiny min-h-11 ${fig === k ? '!text-[var(--fg)] underline underline-offset-8' : ''}`}>Fig. {k + 1}{k ? ' · detail' : ''}</button>)}
              </div>)}
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="ga-label">{p.no} · Room {ROOM[p.category].n} — {ROOM[p.category].name}</p>
          <h1 className="mt-4 ga-serif text-[clamp(2.8rem,5vw,4.6rem)] leading-[.95]">{p.name}</h1>
          <dl className="ga-label mt-8 grid grid-cols-[7.5rem_1fr] gap-y-2 border-t border-[var(--line)] pt-6">
            <dt>Material</dt><dd className="text-[var(--fg)]">{p.material ?? <Ph>material</Ph>}</dd>
            <dt>Provenance</dt><dd className="text-[var(--fg)]">{p.origin ?? <Ph>origin</Ph>}</dd>
            <dt>Dimensions</dt><dd className="text-[var(--fg)]">{p.size ?? <Ph>dimensions</Ph>}</dd>
            <dt>Weight</dt><dd className="text-[var(--fg)]">{p.weight ?? <Ph>weight</Ph>}</dd>
            <dt>Edition</dt><dd className="text-[var(--fg)]">{p.one_of_a_kind ? 'Unique — the piece photographed' : 'Available in small numbers'}</dd>
          </dl>
          <p className="mt-8 text-[17px] leading-relaxed">{p.description}</p>

          <div className="mt-10 border-t border-[var(--line)] pt-6">
            <p className="ga-serif text-4xl">{sold ? 'Sold' : money(p.price)}{!sold && p.price != null && <span className="vx-sample">sample</span>}</p>
            {sold ? (
              <p className="ga-label mt-3">This work has been acquired. New pieces arrive often — <Link className="underline" to={to('collection')}>see what’s on the wall</Link>.</p>
            ) : (
              <>
                <button className="ga-acquire mt-4" onClick={() => add(p.slug)} disabled={p.price == null}>{inBag ? 'In your bag — acquire another piece' : 'Acquire'}</button>
                <p className="ga-label mt-4">Collect in person at {BUSINESS.address.street} — free. Or have it double-boxed and shipped.</p>
              </>)}
          </div>

          {p.tiktok && (
            <div className="mt-12 flex items-end gap-5">
              <TikTokCard id={p.tiktok} poster={p.images[0]} title={`${p.name} on film`} className="w-36 shrink-0" />
              <p className="ga-label">Seen on film. The shop posts new works to TikTok as they arrive.</p>
            </div>)}
        </div>
      </div>

      <nav aria-label="More works" className="mt-24 grid grid-cols-2 border-t border-[var(--line)] pt-6">
        <Link to={to(`collection/${prev.slug}`)} className="group"><span className="ga-tiny">← Previous work</span><span className="mt-2 block ga-serif text-2xl group-hover:italic">{prev.name}</span></Link>
        <Link to={to(`collection/${next.slug}`)} className="group text-right"><span className="ga-tiny">Next work →</span><span className="mt-2 block ga-serif text-2xl group-hover:italic">{next.name}</span></Link>
      </nav>
    </article>
  )
}
