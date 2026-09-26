/**
 * OWNER CATALOG — catalog and price pieces "as you go", from a phone.
 * Pitch demo: saves to this browser (localStorage) and updates all three variations instantly.
 * Live store: the same fields map 1:1 to Shopify products (title, image, price, product type,
 * inventory 1 for one-of-a-kind, tag "new"). The owner would do exactly this in the Shopify mobile app,
 * and Shopify POS keeps counter sales and online stock in sync. See README → "Going live".
 */
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS, CATEGORIES, type Category, type Product } from '../content'
import { Img } from '../Img'
import { useStore } from '../store'
import { useSeo } from '../seo'
import { VARIANTS } from './DevToolbar'
import { importTikTok, type TikTokDraft } from '../tiktokImport'
import { WALL, FAMILIES, type WallPost } from './Wall'

/** Downscale a camera photo to ≤1200px JPEG so it fits in browser storage (and uploads fast later). */
async function shrink(file: File): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url })
    const s = Math.min(1, 1200 / Math.max(img.width, img.height))
    const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s)
    c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
    return c.toDataURL('image/jpeg', 0.8)
  } finally { URL.revokeObjectURL(url) }
}
const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60)

export function OwnerPage() {
  const { products, saveOwnerProduct, deleteOwnerProduct, setOverride, isSold, resetDemo } = useStore()
  const [photo, setPhoto] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)
  const [one, setOne] = useState(true)
  const [busy, setBusy] = useState(false)
  const [tt, setTt] = useState<TikTokDraft | null>(null)
  const [ttBusy, setTtBusy] = useState(false)
  const [ttMsg, setTtMsg] = useState<string | null>(null)
  const [wallMsg, setWallMsg] = useState<string | null>(null)
  const [wallFilter, setWallFilter] = useState<'todo' | 'all'>('todo')
  const formRef = useRef<HTMLFormElement>(null)
  useSeo({ title: `Owner catalog — ${BUSINESS.name}`, description: 'Add, price and mark pieces sold.' })
  const nextNo = useMemo(() => `CW-${String(Math.max(0, ...products.map((p) => parseInt(p.no.replace(/\D/g, '')) || 0)) + 1).padStart(3, '0')}`, [products])

  const fromTikTok = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const box = e.currentTarget   // React clears currentTarget once we await
    const link = String(new FormData(box).get('link') ?? '')
    setTtBusy(true); setTtMsg(null); setMsg(null)
    try {
      const d = await importTikTok(link)
      const el = (n: string) => formRef.current?.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | null
      const name = el('name'); if (name) name.value = d.name
      const cat = el('category'); if (cat) cat.value = d.category
      const mat = el('material'); if (mat) mat.value = d.material ?? ''
      setPhoto(d.cover); setTt(d); setOne(true)
      setTtMsg(`Filled in from TikTok. Add a price and publish.`)
      box.reset()
      setTimeout(() => (el('price') as HTMLInputElement | null)?.focus(), 50)
    } catch (err) {
      setTtMsg(err instanceof Error ? err.message : 'Couldn’t reach TikTok. Check the connection and try again.')
    } finally { setTtBusy(false) }
  }

  const publish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    if (!photo) return setMsg('Add a photo first.')
    if (!f.name?.trim()) return setMsg('Give the piece a name.')
    const price = f.price ? Number(f.price) : null
    const slug = `${slugify(f.name)}-${Date.now().toString(36).slice(-4)}`
    const p: Product = {
      slug, no: nextNo, name: f.name.trim(), category: (f.category as Category) || 'crystals', price: price && price > 0 ? price : null,
      images: [photo], description: f.description?.trim() || `${f.name.trim()}, photographed in the shop.`,
      material: f.material?.trim() || null, origin: tt?.origin ?? null, size: f.size?.trim() || null, weight: null,
      stock: one ? 1 : Math.max(1, Number(f.qty) || 1), one_of_a_kind: one, sold: false, new: true, featured: true, tiktok: tt?.id ?? null, ownerAdded: true,
    }
    if (!saveOwnerProduct(p)) return setMsg('This browser is out of storage for photos. Remove an older demo piece and try again.')
    setMsg(`Published ${p.no} · ${p.name}. It’s live in all three versions.`)
    setPhoto(null); setTt(null); setTtMsg(null); formRef.current?.reset(); setOne(true)
  }

  const putOnSale = (post: WallPost, raw: string) => {
    const price = Number(raw)
    if (!(price > 0)) return setWallMsg('Type a price first.')
    const p: Product = {
      slug: `${slugify(post.name)}-${post.id.slice(-4)}`, no: nextNo, name: post.name, category: post.category, price,
      images: [post.image], description: `${post.name}, filmed in the shop. Watch it on our TikTok.`,
      material: post.material, origin: post.origin, size: null, weight: null,
      stock: 1, one_of_a_kind: true, sold: false, new: true, featured: false, tiktok: post.id, ownerAdded: true,
    }
    if (!saveOwnerProduct(p)) return setWallMsg('This browser is out of storage. Remove an older demo piece and try again.')
    setWallMsg(`${p.name} is on sale at $${price}. It’s buyable on the Wall and in the shop.`)
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ products: products.map(({ ownerAdded: _o, ...p }) => p) }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'products.json'; a.click(); URL.revokeObjectURL(a.href)
  }

  return (
    <div className="owner min-h-screen bg-[#f5f4f1] text-[#1c1b19]">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-[#f5f4f1]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <p className="font-semibold">Crystals World · Owner catalog</p>
          <Link to="/" className="text-sm underline">All versions</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-24">
        <p className="mt-4 rounded-lg border border-amber-700/30 bg-amber-50 p-3 text-sm">Demo: pieces are saved in this browser only and appear instantly in all three versions. In the live store, TikTok import and the rest of this screen connect to the store's product catalog.</p>

        <h1 className="mt-8 text-3xl font-semibold">Add a piece</h1>
        <p className="mt-1 text-sm text-black/60">Already posted it on TikTok? Paste the link and we fill in the rest. Or snap a photo below.</p>

        <form onSubmit={fromTikTok} className="mt-6 rounded-2xl bg-black p-5 text-white shadow-sm">
          <label className="block"><span className="text-sm font-medium">From your TikTok</span>
            <span className="mt-1 block text-xs text-white/60">Paste a video link. The name, photo and video come in automatically.</span>
            <div className="mt-3 flex gap-2">
              <input name="link" type="url" inputMode="url" required placeholder="https://www.tiktok.com/@crystals_world01/video/…" className="owner-input !mt-0 min-w-0 flex-1 text-black" />
              <button className="shrink-0 rounded-full bg-white px-5 text-sm font-semibold text-black disabled:opacity-50" disabled={ttBusy}>{ttBusy ? 'Fetching…' : 'Fill in'}</button>
            </div>
          </label>
          {ttMsg && <p role="status" className="mt-3 text-sm text-white/85">{ttMsg}</p>}
        </form>

        <p className="mt-6 text-center text-xs uppercase tracking-widest text-black/40">{tt ? 'Check it, add a price, publish' : 'or add it by hand'}</p>
        <form ref={formRef} onSubmit={publish} className="mt-6 space-y-5 rounded-2xl bg-white p-5 shadow-sm">
          <div>
            <span className="text-sm font-medium">Photo</span>
            <label className="mt-2 grid aspect-[4/3] cursor-pointer place-items-center overflow-hidden rounded-xl border-2 border-dashed border-black/20 bg-black/[.03] text-center text-sm focus-within:ring-2 focus-within:ring-black">
              {photo ? <img src={photo} alt="Preview of the new piece" className="h-full w-full object-contain" /> : <span>{busy ? 'Preparing photo…' : <>Tap to take a photo<br /><span className="text-black/50">or choose from your library</span></>}</span>}
              <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={async (e) => {
                const file = e.target.files?.[0]; if (!file) return
                setBusy(true); try { setPhoto(await shrink(file)) } finally { setBusy(false) }
              }} />
            </label>
          </div>
          {tt && <p className="flex items-center justify-between gap-3 rounded-lg bg-black/5 p-3 text-xs"><span className="min-w-0 truncate">Linked to TikTok video {tt.id}{tt.origin ? ` · origin: ${tt.origin}` : ''}</span><a href={tt.url} target="_blank" rel="noopener noreferrer" className="shrink-0 underline">View</a></p>}
          <label className="block"><span className="text-sm font-medium">Name</span><input name="name" className="owner-input" placeholder="e.g. Amethyst Cluster on Stand" required /></label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="text-sm font-medium">Category</span>
              <select name="category" className="owner-input" defaultValue="crystals">{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select></label>
            <label className="block"><span className="text-sm font-medium">Price (USD)</span><input name="price" type="number" inputMode="decimal" min="0" step="1" className="owner-input" placeholder="Leave blank = on request" /></label>
          </div>
          <fieldset className="flex flex-wrap items-center gap-4">
            <legend className="sr-only">Stock</legend>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={one} onChange={(e) => setOne(e.target.checked)} className="h-5 w-5" /> One of a kind (sells once)</label>
            {!one && <label className="flex items-center gap-2 text-sm">Quantity <input name="qty" type="number" min="1" defaultValue={2} className="owner-input !mt-0 w-20" /></label>}
          </fieldset>
          <details className="text-sm"><summary className="cursor-pointer font-medium">More details (optional)</summary>
            <div className="mt-3 space-y-3">
              <label className="block"><span>Material</span><input name="material" className="owner-input" placeholder="e.g. Amethyst (quartz)" /></label>
              <label className="block"><span>Size</span><input name="size" className="owner-input" placeholder="e.g. 18 × 12 cm" /></label>
              <label className="block"><span>Short description</span><textarea name="description" rows={2} className="owner-input" /></label>
            </div>
          </details>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-black/50">Will be catalogued as {nextNo}</span>
            <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white disabled:opacity-50" disabled={busy}>Publish</button>
          </div>
          {msg && <p role="status" className="rounded-lg bg-black/5 p-3 text-sm">{msg}</p>}
        </form>

        <h2 className="mt-12 text-2xl font-semibold">Your TikTok wall <span className="text-base font-normal text-black/50">({WALL.length})</span></h2>
        <p className="mt-1 text-sm text-black/60">Every piece you’ve filmed. Type a price and tap <b>Sell</b>: it gets a buy button on the Wall and joins the shop.</p>
        <div className="mt-3 flex gap-2 text-sm" role="group" aria-label="Show">
          {(['todo', 'all'] as const).map((f) => <button key={f} aria-pressed={wallFilter === f} onClick={() => setWallFilter(f)} className={`rounded-full border px-3 py-1.5 ${wallFilter === f ? 'border-black bg-black text-white' : 'border-black/20'}`}>{f === 'todo' ? `Not on sale yet (${WALL.filter((w) => !products.some((p) => p.tiktok === w.id)).length})` : 'All'}</button>)}
        </div>
        {wallMsg && <p role="status" className="mt-3 rounded-lg bg-black/5 p-3 text-sm">{wallMsg}</p>}
        <ul className="mt-4 divide-y divide-black/10 rounded-2xl bg-white shadow-sm">
          {WALL.map((w) => ({ w, p: products.find((x) => x.tiktok === w.id) })).filter(({ p }) => wallFilter === 'all' || !p).map(({ w, p }) => (
            <li key={w.id} className="flex items-center gap-3 p-3">
              <span className="relative block h-16 w-12 shrink-0 overflow-hidden rounded-md bg-black/5"><Img name={w.image} alt="" sizes="48px" className="h-full w-full object-cover" />
                <i className="absolute inset-x-0 top-0 h-1" style={{ background: FAMILIES.find((f) => f.id === w.family)?.hex }} aria-hidden /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{w.name}</p>
                <p className="text-xs text-black/50">{w.category}{p ? (isSold(p) ? ' · sold' : p.price != null ? ` · on sale $${p.price}` : ' · in catalog, no price') : ''}</p>
              </div>
              {!p && (
                <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); putOnSale(w, String(new FormData(e.currentTarget).get('price') ?? '')) }}>
                  <label><span className="sr-only">Price for {w.name}</span>
                    <input name="price" type="number" min="1" inputMode="decimal" placeholder="$" className="owner-input !mt-0 w-20 text-right" /></label>
                  <button className="min-h-11 rounded-full bg-black px-4 text-sm font-semibold text-white">Sell</button>
                </form>)}
            </li>))}
        </ul>

        <h2 className="mt-12 text-2xl font-semibold">Catalog <span className="text-base font-normal text-black/50">({products.length})</span></h2>
        <p className="mt-1 text-sm text-black/60">Change a price or mark a piece sold (e.g. it sold at the counter). Updates everywhere at once.</p>
        <ul className="mt-4 divide-y divide-black/10 rounded-2xl bg-white shadow-sm">
          {products.map((p) => (
            <li key={p.slug} className="flex items-center gap-3 p-3">
              <span className="block h-16 w-14 shrink-0 overflow-hidden rounded-md bg-black/5"><Img name={p.images[0]} alt="" sizes="56px" className="h-full w-full object-cover" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-black/50">{p.no} · {p.category}{p.ownerAdded ? ' · added by you' : ''}</p>
              </div>
              <label className="text-xs"><span className="sr-only">Price for {p.name}</span>
                <input type="number" min="0" inputMode="decimal" defaultValue={p.price ?? ''} placeholder="—" className="owner-input !mt-0 w-20 text-right"
                  onBlur={(e) => setOverride(p.slug, { price: e.target.value ? Number(e.target.value) : null })} /></label>
              <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={isSold(p)} onChange={(e) => setOverride(p.slug, e.target.checked ? { sold: true } : { sold: false, stock: Math.max(p.stock, 1) })} /> Sold</label>
              {p.ownerAdded && <button className="text-xs underline" onClick={() => deleteOwnerProduct(p.slug)}>Delete</button>}
            </li>))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <button onClick={exportJson} className="rounded-full border border-black/20 px-4 py-2">Export products.json</button>
          <button onClick={() => { if (confirm('Reset all demo changes (cart, orders, sold marks, added pieces)?')) resetDemo() }} className="rounded-full border border-black/20 px-4 py-2">Reset demo</button>
        </div>
        <p className="mt-6 text-sm">See your pieces in: {VARIANTS.slice(1).map((v, i) => <span key={v.path}>{i ? ' · ' : ''}<Link className="underline" to={v.path}>{v.label}</Link></span>)}</p>
        <p className="mt-2 text-xs text-black/50">Catalog prices are samples until you set real ones.</p>
      </main>
    </div>
  )
}
