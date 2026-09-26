/**
 * The signature: an interactive index. Desktop: hover or focus a row and the specimen appears beside it
 * with its catalogue number, price and a "Collect" action. Touch: tap a row and it opens in place.
 * Each row is a real <button aria-expanded>, so it works with keyboard and screen readers too.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { useTo } from '../../shared/variation'
import { AddButton, Availability, Ph, Price } from '../../shared/ui/bits'

function Detail({ p }: { p: Product }) {
  const to = useTo()
  return (
    <div className="grid gap-4">
      <p className="vc-cat">{p.no} · {p.category}</p>
      <p className="vx-display text-3xl leading-none">{p.name}</p>
      <p className="text-sm text-[var(--muted)]">{p.material ?? <Ph>material</Ph>}</p>
      <p className="text-xl"><Price p={p} /> <span className="vc-cat ml-2"><Availability p={p} /></span></p>
      <div className="flex flex-wrap gap-3"><AddButton p={p} /><Link to={to(`collection/${p.slug}`)} className="vx-btn-ghost">Full entry</Link></div>
    </div>
  )
}

export function CollectionIndex({ items }: { items: Product[] }) {
  const { isSold } = useStore()
  const [active, setActive] = useState<string | null>(null)
  const cur = items.find((p) => p.slug === active) ?? null
  return (
    <div className="grid gap-x-12 lg:grid-cols-12">
      <ol className="lg:col-span-7" aria-label="Collection index">
        {items.map((p) => {
          const open = active === p.slug
          return (
            <li key={p.slug}>
              <button className={`vc-row ${isSold(p) ? 'is-sold' : ''}`} aria-expanded={open}
                onMouseEnter={() => matchMedia('(hover: hover)').matches && setActive(p.slug)}
                onFocus={() => setActive(p.slug)}
                onClick={() => setActive(open ? null : p.slug)}>
                <span className="vc-cat">{p.no.replace('CW-', '')}</span>
                <span className="vc-name">{p.name}</span>
                <span className="vc-price">{isSold(p) ? 'Collected' : p.price == null ? 'On request' : `$${p.price}`}</span>
              </button>
              {open && (
                <div className="grid grid-cols-[110px_1fr] gap-5 border-b vx-line py-5 lg:hidden" data-rv="fade">
                  <Img name={p.images[0]} alt={`${p.name}: ${p.description}`} sizes="110px" className="aspect-[3/4] w-full object-cover" />
                  <Detail p={p} />
                </div>)}
            </li>)
        })}
      </ol>
      <aside className="hidden lg:col-span-5 lg:block" aria-label="Selected specimen" aria-live="polite">
        <div className="sticky top-20">
          {cur ? (
            <div className="grid gap-5">
              <div className="overflow-hidden"><Img key={cur.slug} name={cur.images[0]} alt={`${cur.name}: ${cur.description}`} sizes="40vw" className="aspect-[4/5] w-full object-cover" /></div>
              <Detail p={cur} />
            </div>
          ) : <p className="vc-cat border-t vx-line pt-4">Hover, focus or tap a specimen.</p>}
        </div>
      </aside>
    </div>
  )
}

/** Contact sheet: every specimen as an image; hover/tap reveals name, number and price. */
export function ContactSheet({ items }: { items: Product[] }) {
  const { isSold } = useStore(); const to = useTo()
  const [on, setOn] = useState<string | null>(null)
  return (
    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {items.map((p, i) => (
        <li key={p.slug} className={i % 5 === 0 ? 'md:row-span-2' : ''}>
          <div className={`vc-tile h-full ${on === p.slug ? 'is-on' : ''}`}>
            <button className="block h-full w-full" aria-label={`${p.name}, ${p.no}. Show details`} aria-pressed={on === p.slug} onClick={() => setOn(on === p.slug ? null : p.slug)}>
              <Img name={p.images[0]} alt="" sizes="(min-width:1024px) 25vw, 50vw" className={`h-full w-full object-cover ${i % 5 === 0 ? 'aspect-[3/5]' : 'aspect-[4/5]'} ${isSold(p) ? 'opacity-50 grayscale' : ''}`} />
            </button>
            <div className="vc-cover pointer-events-none">
              <p className="vc-cat !text-[#ece6d9]">{p.no}</p>
              <p className="vx-display text-xl leading-none">{p.name}</p>
              <p className="text-sm">{isSold(p) ? 'Collected' : <Price p={p} mark={false} />}</p>
              <Link to={to(`collection/${p.slug}`)} className="vc-cat pointer-events-auto !text-[#ece6d9] underline underline-offset-4">View entry →</Link>
            </div>
          </div>
        </li>))}
    </ul>
  )
}
