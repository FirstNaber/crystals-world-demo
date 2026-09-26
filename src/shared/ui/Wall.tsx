/**
 * THE WALL — every piece the shop has filmed for TikTok, arranged by colour.
 * Each tile is one of the shop's own posts (src/content/wall.json). A tile is buyable when a catalog product
 * carries the same TikTok id: the owner prices it from the owner catalog ("Your TikTok wall") and it gets a price
 * and an add-to-bag button here, through the same cart and checkout as the rest of the store.
 * Pieces the owner imports later from a TikTok link join the front of the wall as "New".
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import wallJson from '../../content/wall.json'
import { BUSINESS, money, type Category, type Product } from '../content'
import { Img } from '../Img'
import { useStore } from '../store'
import { useSeo } from '../seo'
import { useTo, useVariation } from '../variation'
import { TikTokCard } from './TikTok'
import { AddButton, CallLink } from './bits'

export interface WallPost { id: string; name: string; category: Category; family: string; material: string | null; origin: string | null; image: string }
export const WALL = wallJson.posts as WallPost[]

/** Colour families in wall order: a spectrum, then the neutrals. */
export const FAMILIES: { id: string; label: string; hex: string }[] = [
  { id: 'violet', label: 'Violet', hex: '#7b4bb7' },
  { id: 'blue', label: 'Blue', hex: '#23409a' },
  { id: 'teal', label: 'Sea', hex: '#6cc2bd' },
  { id: 'green', label: 'Green', hex: '#5b8c3a' },
  { id: 'gold', label: 'Gold', hex: '#d6b24c' },
  { id: 'amber', label: 'Honey', hex: '#dc8a1e' },
  { id: 'red', label: 'Red', hex: '#8e1f27' },
  { id: 'brown', label: 'Earth', hex: '#6d4a2d' },
  { id: 'black', label: 'Black', hex: '#1b1b1b' },
  { id: 'clear', label: 'Clear', hex: '#e7e4dd' },
]
const NEW = { id: 'new', label: 'New', hex: 'var(--accent)' }
const famOf = (id: string) => FAMILIES.find((f) => f.id === id) ?? NEW

interface Tile { post: WallPost; product?: Product; isNew: boolean }

export function WallPage() {
  const v = useVariation()
  const to = useTo()
  const { products, isSold } = useStore()
  const [params, setParams] = useSearchParams()
  const colour = params.get('colour')
  const [open, setOpen] = useState<Tile | null>(null)
  useSeo({ title: 'The Wall — every piece, by colour — Crystals World', description: `${WALL.length} pieces from the Crystals World TikTok, filmed in the shop on Guadalupe St, Austin. Sorted by colour.` })

  const tiles = useMemo<Tile[]>(() => {
    const byTikTok = new Map(products.filter((p) => p.tiktok).map((p) => [p.tiktok as string, p]))
    const onWall = new Set(WALL.map((w) => w.id))
    // pieces the owner imported from TikTok after launch go first
    const fresh: Tile[] = products.filter((p) => p.tiktok && p.ownerAdded && !onWall.has(p.tiktok)).map((p) => ({
      post: { id: p.tiktok!, name: p.name, category: p.category, family: 'new', material: p.material, origin: p.origin, image: p.images[0] }, product: p, isNew: true,
    }))
    const order = (f: string) => FAMILIES.findIndex((x) => x.id === f)
    const wall = [...WALL].sort((a, b) => order(a.family) - order(b.family) || b.id.localeCompare(a.id)).map((post) => ({ post, product: byTikTok.get(post.id), isNew: false }))
    return [...fresh, ...wall]
  }, [products])

  const shown = colour ? tiles.filter((t) => (t.isNew ? 'new' : t.post.family) === colour) : tiles
  const count = (id: string) => tiles.filter((t) => (t.isNew ? 'new' : t.post.family) === id).length
  const forSale = tiles.filter((t) => t.product && t.product.price != null && !isSold(t.product)).length
  const chips = [...(count('new') ? [NEW] : []), ...FAMILIES.filter((f) => count(f.id))]

  return (
    <div className="mx-auto max-w-[var(--page-max)] px-4 pb-24 pt-10 sm:px-8 sm:pt-16">
      <p className="vx-eyebrow">The Wall · @{BUSINESS.social.tiktok.split('@')[1]}</p>
      <h1 className="vx-display mt-3 text-[clamp(2.6rem,7vw,6rem)] leading-[.95]">Every piece we’ve filmed,<br /><em>sorted by colour.</em></h1>
      <p className="mt-5 max-w-[40rem] text-[var(--muted)]">
        {tiles.length} pieces from our TikTok, all filmed in the shop. Tap one to watch it. {forSale ? `${forSale} can be bought right here; ask us about the rest.` : 'Ask us about any of them.'}
      </p>

      <div className="sticky top-0 z-20 -mx-4 mt-8 overflow-x-auto border-y border-[var(--line)] bg-[var(--bg)] px-4 py-3 sm:-mx-8 sm:px-8" role="group" aria-label="Filter by colour">
        <div className="flex w-max gap-2">
          <button className={`wall-chip ${!colour ? 'is-on' : ''}`} aria-pressed={!colour} onClick={() => setParams({})}>All <span>{tiles.length}</span></button>
          {chips.map((f) => (
            <button key={f.id} className={`wall-chip ${colour === f.id ? 'is-on' : ''}`} aria-pressed={colour === f.id} onClick={() => setParams(colour === f.id ? {} : { colour: f.id })}>
              <i style={{ background: f.hex }} aria-hidden />{f.label} <span>{count(f.id)}</span>
            </button>))}
        </div>
      </div>

      <ul className="wall-grid mt-6">
        {shown.map((t) => {
          const p = t.product
          const sold = p ? isSold(p) : false
          const priced = p && p.price != null && !sold
          const fam = famOf(t.isNew ? 'new' : t.post.family)
          return (
            <li key={t.post.id}>
              <button className={`wall-tile ${sold ? 'is-sold' : ''}`} onClick={() => setOpen(t)} style={{ ['--fam' as string]: fam.hex }}
                aria-label={`${t.post.name}${sold ? ', found a home' : priced ? `, ${money(p!.price)}` : ''}. Watch and details`}>
                <Img name={t.post.image} alt="" sizes="(min-width:1024px) 16vw, (min-width:640px) 25vw, 45vw" className="wall-img" />
                <span className="wall-name">{t.post.name}</span>
                {t.isNew && <span className="wall-pill">New</span>}
                {sold ? <span className="wall-pill">Found a home</span> : priced ? <span className="wall-pill">{money(p!.price)}</span> : null}
              </button>
            </li>)
        })}
      </ul>

      <p className="mt-12 text-sm text-[var(--muted)]">
        New pieces land on <a className="underline" href={BUSINESS.social.tiktok} target="_blank" rel="noopener noreferrer">our TikTok</a> most weeks.
        {' '}Prefer to see them in person? <Link className="underline" to={to('visit')}>Visit the shop</Link>.
      </p>

      {open && <PieceSheet tile={open} onClose={() => setOpen(null)} shop={v.shop} />}
    </div>
  )
}

