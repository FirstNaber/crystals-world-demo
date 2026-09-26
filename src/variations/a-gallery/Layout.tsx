import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BUSINESS } from '../../shared/content'
import { useStore } from '../../shared/store'
import { useTo } from '../../shared/variation'
import { CallLink, DemoBar, DirectionsLink } from '../../shared/ui/bits'

/** Minimal gallery chrome: wordmark, "Visit", "Index" and "Bag". The index opens as a full-screen room list. */
export function Layout({ children }: { children: ReactNode }) {
  const { count, setOpen } = useStore(); const to = useTo()
  const { pathname } = useLocation()
  const isHome = /variation-a-gallery\/?$/.test(pathname)
  const [past, setPast] = useState(!isHome)
  const [index, setIndex] = useState(false)
  const indexBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isHome) { setPast(true); return }
    const on = () => setPast(scrollY > innerHeight * 0.85)
    on(); addEventListener('scroll', on, { passive: true }); return () => removeEventListener('scroll', on)
  }, [isHome])
  useEffect(() => { setIndex(false) }, [pathname])
  useEffect(() => {
    if (!index) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { setIndex(false); indexBtn.current?.focus() } }
    addEventListener('keydown', k); document.documentElement.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.documentElement.style.overflow = '' }
  }, [index])

  const dark = !past && isHome
  const item = 'min-h-11 items-center ga-mono text-[11px] uppercase tracking-[0.22em]'
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      <DemoBar />
      <header className={`${isHome ? 'fixed inset-x-0 top-[30px]' : 'sticky top-0'} z-50 transition-colors duration-500 ${dark ? 'text-[#efece4]' : 'border-b border-[var(--line)] bg-[var(--bg)]/95 text-[var(--fg)] backdrop-blur-sm'} ${isHome && past ? '!top-0' : ''}`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-2 sm:px-10">
          <Link to={to()} className="ga-serif whitespace-nowrap text-[22px] leading-none tracking-tight" aria-label="Crystals World, home">Crystals World</Link>
          <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-8">
            <Link to={to('visit')} className={`${item} hidden lg:inline-flex`}>Visit · 3202 Guadalupe</Link>
            <Link to={to('collection')} className={`${item} hidden md:inline-flex`}>Collection</Link>
            <button ref={indexBtn} className={`${item} inline-flex`} aria-expanded={index} aria-controls="ga-index" onClick={() => setIndex(true)}>Index</button>
            <button className={`${item} inline-flex`} onClick={() => setOpen(true)} aria-label={`Bag (${count}), ${count} ${count === 1 ? 'item' : 'items'}`}>Bag ({count})</button>
          </nav>
        </div>
      </header>

      <div id="ga-index" className={`ga-index ${index ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Index" inert={!index}>
        <div className="mx-auto flex min-h-full max-w-[1440px] flex-col px-5 pb-10 pt-6 sm:px-10">
          <div className="flex justify-between"><span className="ga-tiny !text-[#bdb8ae]">Index</span><button className="ga-tiny !text-[#efece4] min-h-11" onClick={() => { setIndex(false); indexBtn.current?.focus() }}>Close</button></div>
          <ol className="mt-10 space-y-2">
            {[
              ['Prologue', to() + '#prologue'], ['Room I — Crystals', to('collection') + '?room=crystals'], ['Room II — Minerals', to('collection') + '?room=minerals'],
              ['Room III — Jewelry', to('collection') + '?room=jewelry'], ['The complete collection', to('collection')], ['Final chapter — Visit', to('visit')],
            ].map(([t, href], i) => (
              <li key={t}><Link to={href} className="flex items-baseline gap-5 py-1"><span className="ga-tiny w-8 !text-[#8d887e]">{String(i).padStart(2, '0')}</span><span className="ga-index-t ga-serif text-[clamp(2.2rem,6vw,4.6rem)] leading-[1.02]">{t}</span></Link></li>))}
          </ol>
          <div className="mt-auto grid gap-2 pt-12 ga-mono text-[11px] tracking-[0.12em] text-[#bdb8ae] sm:grid-cols-3">
            <p>{BUSINESS.address.street}<br />Austin, Texas {BUSINESS.address.postal}</p>
            <p><CallLink where="a_index" className="underline">{BUSINESS.phone}</CallLink><br /><DirectionsLink where="a_index" className="underline">Directions</DirectionsLink></p>
            <p><a className="underline" href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> · <a className="underline" href={BUSINESS.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></p>
          </div>
        </div>
      </div>

      <main id="main" tabIndex={-1} className="outline-none">{children}</main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="ga-serif text-4xl">Crystals World</p>
            <p className="ga-label mt-3 max-w-sm">{BUSINESS.type}. Crystals, minerals and jewelry at {BUSINESS.address.street}, Austin, Texas. Retail and wholesale.</p>
          </div>
          <div className="ga-label space-y-1">
            <p className="ga-tiny mb-3">Visit</p>
            <p><DirectionsLink where="a_footer" className="underline">{BUSINESS.address.street}</DirectionsLink></p>
            <p><CallLink where="a_footer" className="underline">{BUSINESS.phone}</CallLink></p>
            <p><Link className="underline" to={to('visit')}>Hours &amp; map</Link></p>
          </div>
          <div className="ga-label space-y-1">
            <p className="ga-tiny mb-3">Colophon</p>
            {['shipping', 'returns', 'privacy', 'terms'].map((s) => <p key={s}><Link className="inline-block py-2 underline capitalize" to={to(`policies/${s}`)}>{s}</Link></p>)}
            <p className="pt-2">Photographs: the shop’s own.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
