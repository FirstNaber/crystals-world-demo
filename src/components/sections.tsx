import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { SITE, img } from '../site'
import credits from '../credits.json'
import { Button, Lines, Photo, Reveal, Stars } from './ui'
import { Logo } from './Nav'

/* ──────────────────────────── 2 · THE COLLECTION ──────────────────────────── */

const CATEGORIES = [
  { name: 'Crystals', note: 'Clusters, points & geodes', src: 'amethyst-cathedral', alt: 'Two amethyst geodes lined with deep purple crystals', pos: '50% 45%', span: 'md:col-span-5 md:row-span-2 aspect-[4/5] md:aspect-auto' },
  { name: 'Minerals', note: 'Specimens with character', src: 'azurite', alt: 'A deep blue azurite mineral specimen', pos: '50% 50%', span: 'md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[440px]' },
  { name: 'Jewelry', note: 'Stones made to be worn', src: 'rock-crystal-necklace', alt: 'A clear rock crystal necklace on black', pos: '50% 50%', span: 'md:col-span-4 aspect-[4/5] md:aspect-auto md:h-[520px]' },
  { name: 'Collector Pieces', note: 'The ones worth a second look', src: 'emerald-matrix', alt: 'A green emerald crystal set in white matrix rock', pos: '50% 50%', span: 'md:col-span-3 aspect-[4/5] md:aspect-auto md:h-[520px]' },
]

