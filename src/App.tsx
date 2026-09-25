import Lenis from 'lenis'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Collection, Experience, Featured, FinalCta, Footer, Reputation, Reviews, Visit } from './components/sections'

export default function App() {
  const [curtain, setCurtain] = useState(true)

  // smooth scrolling + in-page anchor links
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -70 } })
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf) })
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  useEffect(() => { const t = setTimeout(() => setCurtain(false), 700); return () => clearTimeout(t) }, [])

  return (
    <>
      {/* opening curtain */}
      <AnimatePresence>
        {curtain && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-ivory"
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.span
              className="font-serif text-2xl font-light uppercase tracking-[0.4em] text-ink"
              initial={{ opacity: 0, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              Crystals World
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <Nav />
      <main>
        <Hero />
        <Collection />
        <Reputation />
        <Visit />
        <Experience />
        <Featured />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
