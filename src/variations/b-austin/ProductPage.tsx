import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ADDRESS_LINE, DEMO, money } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { productLd, useSeo } from '../../shared/seo'
import { useTo } from '../../shared/variation'
import { AddButton, Availability, DirectionsLink, Ph, Price } from '../../shared/ui/bits'
import { NotFound } from '../../shared/ui/pages'
import { TikTokCard } from '../../shared/ui/TikTok'
import { ProductCard } from './parts'

export function ProductPage() {
  const { slug } = useParams(); const to = useTo()
  const { bySlug, products, isSold } = useStore()
  const p = bySlug(slug ?? ''); const [fig, setFig] = useState(0)
  const sold = p ? isSold(p) : false
  useSeo(p ? { title: `${p.name} — Crystals World, Austin TX`, description: p.description, jsonLd: productLd(p, !sold, `${location.origin}${import.meta.env.BASE_URL}img/${p.images[0]}-960.jpg`) } : { title: 'Not found', description: '' })
  if (!p) return <NotFound />
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category && !isSold(x)).slice(0, 4)
  return (
    <section className="vx-page">
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]"><Link className="underline" to={to('shop')}>Shop</Link> / <Link className="underline capitalize" to={to(`shop?cat=${p.category}`)}>{p.category}</Link> / {p.name}</nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-[24px] bg-[var(--surface)]"><Img key={p.images[fig]} name={p.images[fig]} alt={`${p.name}${fig ? ' (detail)' : ''}: ${p.description}`} priority sizes="(min-width:1024px) 58vw, 100vw" className={`aspect-[4/5] w-full object-cover ${sold ? 'opacity-70 grayscale' : ''}`} /></div>
          {p.images.length > 1 && <div className="mt-3 flex gap-3" role="group" aria-label="Photos">{p.images.map((n, k) => <button key={n} onClick={() => setFig(k)} aria-pressed={fig === k} aria-label={`Show photo ${k + 1}`} className={`h-20 w-16 overflow-hidden rounded-xl border-2 ${fig === k ? 'border-[var(--accent)]' : 'border-transparent'}`}><Img name={n} alt="" sizes="64px" className="h-full w-full object-cover" /></button>)}</div>}
        </div>
        <div className="lg:col-span-5">
          <div className="flex flex-wrap gap-2">{p.new && !sold && <span className="vb-chip is-dark">New</span>}{p.one_of_a_kind && <span className="vb-chip">One of a kind</span>}<span className="vb-chip capitalize">{p.category}</span></div>
          <h1 className="vx-display mt-4 text-4xl sm:text-5xl">{p.name}</h1>
          <p className="mt-3 text-2xl font-semibold"><Price p={p} /></p>
          <p className="mt-1 text-sm"><Availability p={p} /></p>
          <p className="mt-5 leading-relaxed">{p.description}</p>
          <div className="mt-6"><AddButton p={p} className="vx-btn w-full" /></div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="vb-card !bg-[#e4ead3] p-4"><p className="font-semibold">Pick up in store — free</p><p className="mt-1 text-sm text-[var(--muted)]">{ADDRESS_LINE}. We’ll email when it’s ready. <DirectionsLink where="b_product" className="vx-link">Directions</DirectionsLink></p></div>
            <div className="vb-card p-4"><p className="font-semibold">Ship to you — {money(DEMO.shippingFlat)}</p><p className="mt-1 text-sm text-[var(--muted)]">Double-boxed and padded. USPS, UPS or DHL. <Link className="vx-link" to={to('policies/shipping')}>Shipping details</Link></p></div>
          </div>

          <dl className="mt-8 divide-y vx-line border-y vx-line text-sm [&>div]:grid [&>div]:grid-cols-[8rem_1fr] [&>div]:py-3">
            <div><dt className="vx-muted">Catalogue no.</dt><dd>{p.no}</dd></div>
            <div><dt className="vx-muted">Material</dt><dd>{p.material ?? <Ph>material</Ph>}</dd></div>
            <div><dt className="vx-muted">Origin</dt><dd>{p.origin ?? <Ph>origin</Ph>}</dd></div>
            <div><dt className="vx-muted">Size</dt><dd>{p.size ?? <Ph>size</Ph>}</dd></div>
            <div><dt className="vx-muted">Weight</dt><dd>{p.weight ?? <Ph>weight</Ph>}</dd></div>
          </dl>
          {p.tiktok && <div className="mt-8 flex items-end gap-4"><TikTokCard id={p.tiktok} poster={p.images[0]} title={p.name} className="w-32 shrink-0 rounded-2xl" /><p className="text-sm text-[var(--muted)]">See it on the shop’s TikTok.</p></div>}
        </div>
      </div>
      {related.length > 0 && <div className="mt-20"><h2 className="vx-display text-3xl">You may also like</h2><div className="mt-6 grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></div>}
    </section>
  )
}
