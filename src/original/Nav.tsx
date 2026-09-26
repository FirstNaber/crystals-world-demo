import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { SITE } from './site'

const LINKS = [
  { href: '#collection', label: 'Explore' },
  { href: '#experience', label: 'About' },
  { href: '#visit', label: 'Visit' },
  { href: '#reviews', label: 'Reviews' },
]

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-baseline gap-2 ${className}`}>
      <span className="font-serif text-[22px] font-medium uppercase leading-none tracking-[0.2em]">Crystals</span>
      <span className="font-serif text-[22px] font-light italic leading-none tracking-[0.04em]">World</span>
    </span>
  )
}

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight * 0.75)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : '' }, [open])

  const dark = solid || open
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,padding] duration-700 ${
          dark ? 'border-b border-ink/10 bg-ivory/85 py-3 text-ink backdrop-blur-xl' : 'border-b border-transparent py-6 text-ivory'
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <a href="#top" aria-label={`${SITE.name}, back to top`}><Logo /></a>
          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="group relative text-[12px] font-medium uppercase tracking-[0.22em]">
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
            <a href="#visit" className={`rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${dark ? 'bg-ink text-ivory hover:bg-brass hover:text-ink' : 'bg-ivory text-ink hover:bg-brass'}`}>
              Visit Us
            </a>
          </nav>
          <button
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`h-px w-6 bg-current transition-transform duration-500 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-current transition-transform duration-500 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ivory px-6 pb-10 pt-28 text-ink md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-ink/10 py-5 font-serif text-5xl font-light"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.label}
                  <span className="eyebrow text-stone">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto space-y-4">
              <p className="text-sm text-taupe">{SITE.street}<br />{SITE.city}</p>
              <div className="flex gap-3">
                <a href={SITE.directions} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-full bg-ink py-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-ivory">Directions</a>
                <a href={SITE.tel} className="flex-1 rounded-full border border-ink/25 py-4 text-center text-[11px] font-medium uppercase tracking-[0.2em]">Call</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