function PieceSheet({ tile, onClose, shop }: { tile: Tile; onClose: () => void; shop: string }) {
  const to = useTo()
  const v = useVariation()
  const { isSold, bySlug } = useStore()
  const p = tile.product ? bySlug(tile.product.slug) : undefined
  const sold = p ? isSold(p) : false
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', esc); document.documentElement.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', esc); document.documentElement.style.overflow = ''; prev?.focus() }
  }, [onClose])
  const facts = [tile.post.material, tile.post.origin && `From ${tile.post.origin}`, tile.post.category[0].toUpperCase() + tile.post.category.slice(1)].filter(Boolean)
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 sm:items-center" onClick={onClose}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={tile.post.name}
        className="wall-sheet grid max-h-[92vh] w-full max-w-3xl gap-6 overflow-y-auto bg-[var(--bg)] p-5 text-[var(--fg)] outline-none sm:grid-cols-[minmax(0,15rem)_1fr] sm:p-8" onClick={(e) => e.stopPropagation()}>
        <TikTokCard id={tile.post.id} poster={tile.post.image} title={tile.post.name} className="mx-auto w-full max-w-[15rem]" />
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <p className="vx-eyebrow">{facts.join(' · ')}</p>
            <button onClick={onClose} className="-mr-2 -mt-2 min-h-11 min-w-11 text-2xl leading-none" aria-label="Close">×</button>
          </div>
          <h2 className="vx-display mt-2 text-[clamp(2rem,4vw,3rem)] leading-[1]">{tile.post.name}</h2>
          {p && !sold && p.price != null ? (
            <>
              <p className="mt-4 text-2xl">{money(p.price)}{!p.ownerAdded && <span className="vx-sample">sample</span>}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{p.one_of_a_kind ? 'One of a kind. ' : ''}Ship it, or pick it up free at 3202 Guadalupe St.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <AddButton p={p} />
                <Link className="vx-btn-ghost" to={to(`${shop}/${p.slug}`)} onClick={onClose}>Full details</Link>
              </div>
            </>
          ) : sold ? (
            <>
              <p className="mt-4 text-lg">This one found a home.</p>
              <p className="mt-1 text-sm text-[var(--muted)]">Pieces like it come in most weeks. Tap a colour on the wall to see what’s here now.</p>
              <div className="mt-6"><button className="vx-btn" onClick={onClose}>Back to the wall</button></div>
            </>
          ) : (
            <>
              <p className="mt-4 text-lg">Not priced online yet.</p>
              <p className="mt-1 text-sm text-[var(--muted)]">Ask us about it: we’ll tell you if it’s still here, the price, and hold it for you.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CallLink className="vx-btn" where="wall">Call the shop</CallLink>
                <a className="vx-btn-ghost" href={`${BUSINESS.social.tiktok}/video/${tile.post.id}`} target="_blank" rel="noopener noreferrer">Ask on TikTok</a>
              </div>
            </>)}
          <p className="mt-auto pt-8 text-xs text-[var(--muted)]">Filmed in the shop · {v.words.shopName}</p>
        </div>
      </div>
    </div>
  )
}
