/** Gallery building blocks: the wall label and a "work" (image + label). */
import { Link } from 'react-router-dom'
import { money, type Category, type Product } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { useTo, useVariation } from '../../shared/variation'

export const ROOM: Record<Category, { n: string; name: string }> = {
  crystals: { n: 'I', name: 'Crystals' }, minerals: { n: 'II', name: 'Minerals' }, jewelry: { n: 'III', name: 'Jewelry' },
}

/** Museum wall label. The Acquire action is quiet but a real, keyboard-reachable button. */
export function WallLabel({ p, className = '', link = true }: { p: Product; className?: string; link?: boolean }) {
  const { isSold, add, lines } = useStore(); const to = useTo(); const v = useVariation()
  const sold = isSold(p); const inBag = lines.some((l) => l.slug === p.slug)
  return (
    <div className={`ga-label ${className}`}>
      <p>{p.no} · Room {ROOM[p.category].n}</p>
      <p className="ga-title mt-2">{link ? <Link to={to(`${v.shop}/${p.slug}`)} className="hover:italic">{p.name}</Link> : p.name}</p>
      <p className="mt-2">{p.material ?? 'Material to confirm'}{p.origin ? <><br />{p.origin}</> : null}</p>
      <p className="mt-2"><b>{sold ? 'Sold' : p.price == null ? 'Price on request' : money(p.price)}</b>{!sold && p.price != null && <span className="ml-2 opacity-70">sample price</span>}{p.one_of_a_kind && !sold ? ' · unique' : ''}</p>
      {!sold && p.price != null && (
        <button className="ga-acquire mt-1" onClick={() => add(p.slug)} aria-label={`${inBag ? 'In your bag' : 'Acquire'}: ${p.name}`}>{inBag ? 'In your bag' : 'Acquire'}</button>)}
    </div>
  )
}

/** A work on the wall. `size` controls how much of the wall it takes. */
export function Work({ p, size = 'l', align = 'left', priority = false, sizes }: { p: Product; size?: 's' | 'm' | 'l'; align?: 'left' | 'right'; priority?: boolean; sizes?: string }) {
  const to = useTo(); const v = useVariation(); const { isSold } = useStore()
  const w = { s: 'md:w-[34%]', m: 'md:w-[46%]', l: 'md:w-[62%]' }[size]
  return (
    <figure className={`ga-work flex flex-col gap-6 md:flex-row md:items-end md:gap-10 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <Link to={to(`${v.shop}/${p.slug}`)} className={`block w-full overflow-hidden ${w}`} aria-label={`${p.name}${isSold(p) ? ' (sold)' : ''}`} data-rv="mask">
        <Img name={p.images[0]} alt={`${p.name}: ${p.description}`} sizes={sizes ?? `(min-width:768px) ${{ s: 34, m: 46, l: 62 }[size]}vw, 100vw`} priority={priority}
          className={`aspect-[4/5] h-auto w-full object-cover ${isSold(p) ? 'opacity-60 grayscale' : ''}`} />
      </Link>
      <figcaption className="md:w-64 md:shrink-0" data-rv="up"><WallLabel p={p} /></figcaption>
    </figure>
  )
}
