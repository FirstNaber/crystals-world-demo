import { Link, useSearchParams } from 'react-router-dom'
import { money, type Category } from '../../shared/content'
import { useStore } from '../../shared/store'
import { useSeo } from '../../shared/seo'
import { useTo } from '../../shared/variation'
import { ROOM, Work } from './parts'

const ROOMS: (Category | 'all')[] = ['all', 'crystals', 'minerals', 'jewelry']

/** The complete collection: an exhibition wall (default) or a museum checklist. No product-card grid. */
export function Collection() {
  const { products, isSold } = useStore(); const to = useTo()
  const [sp, setSp] = useSearchParams()
  const room = (sp.get('room') as Category | null) ?? 'all'
  const view = sp.get('view') === 'checklist' ? 'checklist' : 'wall'
  const showSold = sp.get('sold') !== '0'
  const set = (k: string, v: string | null) => { const n = new URLSearchParams(sp); if (v == null) n.delete(k); else n.set(k, v); setSp(n, { replace: true }) }
  const list = products.filter((p) => (room === 'all' || p.category === room) && (showSold || !isSold(p)))
    .sort((a, b) => Number(isSold(a)) - Number(isSold(b)))
  useSeo({ title: `The Collection — Crystals World, Austin TX`, description: 'Crystals, mineral specimens and jewelry, each one presented as a work with its own label. Acquire online, collect in Austin.' })

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-16 sm:px-10 md:pt-24">
      <p className="ga-tiny">The complete collection · {products.length} works</p>
      <h1 className="mt-4 ga-serif text-[clamp(3.4rem,10vw,9rem)] leading-[.88]">{room === 'all' ? 'The Collection' : <><span className="ga-num mr-4 text-[var(--muted)]">{ROOM[room].n}</span>{ROOM[room].name}</>}</h1>

      <div className="mt-10 flex flex-col gap-4 border-y border-[var(--line)] py-4 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Rooms" className="flex flex-wrap gap-x-6 gap-y-1">
          {ROOMS.map((r) => (
            <button key={r} onClick={() => set('room', r === 'all' ? null : r)} aria-pressed={room === r}
              className={`ga-tiny min-h-11 ${room === r ? '!text-[var(--fg)] underline underline-offset-8' : 'hover:!text-[var(--fg)]'}`}>
              {r === 'all' ? 'All rooms' : `Room ${ROOM[r].n} · ${ROOM[r].name}`}
            </button>))}
        </nav>
        <div className="flex flex-wrap gap-x-6">
          <button className={`ga-tiny min-h-11 ${view === 'wall' ? '!text-[var(--fg)] underline underline-offset-8' : ''}`} aria-pressed={view === 'wall'} onClick={() => set('view', null)}>Exhibition</button>
          <button className={`ga-tiny min-h-11 ${view === 'checklist' ? '!text-[var(--fg)] underline underline-offset-8' : ''}`} aria-pressed={view === 'checklist'} onClick={() => set('view', 'checklist')}>Checklist</button>
          <label className="ga-tiny flex min-h-11 cursor-pointer items-center gap-2"><input type="checkbox" checked={showSold} onChange={(e) => set('sold', e.target.checked ? null : '0')} className="accent-[var(--fg)]" />Include sold</label>
        </div>
      </div>

      {view === 'wall' ? (
        <div className="mt-20 space-y-28 md:space-y-40">
          {list.map((p, i) => (
            <div key={p.slug} className={['md:pr-[10%]', 'md:pl-[30%]', 'md:pl-[8%] md:pr-[22%]'][i % 3]}>
              <Work p={p} size={(['l', 'm', 's'] as const)[i % 3]} align={i % 2 ? 'right' : 'left'} priority={i === 0} />
            </div>))}
        </div>
      ) : (
        <table className="ga-checklist mt-12 w-full ga-mono text-[13px]">
          <caption className="sr-only">Checklist of works</caption>
          <thead><tr><th scope="col">No.</th><th scope="col">Title</th><th scope="col" className="hidden md:table-cell">Material</th><th scope="col" className="hidden sm:table-cell">Room</th><th scope="col" className="text-right">Price</th></tr></thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.slug} className={isSold(p) ? 'text-[var(--muted)]' : ''}>
                <td className="whitespace-nowrap">{p.no}</td>
                <td><Link className="ga-serif text-xl hover:italic" to={to(`collection/${p.slug}`)}>{p.name}</Link></td>
                <td className="hidden md:table-cell">{p.material}</td>
                <td className="hidden sm:table-cell">{ROOM[p.category].n}</td>
                <td className="whitespace-nowrap text-right">{isSold(p) ? 'Sold' : money(p.price)}</td>
              </tr>))}
          </tbody>
        </table>)}
      <p className="ga-label mt-16">Prices are samples for this proposal. Every work can be collected free at the shop, 3202 Guadalupe St.</p>
    </div>
  )
}
