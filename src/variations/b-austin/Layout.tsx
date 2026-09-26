import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BUSINESS } from '../../shared/content'
import { useStore } from '../../shared/store'
import { useTo } from '../../shared/variation'
import { SignLogo } from '../../shared/SignLogo'
import { CallLink, DemoBar, DirectionsLink, Signup } from '../../shared/ui/bits'

const NAV: [string, string][] = [['Shop all', 'shop'], ['Crystals', 'shop?cat=crystals'], ['Minerals', 'shop?cat=minerals'], ['Jewelry', 'shop?cat=jewelry'], ['The Wall', 'wall'], ['Visit', 'visit']]

export function Layout({ children }: { children: ReactNode }) {
  const { count, setOpen } = useStore(); const to = useTo(); const { pathname } = useLocation()
  const [menu, setMenu] = useState(false)
  useEffect(() => setMenu(false), [pathname])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <DemoBar />
      {/* location is always visible */}
      <div className="vb-topstrip">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 px-4 py-2 sm:px-8">
          <p className="font-medium"><span aria-hidden>📍</span> {BUSINESS.address.street}, Austin · <span className="vx-muted">free in-store pickup</span></p>
          <p className="flex gap-5 font-semibold"><CallLink where="b_topstrip" className="vx-link">Call {BUSINESS.phone}</CallLink><DirectionsLink where="b_topstrip" className="vx-link">Directions</DirectionsLink></p>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b vx-line bg-[var(--bg)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-8">
          <Link to={to()} className="py-3" aria-label="Crystals World, home"><SignLogo className="w-[168px] sm:w-[196px]" /></Link>
          <nav aria-label="Primary" className="vb-nav hidden gap-7 lg:flex">
            {NAV.map(([label, path]) => <NavLink key={label} to={to(path)} end={!path.includes('?')} className="vx-link !no-underline">{label}</NavLink>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link to={to('visit')} className="vx-btn !min-h-11 !px-5 max-sm:hidden">Visit the shop</Link>
            <button className="vx-btn-ghost !min-h-11 !px-4" onClick={() => setOpen(true)} aria-label={`Cart (${count}), ${count} ${count === 1 ? 'item' : 'items'}`}>Cart ({count})</button>
            <button className="vx-btn-ghost !min-h-11 !px-4 lg:hidden" aria-expanded={menu} aria-controls="b-menu" onClick={() => setMenu((m) => !m)}>{menu ? 'Close' : 'Menu'}</button>
          </div>
        </div>
        {menu && (
          <nav id="b-menu" aria-label="Mobile" className="border-t vx-line bg-[var(--bg)] lg:hidden">
            <ul className="mx-auto max-w-[1280px] px-4 py-2">
              {NAV.map(([label, path]) => <li key={label}><Link to={to(path)} className="vx-display flex min-h-14 items-center border-b vx-line text-2xl">{label}</Link></li>)}
              <li className="py-4"><Link to={to('visit')} className="vx-btn w-full">Visit the shop</Link></li>
            </ul>
          </nav>)}
      </header>
      <main id="main" tabIndex={-1} className="outline-none">{children}</main>
      <footer className="mt-24 bg-[#2b211a] text-[#efe4d0]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SignLogo className="w-[240px]" label="Crystals World" />
            <p className="mt-3 max-w-sm text-sm text-[#d7c9b1]">Crystals, minerals and jewelry on Guadalupe Street in Austin, Texas. Retail and wholesale. Shipped by USPS, UPS and DHL.</p>
            <Signup className="mt-8 [&_.vx-btn]:!bg-[#e7c89b] [&_.vx-btn]:!border-[#e7c89b] [&_.vx-btn]:!text-[#2b211a] [&_.vx-input]:!border-white/30 [&_.vx-input]:!text-white [&_.vx-muted]:!text-[#d7c9b1]" title="New arrivals, first." />
          </div>
          <div className="text-sm leading-7 md:col-span-3 md:col-start-7"><p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#b7a68a]">Visit</p>
            <DirectionsLink where="b_footer" className="block hover:underline">{BUSINESS.address.street}<br />Austin, TX {BUSINESS.address.postal}</DirectionsLink>
            <CallLink where="b_footer" className="block hover:underline">{BUSINESS.phone}</CallLink>
            <Link to={to('visit')} className="block underline">Hours &amp; map</Link></div>
          <div className="text-sm leading-7 md:col-span-3"><p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#b7a68a]">Shop &amp; help</p>
            <Link to={to('shop')} className="block hover:underline">Shop all</Link>
            {['shipping', 'returns', 'privacy', 'terms'].map((s) => <Link key={s} to={to(`policies/${s}`)} className="block capitalize hover:underline">{s}</Link>)}
            <p className="pt-2"><a className="underline" href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> · <a className="underline" href={BUSINESS.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a> · <a className="underline" href={BUSINESS.social.yelp} target="_blank" rel="noopener noreferrer">Yelp</a></p></div>
        </div>
      </footer>
    </>
  )
}
