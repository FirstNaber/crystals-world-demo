import { Link } from 'react-router-dom'
import type { Product } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { useTo } from '../../shared/variation'
import { AddButton, Price } from '../../shared/ui/bits'

/** Product card with quick-add and a pickup badge. */
export function ProductCard({ p, sizes = '(min-width:1024px) 25vw, 50vw' }: { p: Product; sizes?: string }) {
  const { isSold } = useStore(); const to = useTo()
  const sold = isSold(p)
  return (
    <article className="vb-card flex flex-col">
      <Link to={to(`shop/${p.slug}`)} className="relative block aspect-[4/5] overflow-hidden bg-[var(--surface)]" aria-label={`${p.name}${sold ? ' (sold)' : ''}`}>
        <Img name={p.images[0]} alt={`${p.name}: ${p.description}`} sizes={sizes} className={`h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04] ${sold ? 'opacity-60 grayscale' : ''}`} />
        <span className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {p.new && !sold && <span className="vb-chip is-dark">New</span>}
          {p.one_of_a_kind && !sold && <span className="vb-chip">One of a kind</span>}
          {sold && <span className="vb-chip is-dark">Sold</span>}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <h3 className="vx-display text-xl leading-tight"><Link to={to(`shop/${p.slug}`)} className="hover:underline">{p.name}</Link></h3>
          <Price p={p} className="whitespace-nowrap font-semibold" />
        </div>
        <p className="vx-muted text-sm capitalize">{p.category}{p.material ? ` · ${p.material}` : ''}</p>
        {!sold && <p className="vb-chip is-green w-fit">Free pickup on Guadalupe St</p>}
        <div className="mt-auto pt-2"><AddButton p={p} className="vx-btn w-full !min-h-11 !py-2" label="Quick add" /></div>
      </div>
    </article>
  )
}
