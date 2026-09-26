import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, type Category } from '../../shared/content'
import { useStore } from '../../shared/store'
import { useSeo } from '../../shared/seo'
import { ProductCard } from './parts'

const PRICES: [string, number, number][] = [['Under $75', 0, 74.99], ['$75 – $150', 75, 150], ['Over $150', 150.01, Infinity]]
const SORTS = [['featured', 'Featured'], ['new', 'Newest'], ['low', 'Price: low to high'], ['high', 'Price: high to low']] as const

export function Shop() {
  const { products, isSold } = useStore()
  const [sp, setSp] = useSearchParams()
  const cat = (sp.get('cat') as Category | null) ?? 'all'
  const [q, setQ] = useState(''); const [price, setPrice] = useState<number | null>(null)
  const [only, setOnly] = useState<'all' | 'one' | 'multi'>('all'); const [showSold, setShowSold] = useState(true)
  const [sort, setSort] = useState<(typeof SORTS)[number][0]>('featured'); const [open, setOpen] = useState(false)
  useSeo({ title: 'Shop crystals, minerals & jewelry — Crystals World, Austin TX', description: 'Browse one-of-a-kind crystals, mineral specimens and jewelry from our Austin shop. Ship anywhere or pick up free on Guadalupe St.' })

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    const r = products.filter((p) => (cat === 'all' || p.category === cat)
      && (!s || `${p.name} ${p.material ?? ''} ${p.category} ${p.description}`.toLowerCase().includes(s))
      && (price == null || (p.price != null && p.price >= PRICES[price][1] && p.price <= PRICES[price][2]))
      && (only === 'all' || (only === 'one') === p.one_of_a_kind) && (showSold || !isSold(p)))
    const key: Record<string, (a: typeof r[0], b: typeof r[0]) => number> = {
      featured: (a, b) => Number(b.featured) - Number(a.featured), new: (a, b) => Number(b.new) - Number(a.new),
      low: (a, b) => (a.price ?? 9e9) - (b.price ?? 9e9), high: (a, b) => (b.price ?? 0) - (a.price ?? 0),
    }
    return [...r].sort(key[sort]).sort((a, b) => Number(isSold(a)) - Number(isSold(b)))
  }, [products, cat, q, price, only, showSold, sort, isSold])
  const active = (price != null ? 1 : 0) + (only !== 'all' ? 1 : 0) + (q ? 1 : 0)
  const reset = () => { setQ(''); setPrice(null); setOnly('all') }
  const pill = (on: boolean) => `vx-btn-ghost !min-h-10 !px-4 !py-1.5 !text-sm ${on ? '!border-[var(--fg)] !bg-[var(--fg)] !text-[var(--bg)]' : ''}`

  const filters = (
    <div className="space-y-6">
      <div><p className="vx-label mb-2">Price</p><div className="flex flex-wrap gap-2">{PRICES.map(([l], i) => <button key={l} aria-pressed={price === i} className={pill(price === i)} onClick={() => setPrice(price === i ? null : i)}>{l}</button>)}</div></div>
      <div><p className="vx-label mb-2">Availability</p><div className="flex flex-wrap gap-2">
        <button aria-pressed={only === 'one'} className={pill(only === 'one')} onClick={() => setOnly(only === 'one' ? 'all' : 'one')}>One of a kind</button>
        <button aria-pressed={only === 'multi'} className={pill(only === 'multi')} onClick={() => setOnly(only === 'multi' ? 'all' : 'multi')}>Multiples</button></div></div>
      <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={showSold} onChange={(e) => setShowSold(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />Show sold pieces</label>
      {active > 0 && <button className="vx-link text-sm" onClick={reset}>Clear filters</button>}
    </div>
  )
  return (
    <section className="vx-page">
      <p className="vx-eyebrow">Shop</p>
      <h1 className="vx-display mt-2 text-5xl sm:text-6xl">{cat === 'all' ? 'The shop' : CATEGORIES.find((c) => c.id === cat)!.label}</h1>
      <p className="mt-3 max-w-xl text-[var(--muted)]">Everything here is on the shelves at 3202 Guadalupe St. Pick up free, or we’ll ship it carefully.</p>
      <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
        {[{ id: 'all', label: 'All' }, ...CATEGORIES].map((c) => <button key={c.id} aria-pressed={cat === c.id} className={pill(cat === c.id)} onClick={() => { const n = new URLSearchParams(sp); c.id === 'all' ? n.delete('cat') : n.set('cat', c.id); setSp(n, { replace: true }) }}>{c.label}</button>)}
      </nav>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label className="min-w-[220px] flex-1"><span className="sr-only">Search the shop</span><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search amethyst, heart, necklace…" className="vx-input w-full" /></label>
        <label className="flex items-center gap-2 text-sm">Sort<select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="vx-input">{SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <button className="vx-btn-ghost lg:hidden" aria-expanded={open} onClick={() => setOpen((o) => !o)}>Filters{active ? ` (${active})` : ''}</button>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside aria-label="Filters" className={`${open ? 'block' : 'hidden'} lg:block`}>{filters}</aside>
        <div aria-live="polite">
          <p className="mb-4 text-sm text-[var(--muted)]">{list.length} {list.length === 1 ? 'piece' : 'pieces'}</p>
          {list.length === 0 ? <div className="vb-card p-10 text-center"><p className="vx-display text-3xl">Nothing matches.</p><button className="vx-btn mt-5" onClick={reset}>Clear filters</button></div>
            : <div className="grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 xl:grid-cols-3 xl:gap-6">{list.map((p) => <ProductCard key={p.slug} p={p} sizes="(min-width:1280px) 26vw, 50vw" />)}</div>}
        </div>
      </div>
    </section>
  )
}
