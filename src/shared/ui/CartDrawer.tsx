import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../content'
import { Img } from '../Img'
import { useStore } from '../store'
import { useTo, useVariation } from '../variation'

/** Slide-in bag. Focus is trapped while open and returned on close; Escape closes. */
export function CartDrawer() {
  const { open, setOpen, lines, bySlug, setQty, remove, subtotal, count } = useStore()
  const v = useVariation(); const to = useTo()
  const panel = useRef<HTMLDivElement>(null)
  const returnTo = useRef<Element | null>(null)

  useEffect(() => {
    if (!open) return
    returnTo.current = document.activeElement
    const el = panel.current; el?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && el) {
        const f = el.querySelectorAll<HTMLElement>('a,button,input,select,textarea,[tabindex="0"]')
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; (returnTo.current as HTMLElement | null)?.focus?.() }
  }, [open, setOpen])

  return (
    <div className={`vx-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="vx-drawer-scrim" onClick={() => setOpen(false)} />
      <div ref={panel} className="vx-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="bag-title" tabIndex={-1}>
        <header className="flex items-center justify-between border-b vx-line px-6 py-5">
          <h2 id="bag-title" className="vx-display text-2xl">{v.words.bag} <span className="vx-muted text-base">({count})</span></h2>
          <button className="vx-link text-sm" onClick={() => setOpen(false)}>Close</button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="vx-display text-2xl">Your {v.words.bag.toLowerCase()} is empty.</p>
                <p className="vx-muted mt-2 text-sm">Every larger piece is one of a kind. When it’s gone, it’s gone.</p>
                <Link to={to(v.shop)} onClick={() => setOpen(false)} className="vx-btn mt-6">Browse {v.words.shopName.toLowerCase()}</Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map((l) => {
                const p = bySlug(l.slug); if (!p) return null
                return (
                  <li key={l.slug} className="flex gap-4">
                    <Link to={to(`${v.shop}/${p.slug}`)} onClick={() => setOpen(false)} className="block h-24 w-20 shrink-0 overflow-hidden vx-surface">
                      <Img name={p.images[0]} alt="" sizes="80px" className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="vx-display text-lg leading-tight">{p.name}</p>
                      <p className="vx-muted text-xs">{p.no}{p.one_of_a_kind ? ' · one of a kind' : ''}</p>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        {!p.one_of_a_kind && (
                          <div className="flex items-center gap-2" role="group" aria-label={`Quantity of ${p.name}`}>
                            <button className="vx-qty" onClick={() => setQty(p.slug, l.qty - 1)} aria-label="Decrease quantity" disabled={l.qty <= 1}>−</button>
                            <span aria-live="polite" className="w-5 text-center">{l.qty}</span>
                            <button className="vx-qty" onClick={() => setQty(p.slug, l.qty + 1)} aria-label="Increase quantity">+</button>
                          </div>)}
                        <button className="vx-link ml-auto text-xs" onClick={() => remove(p.slug)}>Remove<span className="sr-only"> {p.name}</span></button>
                      </div>
                    </div>
                    <p className="text-sm">{money((p.price ?? 0) * l.qty)}</p>
                  </li>)
              })}
            </ul>)}
        </div>
        {lines.length > 0 && (
          <footer className="space-y-3 border-t vx-line px-6 py-5">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <p className="vx-muted text-xs">Free pickup at the shop on Guadalupe St, or careful shipping. Tax calculated at checkout.</p>
            <Link to={to('checkout')} onClick={() => setOpen(false)} className="vx-btn w-full">{v.words.checkout}</Link>
          </footer>)}
      </div>
    </div>
  )
}
