import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { SITE, img } from '../site'
import { Button, Stars } from './ui'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, reduce ? 1.02 : 1.14])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const rise = (d: number) => ({
    initial: reduce ? false : { y: '110%' },
    animate: { y: 0 },
    transition: { duration: 1.4, ease: EASE, delay: 0.9 + d },
  })

  return (
    <section ref={ref} id="top" className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory">
      {/* photograph */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.img
          src={img('hero-fluorite')}
          alt="Amber fluorite crystals, lit from within"
          className="h-full w-full object-cover object-[68%_50%] md:object-[center_55%]"
          style={{ scale }}
          initial={reduce ? false : { opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.3 }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,14,12,.9)_0%,rgba(15,14,12,.55)_45%,rgba(15,14,12,.1)_75%)] md:bg-[linear-gradient(90deg,rgba(15,14,12,.88)_0%,rgba(15,14,12,.45)_42%,rgba(15,14,12,0)_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent md:h-1/2 md:via-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />

      <motion.div style={{ opacity: fade }} className="container-x relative z-10 flex flex-1 flex-col justify-end pb-12 pt-36 md:justify-center md:pb-24">
        <motion.p
          className="eyebrow mb-8 flex items-center gap-4 text-ivory/70"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
        >
          <span className="h-px w-10 bg-brass" /> Austin, Texas · 3202 Guadalupe St
        </motion.p>

        <h1 className="display max-w-[11ch] text-[clamp(3.4rem,9.5vw,9.5rem)]">
          <span className="block overflow-hidden"><motion.span className="block" {...rise(0)}>Discover</motion.span></span>
          <span className="block overflow-hidden"><motion.span className="block" {...rise(0.1)}>something</motion.span></span>
          <span className="block overflow-hidden pb-[0.1em]"><motion.span className="block italic text-bone" {...rise(0.2)}>extraordinary.</motion.span></span>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
        >
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory/75 md:text-base">
            Crystals, minerals, jewelry, and one-of-a-kind pieces from around the world — right in the heart of Austin.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#visit">Visit Crystals World</Button>
            <Button href="#collection" variant="outline">Explore the Collection</Button>
          </div>
        </motion.div>
      </motion.div>

      {/* bottom rail */}
      <motion.div
        className="container-x relative z-10 flex items-center justify-between border-t border-ivory/15 py-5 text-ivory/70"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.9 }}
      >
        <a href={SITE.googleProfile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[12px] tracking-[0.12em] hover:text-ivory">
          <Stars className="text-brass" /> <span><b className="font-medium text-ivory">{SITE.rating}</b> · {SITE.reviews} Google reviews</span>
        </a>
        <span className="hidden text-[12px] tracking-[0.12em] sm:block">{SITE.type} · In-store pickup</span>
        <span className="eyebrow hidden items-center gap-3 md:flex">Scroll <span className="h-8 w-px animate-pulse bg-ivory/40" /></span>
      </motion.div>
    </section>
  )
}
