import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { useSeo } from '../../shared/seo'
import { useTo } from '../../shared/variation'
import { CallLink, DirectionsLink, Hours, MapEmbed } from '../../shared/ui/bits'
import { SignLogo } from '../../shared/SignLogo'
import { CollectionIndex } from './CollectionIndex'

const WORDS = ['Crystals', 'Minerals', 'Jewelry', 'Austin', 'One of a kind']

export function Home() {
  const to = useTo(); const { products, isSold } = useStore()
  const strip = useRef<HTMLUListElement>(null)
  const works = products.filter((p) => !isSold(p)).slice(0, 12)
  const index = products.filter((p) => p.featured || isSold(p)).slice(0, 9)
  const nudge = (dir: 1 | -1) => strip.current?.scrollBy({ left: dir * Math.min(720, innerWidth * 0.8), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  useSeo({ title: 'Crystals World — Austin, Texas | Crystals, Minerals & Jewelry', description: `A collection of crystals, minerals and jewelry at ${BUSINESS.address.street}, Austin. Collect online or in person.` })
  return (
    <>
      {/* opening: enormous specimen, type as composition */}
      <section className="relative overflow-hidden" aria-labelledby="open-h" style={{ minHeight: 'calc(100svh - 96px)' }}>
        <div className="absolute inset-0" data-parallax="0.08">
          <Img name="amethyst-slab" alt="A tall amethyst cluster standing before a blurred mountain landscape" priority sizes="100vw" className="h-full w-full object-cover object-[50%_40%] opacity-90" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/85" />
        <div className="relative mx-auto flex max-w-[1600px] flex-col justify-end px-4 pb-8 pt-16 sm:px-8" style={{ minHeight: 'calc(100svh - 96px)' }}>
          <p className="vc-cat mb-4 !text-[#ece6d9]">Austin, Texas — 3202 Guadalupe St</p>
          <h1 id="open-h" className="max-w-[1400px]">
            <span data-rv="line" className="block"><span className="block">
              <SignLogo label="Crystals World" className="w-full text-[#8d55ff]" style={{ filter: 'drop-shadow(.35vw .45vw 0 #1a0b3a) drop-shadow(0 0 2.2vw rgba(236,255,150,.3))' }} />
            </span></span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-white/25 pt-5">
            <p className="max-w-sm text-sm text-[#d9d3c6]">A collection of crystals, minerals and jewelry. Collect it in person on Guadalupe Street, or online.</p>
            <div className="flex flex-wrap gap-3"><Link to={to('collection')} className="vx-btn">Enter the collection</Link><Link to={to('visit')} className="vx-btn-ghost">Visit</Link></div>
          </div>
        </div>
      </section>

      {/* sideways type */}
      <div className="overflow-hidden border-y vx-line py-5" aria-hidden>
        <div className="vc-marquee vc-mega text-[clamp(3rem,10vw,9rem)]">
          {[0, 1].map((k) => <span key={k} className="flex shrink-0 items-center gap-[4vw] pr-[4vw]">{WORDS.map((w, i) => <span key={w} className={i % 2 ? 'vc-outline' : ''}>{w} <span className="text-[.4em] align-middle">◆</span></span>)}</span>)}
        </div>
      </div>

      {/* horizontal gallery */}
      <section className="pt-20" aria-labelledby="works-h">
        <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between gap-4 px-4 sm:px-8">
          <h2 id="works-h" className="vc-mega text-[clamp(2.4rem,7vw,6rem)]">New<br />plates</h2>
          <div className="flex gap-2"><button className="vx-btn-ghost !min-h-11 !px-4" onClick={() => nudge(-1)} aria-label="Scroll works left">←</button><button className="vx-btn-ghost !min-h-11 !px-4" onClick={() => nudge(1)} aria-label="Scroll works right">→</button></div>
        </div>
        <ul ref={strip} className="vc-strip" tabIndex={0} aria-label="New plates, scroll sideways">
          {works.map((p, i) => (
            <li key={p.slug} className={i % 2 ? 'mt-16 w-[62vw] sm:w-[36vw] lg:w-[26vw]' : 'w-[70vw] sm:w-[40vw] lg:w-[30vw]'}>
              <Link to={to(`collection/${p.slug}`)} className="group block">
                <div className="overflow-hidden"><Img name={p.images[0]} alt={`${p.name}: ${p.description}`} sizes="(min-width:1024px) 30vw, 70vw" className={`w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04] ${i % 2 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`} /></div>
                <p className="vc-cat mt-3">{p.no} — {p.category}</p>
                <p className="vx-display text-2xl leading-none">{p.name}</p>
              </Link>
            </li>))}
          <li className="grid w-[50vw] place-items-center sm:w-[24vw]"><Link to={to('collection')} className="vc-mega text-4xl underline underline-offset-8">All<br />works →</Link></li>
        </ul>
      </section>

      {/* the collection IS the shop */}
      <section className="mx-auto max-w-[1600px] px-4 pt-28 sm:px-8" aria-labelledby="index-h">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-t vx-line pt-6">
          <h2 id="index-h" className="vc-mega text-[clamp(2.6rem,8vw,7rem)]">The<br />Collection</h2>
          <p className="vc-cat max-w-[16rem]">Hover or tap a specimen for its number and price. Collect it here.</p>
        </div>
        <CollectionIndex items={index} />
        <p className="mt-8"><Link to={to('collection')} className="vx-btn-ghost">All {products.length} entries</Link></p>
      </section>

      {/* reviews as composition */}
      <section className="mx-auto max-w-[1600px] px-4 py-28 sm:px-8" aria-label="Visitors">
        <p className="vc-cat">Google · {BUSINESS.google.rating.toFixed(1)} from {BUSINESS.google.reviewCount}</p>
        <div className="mt-6 space-y-10">
          {BUSINESS.reviews.map((r, i) => (
            <blockquote key={r.text} className={i === 1 ? 'md:pl-[20vw]' : i === 2 ? 'md:pl-[8vw]' : ''}>
              <p className="vx-display max-w-5xl text-[clamp(1.8rem,4.6vw,4.4rem)] leading-[1.02] normal-case italic" data-rv="up" style={{ textTransform: 'none' }}>“{r.text}”</p>
            </blockquote>))}
        </div>
      </section>

      {/* visit */}
      <section className="border-t vx-line" aria-labelledby="visit-h">
        <div className="mx-auto max-w-[1600px] px-4 pb-16 pt-14 sm:px-8">
          <p className="vc-cat">Visit</p>
          <h2 id="visit-h" className="vc-mega mt-4 text-[clamp(3rem,12vw,12rem)]">3202<br />Guadalupe</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-4">
              <address className="not-italic text-lg">{BUSINESS.address.street}<br />Austin, Texas {BUSINESS.address.postal}</address>
              <Hours className="text-sm" />
              <div className="flex flex-wrap gap-3"><DirectionsLink where="c_home_visit" className="vx-btn">Directions</DirectionsLink><CallLink where="c_home_visit" className="vx-btn-ghost">{BUSINESS.phone}</CallLink></div>
            </div>
            <div className="lg:col-span-8"><MapEmbed className="aspect-[16/9] grayscale invert-[.92] contrast-[.9]" /></div>
          </div>
        </div>
      </section>
    </>
  )
}