export function Collection() {
  return (
    <section id="collection" className="relative bg-ivory py-28 md:py-40">
      <div className="container-x">
        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow mb-6 text-taupe">01 — The Collection</p></Reveal>
            <Lines className="display text-[clamp(2.8rem,6vw,5.6rem)]" lines={['Something for every', <em key="k" className="text-taupe">kind of collector.</em>]} />
          </div>
          <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
            <p className="max-w-sm text-[15px] leading-relaxed text-taupe">
              From everyday pieces to extraordinary specimens — a constantly changing selection sourced from around the world.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[auto_auto] md:gap-5">
          {CATEGORIES.map((c, i) => (
            <a key={c.name} href="#visit" className={`group relative block overflow-hidden ${c.span}`}>
              <Photo src={img(c.src)} alt={c.alt} position={c.pos} className="absolute inset-0 h-full w-full" imgClassName="transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-ivory md:p-8">
                <div>
                  <p className="eyebrow mb-3 text-ivory/60">0{i + 1}</p>
                  <h3 className="font-serif text-[clamp(2rem,3vw,2.8rem)] font-light leading-none">{c.name}</h3>
                  <p className="mt-3 max-h-0 overflow-hidden text-sm text-ivory/75 opacity-0 transition-all duration-700 group-hover:max-h-10 group-hover:opacity-100 max-md:max-h-10 max-md:opacity-100">{c.note}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ivory/40 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-ivory group-hover:bg-ivory group-hover:text-ink">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────── 3 · WHY PEOPLE COME BACK ──────────────────────────── */

const PILLARS = [
  { t: 'Beautiful selection', d: 'Range and quality are the first things visitors mention.' },
  { t: 'Knowledgeable service', d: 'An owner and staff who know their stones.' },
  { t: 'Welcoming atmosphere', d: 'Clean, organized, and easy to spend an afternoon in.' },
  { t: 'Fair prices', d: 'Pieces for a first visit and for a serious collection.' },
]

export function Reputation() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-28 text-ivory md:py-40">
      <div className="container-x relative z-[2] grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow mb-10 text-ivory/50">02 — Reputation</p>
          <div className="flex items-start gap-4">
            <span className="display text-[clamp(7rem,16vw,14rem)] leading-[0.8]">{SITE.rating}</span>
            <Stars className="mt-4 text-xl text-brass md:text-2xl" />
          </div>
          <p className="mt-6 text-sm tracking-[0.14em] text-ivory/60">From {SITE.reviews} Google reviews</p>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <Lines className="display text-[clamp(2.6rem,5vw,4.6rem)]" lines={['More than', <em key="k" className="text-bone">a place to shop.</em>]} />
          <Reveal delay={0.15}><p className="mt-8 max-w-md text-lg leading-relaxed text-ivory/70">Visitors come for the crystals. They come back for the experience.</p></Reveal>
        </div>
      </div>
      <div className="container-x relative z-[2] mt-20 grid grid-cols-1 border-t border-ivory/15 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.08} className="border-b border-ivory/15 py-8 sm:[&:nth-child(odd)]:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
            <p className="eyebrow mb-5 text-brass">0{i + 1}</p>
            <h3 className="font-serif text-3xl font-light">{p.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/55">{p.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────── 4 · AUSTIN DESTINATION ──────────────────────────── */

export function Visit() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])
  return (
    <section id="visit" ref={ref} className="relative bg-bone py-28 md:py-40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[6/5]">
            <motion.img src={img('quartz-points')} alt="Clear quartz crystal points" style={{ y }} className="absolute inset-[-10%] h-[120%] w-[120%] max-w-none object-cover" loading="lazy" />
          </div>
          {/* address plate */}
          <Reveal className="absolute -bottom-10 left-4 right-4 sm:left-auto sm:right-[-2rem] sm:w-[360px] lg:right-[-4rem]">
            <div className="bg-ink p-8 text-ivory shadow-2xl">
              <p className="eyebrow mb-6 text-brass">The store</p>
              <p className="font-serif text-3xl font-light leading-tight">{SITE.street}</p>
              <p className="font-serif text-3xl font-light italic leading-tight text-bone">{SITE.city}</p>
              <div className="my-6 h-px bg-ivory/15" />
              <a href={SITE.tel} className="block text-sm tracking-[0.12em] text-ivory/80 hover:text-brass">{SITE.phone}</a>
              <p className="mt-2 text-sm tracking-[0.12em] text-ivory/50">In-store pickup available</p>
            </div>
          </Reveal>
        </div>
        <div className="pt-12 lg:col-span-4 lg:col-start-9 lg:pt-0">
          <Reveal><p className="eyebrow mb-6 text-taupe">03 — Visit</p></Reveal>
          <Lines className="display text-[clamp(2.8rem,5.4vw,5rem)]" lines={['Find us in', 'the heart', <em key="k" className="text-taupe">of Austin.</em>]} />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-taupe">On Guadalupe Street. Come in, take your time, and see the collection in person.</p>
            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row lg:flex-col">
              <Button href={SITE.directions} external tone="dark">Get Directions</Button>
              <Button href={SITE.tel} variant="outline" tone="dark">Call the Store</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────── 5 · THE EXPERIENCE ──────────────────────────── */

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-ivory py-28 md:py-44">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow mb-6 text-taupe">04 — The Experience</p></Reveal>
            <Lines className="display text-[clamp(3rem,7vw,6.6rem)]" lines={['Take your time.', 'Explore.', <em key="k" className="text-taupe">Find the piece</em>, <em key="k2" className="text-taupe">that speaks to you.</em>]} />
          </div>
          <Reveal delay={0.2} className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="max-w-sm text-[15px] leading-relaxed text-taupe">Shelf after shelf of crystals, minerals and jewelry — arranged so browsing is easy, and something new catches your eye each visit.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-6 gap-4 md:mt-24 md:grid-cols-12 md:gap-5">
          <Photo src={img('mineral-gallery')} alt="Shelves of mineral specimens on display" className="col-span-6 aspect-[3/2] md:col-span-8 md:aspect-[16/10]" />
          <div className="col-span-6 grid grid-cols-2 gap-4 md:col-span-4 md:grid-cols-1 md:gap-5">
            <Photo src={img('agate')} alt="A banded agate, cut and polished" className="aspect-square md:aspect-[4/3]" />
            <Photo src={img('celestine')} alt="Pale blue celestine crystals" className="aspect-square md:aspect-[4/3]" />
          </div>
          <Photo src={img('malachite')} alt="Banded green malachite" className="col-span-3 aspect-[4/5] md:col-span-3 md:col-start-2 md:-mt-24" />
          <Photo src={img('rhodochrosite')} alt="Pink banded rhodochrosite" className="col-span-3 aspect-[4/5] md:col-span-3 md:mt-10" />
          <Reveal className="col-span-6 self-center md:col-span-4 md:col-start-9">
            <blockquote className="font-serif text-3xl font-light italic leading-snug md:text-4xl">“{SITE.quotes[2]}”</blockquote>
            <p className="eyebrow mt-5 text-taupe">Google review</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────── 6 · FEATURED PIECES ──────────────────────────── */

const PIECES = [
  { label: 'Amethyst', src: 'amethyst-cathedral', pos: '28% 50%', alt: 'Amethyst geode' },
  { label: 'Mineral Specimen', src: 'pyrite', pos: '50% 50%', alt: 'Gold pyrite cubes on matrix' },
  { label: 'Collector Piece', src: 'tourmaline', pos: '50% 40%', alt: 'Green tourmaline crystal with albite' },
  { label: 'Agate', src: 'blue-agate', pos: '50% 50%', alt: 'A polished blue agate slice' },
  { label: 'Crystal Cluster', src: 'amethyst', pos: '50% 50%', alt: 'Pale amethyst crystal cluster' },
  { label: 'Collector Piece', src: 'opal', pos: '50% 50%', alt: 'A polished boulder opal' },
]

export function Featured() {
  return (
    <section className="relative bg-bone py-28 md:py-40">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <Reveal><p className="eyebrow mb-6 text-taupe">05 — Featured</p></Reveal>
            <Lines className="display text-[clamp(2.8rem,6vw,5.6rem)]" lines={['Pieces worth', <em key="k" className="text-taupe">seeing in person.</em>]} />
          </div>
          <Reveal delay={0.15}><p className="max-w-xs text-sm leading-relaxed text-taupe">The selection changes constantly. Visit to see what’s on the shelves today.</p></Reveal>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-16">
          {PIECES.map((p, i) => (
            <Reveal key={p.src + i} delay={(i % 3) * 0.08} className={i % 3 === 1 ? 'md:mt-16' : ''}>
              <a href="#visit" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <img src={img(p.src)} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" style={{ objectPosition: p.pos }} />
                  <span className="absolute bottom-4 right-4 translate-y-3 rounded-full bg-ivory/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">See it in store</span>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-ink/15 pt-4">
                  <h3 className="font-serif text-2xl font-light md:text-3xl">{p.label}</h3>
                  <span className="eyebrow text-stone">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────── 7 · REVIEWS ──────────────────────────── */

export function Reviews() {
  return (
    <section id="reviews" className="relative bg-ivory py-28 md:py-44">
      <div className="container-x">
        <div className="grid gap-12 border-b border-ink/15 pb-16 md:grid-cols-12 md:items-end md:pb-24">
          <Reveal className="md:col-span-6">
            <p className="eyebrow mb-8 text-taupe">06 — Reviews</p>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
              <span className="display text-[clamp(7rem,15vw,13rem)] leading-[0.8]">{SITE.rating}</span>
              <Stars className="mb-4 text-3xl text-brass" />
            </div>
            <p className="mt-6 text-sm tracking-[0.14em] text-taupe">{SITE.reviews} Google reviews</p>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
            <p className="font-serif text-3xl font-light leading-snug md:text-4xl">A perfect score, across two hundred visits and counting.</p>
            <Button href={SITE.googleProfile} external tone="dark" variant="outline" className="mt-8">See What Visitors Are Saying</Button>
          </Reveal>
        </div>
        <div className="grid gap-14 pt-16 md:grid-cols-2 md:pt-24">
          {SITE.quotes.slice(0, 2).map((q, i) => (
            <Reveal key={q} delay={i * 0.12} className={i === 1 ? 'md:mt-24' : ''}>
              <span className="block font-serif text-7xl leading-none text-brass">“</span>
              <blockquote className="font-serif text-[clamp(2rem,3.4vw,3.2rem)] font-light italic leading-[1.15]">{q}</blockquote>
              <p className="eyebrow mt-6 flex items-center gap-3 text-taupe"><Stars className="text-brass" /> Google review</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────── 8 · FINAL CTA ──────────────────────────── */

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1])
  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-ivory">
      <motion.img src={img('naica-crystals')} alt="Giant gypsum crystal beams inside the Naica cave" style={{ scale }} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
      <div className="container-x relative z-[2] pb-20 pt-40 md:pb-28">
        <Lines className="display max-w-[15ch] text-[clamp(3rem,7.4vw,7.4rem)]" lines={['Come find something', 'you didn’t know', <em key="k" className="text-bone">you were looking for.</em>]} />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory/70">Visit Crystals World in Austin and explore the collection in person.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={SITE.directions} external>Get Directions</Button>
            <Button href={SITE.tel} variant="outline">Call {SITE.phone}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ──────────────────────────── FOOTER ──────────────────────────── */

export function Footer() {
  const [open, setOpen] = useState(false)
  return (
    <footer className="bg-ink text-ivory/60">
      <div className="container-x grid gap-12 border-t border-ivory/10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="text-ivory" />
          <p className="mt-4 text-sm">{SITE.type} · Austin, Texas</p>
        </div>
        <div className="text-sm leading-7 md:col-span-3">
          <p className="eyebrow mb-4 text-ivory/40">Visit</p>
          <a href={SITE.directions} target="_blank" rel="noopener noreferrer" className="block hover:text-ivory">{SITE.street}<br />{SITE.city}</a>
        </div>
        <div className="text-sm leading-7 md:col-span-4">
          <p className="eyebrow mb-4 text-ivory/40">Contact</p>
          <a href={SITE.tel} className="block hover:text-ivory">{SITE.phone}</a>
          <a href={SITE.googleProfile} target="_blank" rel="noopener noreferrer" className="block hover:text-ivory">Google reviews · {SITE.rating} ★</a>
        </div>
      </div>
      <div className="container-x flex flex-col gap-3 border-t border-ivory/10 py-6 text-[11px] tracking-[0.08em] text-ivory/40 md:flex-row md:justify-between">
        <span>Concept website demo prepared for {SITE.name}. Not the official site.</span>
        <button onClick={() => setOpen((o) => !o)} className="text-left hover:text-ivory/70" aria-expanded={open}>Photography credits {open ? '−' : '+'}</button>
      </div>
      {open && (
        <div className="container-x pb-10 text-[11px] leading-6 text-ivory/40">
          <p className="mb-2">Placeholder photography via Wikimedia Commons, to be replaced with the store’s own photos.</p>
          {credits.map((c) => (
            <p key={c.file}><a className="underline-offset-2 hover:underline" href={c.source} target="_blank" rel="noopener noreferrer">{c.title}</a> — {c.artist} · {c.license}</p>
          ))}
        </div>
      )}
    </footer>
  )
}
