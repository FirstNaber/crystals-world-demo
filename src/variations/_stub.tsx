/** Temporary plumbing check used only until each variation's own pages exist (Phase 2). */
import { Link, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useStore } from '../shared/store'
import { useTo, useVariation } from '../shared/variation'
import { Img } from '../shared/Img'
import { AddButton, Availability, Price } from '../shared/ui/bits'

export function StubLayout({ children }: { children: ReactNode }) {
  const { count, setOpen } = useStore(); const to = useTo(); const v = useVariation()
  return <><header className="flex justify-between p-4"><Link to={to()}>{v.name}</Link><nav className="flex gap-4"><Link to={to(v.shop)}>Shop</Link><Link to={to('visit')}>Visit</Link><button onClick={() => setOpen(true)}>{v.words.bag} ({count})</button></nav></header><main>{children}</main></>
}
export function StubShop() {
  const { products } = useStore(); const to = useTo(); const v = useVariation()
  return <ul className="vx-page grid grid-cols-2 gap-4 md:grid-cols-4">{products.map((p) => <li key={p.slug}><Link to={to(`${v.shop}/${p.slug}`)}><Img name={p.images[0]} alt={p.name} sizes="25vw" className="aspect-[3/4] w-full object-cover" />{p.name}</Link> <Price p={p} /></li>)}</ul>
}
export function StubProduct() {
  const { slug } = useParams(); const { bySlug } = useStore(); const p = bySlug(slug ?? '')
  if (!p) return <p className="vx-page">Not found</p>
  return <div className="vx-page"><h1 className="vx-display text-4xl">{p.name}</h1><Price p={p} /> <Availability p={p} /><div className="mt-4"><AddButton p={p} /></div></div>
}
