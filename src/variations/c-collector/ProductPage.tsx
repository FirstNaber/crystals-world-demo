import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BUSINESS } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { productLd, useSeo } from '../../shared/seo'
import { useTo } from '../../shared/variation'
import { AddButton, Availability, Ph, Price } from '../../shared/ui/bits'
import { NotFound } from '../../shared/ui/pages'
import { TikTokCard } from '../../shared/ui/TikTok'

export function ProductPage() {
  const { slug } = useParams(); const to = useTo()
  const { products, bySlug, isSold } = useStore()
  const p = bySlug(slug ?? ''); const [fig, setFig] = useState(0)
  const sold = p ? isSold(p) : false
  useSeo(p ? { title: `${p.name} — Crystals World, Austin TX`, description: p.description, jsonLd: productLd(p, !sold, `${location.origin}${import.meta.env.BASE_URL}img/${p.images[0]}-960.jpg`) } : { title: 'Not found', description: '' })
  if (!p) return <NotFound />
  const i = products.findIndex((x) => x.slug === p.slug)
  const prev = products[(i - 1 + products.length) % products.length], next = products[(i + 1) % products.length]
  return (
    <article className="mx-auto max-w-[1600px] px-4 pb-24 pt-10 sm:px-8">
      <nav aria-label="Breadcrumb" className="vc-cat"><Link to={to('collection')} className="hover:underline">Collection</Link> / {p.no}</nav>
      <h1 className="vc-mega mt-6 text-[clamp(3rem,11vw,11rem)]">{p.name}</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden"><Img key={p.images[fig]} name={p.images[fig]} alt={`${p.name}${fig ? ' (detail)' : ''}: ${p.description}`} priority sizes="(min-width:1024px) 58vw, 100vw" className={`aspect-[4/5] w-full object-cover ${sold ? 'opacity-60 grayscale' : ''}`} /></div>
          {p.images.length > 1 && <div className="mt-3 flex gap-6" role="group" aria-label="Plates">{p.images.map((_, k) => <button key={k} className={`vc-cat min-h-11 ${fig === k ? '!text-[var(--fg)] underline underline-offset-8' : ''}`} aria-pressed={fig === k} onClick={() => setFig(k)}>Plate {k + 1}</button>)}</div>}
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="vc-cat">{p.no} — {p.category}</p>
          <p className="mt-6 text-lg leading-relaxed">{p.description}</p>
          <dl className="mt-8 divide-y vx-line border-y vx-line text-sm [&>div]:grid [&>div]:grid-cols-[7rem_1fr] [&>div]:py-3">
            <div><dt className="vc-cat">Material</dt><dd>{p.material ?? <Ph>material</Ph>}</dd></div>
            <div><dt className="vc-cat">Origin</dt><dd>{p.origin ?? <Ph>origin</Ph>}</dd></div>
            <div><dt className="vc-cat">Size</dt><dd>{p.size ?? <Ph>size</Ph>}</dd></div>
            <div><dt className="vc-cat">Weight</dt><dd>{p.weight ?? <Ph>weight</Ph>}</dd></div>
            <div><dt className="vc-cat">Edition</dt><dd>{p.one_of_a_kind ? 'Unique' : <Availability p={p} />}</dd></div>
          </dl>
          <p className="vx-display mt-8 text-5xl">{sold ? 'Collected' : <Price p={p} />}</p>
          <div className="mt-5"><AddButton p={p} className="vx-btn w-full" /></div>
          <p className="vc-cat mt-4 !normal-case !tracking-normal">Collect in person at {BUSINESS.address.street}, free. Or shipped, double-boxed.</p>
          {p.tiktok && <div className="mt-10 flex items-end gap-4"><TikTokCard id={p.tiktok} poster={p.images[0]} title={p.name} className="w-32 shrink-0" /><p className="vc-cat">On film</p></div>}
        </div>
      </div>
      <nav aria-label="More entries" className="mt-20 grid grid-cols-2 border-t vx-line pt-6">
        <Link to={to(`collection/${prev.slug}`)} className="group"><span className="vc-cat">← Previous</span><span className="vx-display mt-2 block text-2xl group-hover:underline">{prev.name}</span></Link>
        <Link to={to(`collection/${next.slug}`)} className="group text-right"><span className="vc-cat">Next →</span><span className="vx-display mt-2 block text-2xl group-hover:underline">{next.name}</span></Link>
      </nav>
    </article>
  )
}
