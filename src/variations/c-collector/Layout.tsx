import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../../shared/content'
import { useStore } from '../../shared/store'
import { useTo } from '../../shared/variation'
import { SignLogo } from '../../shared/SignLogo'
import { CallLink, DemoBar, DirectionsLink } from '../../shared/ui/bits'

export function Layout({ children }: { children: ReactNode }) {
  const { count, setOpen } = useStore(); const to = useTo()
  const item = 'inline-flex min-h-11 items-center text-[11px] font-medium uppercase tracking-[0.22em] hover:underline underline-offset-8'
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-[#ece6d9] focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      <DemoBar />
      <header className="sticky top-0 z-50 border-b vx-line bg-[var(--bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-8">
          <Link to={to()} className="py-3" aria-label="Crystals World, home"><SignLogo className="w-[104px] sm:w-[178px]" /></Link>
          <nav aria-label="Primary" className="flex items-center gap-3.5 sm:gap-9">
            <Link to={to('collection')} className={`${item} max-sm:hidden`}>Collection</Link>
            <Link to={to('wall')} className={item}><span className="max-sm:hidden">The </span>Wall</Link>
            <Link to={to('visit')} className={item}>Visit</Link>
            <button className={`${item} whitespace-nowrap`} onClick={() => setOpen(true)} aria-label={`Bag (${count}), ${count} ${count === 1 ? 'item' : 'items'}`}>Bag ({count})</button>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="outline-none">{children}</main>
      <footer className="border-t vx-line">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-12 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-7"><SignLogo className="w-full max-w-[760px]" label="Crystals World" /></div>
          <div className="vc-cat space-y-1 leading-6 md:col-span-3 md:col-start-9"><p className="mb-2">Visit</p>
            <DirectionsLink where="c_footer" className="block !text-[var(--fg)] hover:underline">{BUSINESS.address.street}<br />Austin, Texas {BUSINESS.address.postal}</DirectionsLink>
            <CallLink where="c_footer" className="block !text-[var(--fg)] hover:underline">{BUSINESS.phone}</CallLink></div>
          <div className="vc-cat space-y-1 leading-6 md:col-span-2"><p className="mb-2">Index</p>
            {['shipping', 'returns', 'privacy', 'terms'].map((s) => <Link key={s} to={to(`policies/${s}`)} className="block !text-[var(--fg)] hover:underline">{s}</Link>)}
            <a href={BUSINESS.social.instagram} className="block !text-[var(--fg)] hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={BUSINESS.social.tiktok} className="block !text-[var(--fg)] hover:underline" target="_blank" rel="noopener noreferrer">TikTok</a></div>
        </div>
      </footer>
    </>
  )
}
