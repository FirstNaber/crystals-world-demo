import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, type Category } from '../../shared/content'
import { useStore } from '../../shared/store'
import { useSeo } from '../../shared/seo'
import { CollectionIndex, ContactSheet } from './CollectionIndex'

export function CollectionPage() {
  const { products, isSold } = useStore()
  const [sp, setSp] = useSearchParams()
  const cat = (sp.get('cat') as Category | null) ?? 'all'
  const view = sp.get('view') === 'sheet' ? 'sheet' : 'index'
  const showSold = sp.get('sold') !== '0'
  const set = (k: string, v: string | null) => { const n = new URLSearchParams(sp); v == null ? n.delete(k) : n.set(k, v); setSp(n, { replace: true }) }
  const items = products.filter((p) => (cat === 'all' || p.category === cat) && (showSold || !isSold(p))).sort((a, b) => Number(isSold(a)) - Number(isSold(b)))
  useSeo({ title: 'The Collection — Crystals World, Austin TX', description: 'Every crystal, mineral specimen and piece of jewelry in the collection, catalogued. Collect online or in Austin.' })
  const tab = (on: boolean) => `vc-cat min-h-11 ${on ? '!text-[var(--fg)] underline underline-offset-8' : 'hover:!text-[var(--fg)]'}`
  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-24 pt-14 sm:px-8">
      <h1 className="vc-mega text-[clamp(3.4rem,14vw,13rem)]">The<br />Collection</h1>
      <p className="vc-cat mt-4">{items.length} of {products.length} entries</p>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 border-y vx-line py-2">
        <div className="flex flex-wrap gap-x-6" role="group" aria-label="Category">
          {[{ id: 'all', label: 'All' }, ...CATEGORIES].map((c) => <button key={c.id} className={tab(cat === c.id)} aria-pressed={cat === c.id} onClick={() => set('cat', c.id === 'all' ? null : c.id)}>{c.label}</button>)}
        </div>
        <div className="flex flex-wrap items-center gap-x-6">
          <button className={tab(view === 'index')} aria-pressed={view === 'index'} onClick={() => set('view', null)}>Index</button>
          <button className={tab(view === 'sheet')} aria-pressed={view === 'sheet'} onClick={() => set('view', 'sheet')}>Contact sheet</button>
          <label className="vc-cat flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={showSold} onChange={(e) => set('sold', e.target.checked ? null : '0')} className="accent-[#ece6d9]" />Include collected</label>
        </div>
      </div>
      <div className="mt-10">{view === 'index' ? <CollectionIndex items={items} /> : <ContactSheet items={items} />}</div>
    </section>
  )
}
