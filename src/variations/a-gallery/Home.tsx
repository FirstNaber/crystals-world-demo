import { Link } from 'react-router-dom'
import { BUSINESS, type Category } from '../../shared/content'
import { Img } from '../../shared/Img'
import { useStore } from '../../shared/store'
import { useSeo } from '../../shared/seo'
import { useTo } from '../../shared/variation'
import { CallLink, DirectionsLink, Hours, MapEmbed, Signup } from '../../shared/ui/bits'
import { ROOM, Work } from './parts'

function Interlude({ i }: { i: number }) {
  const r = BUSINESS.reviews[i]
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-28 sm:px-10 md:py-44" aria-label="From a visitor">
      <blockquote className={`max-w-5xl ${i % 2 ? 'md:ml-auto md:text-right' : ''}`}>
        <p className="ga-quote" data-rv="up">“{r.text}”</p>
        <footer className="ga-tiny mt-8" data-rv="fade">{r.source} · {BUSINESS.google.rating.toFixed(1)} from {BUSINESS.google.reviewCount} reviews</footer>
      </blockquote>
    </section>
  )
}

function Room({ cat, picks }: { cat: Category; picks: string[] }) {
  const { products } = useStore(); const to = useTo()
  const works = picks.map((s) => products.find((p) => p.slug === s)!).filter(Boolean)
  const count = products.filter((p) => p.category === cat).length
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-10" aria-labelledby={`room-${cat}`}>
      <header className="flex items-end justify-between gap-6 border-t border-[var(--line)] pt-6">
        <h2 id={`room-${cat}`} className="ga-serif text-[clamp(3rem,9vw,8.5rem)] leading-[.9]">
          <span className="ga-num mr-4 text-[var(--muted)]">{ROOM[cat].n}</span>{ROOM[cat].name}
        </h2>
        <Link to={to(`collection?room=${cat}`)} className="ga-acquire shrink-0">All {count} works</Link>
      </header>
      <div className="mt-16 space-y-24 md:space-y-36">
        {works.map((p, i) => (
          <div key={p.slug} className={i % 2 ? 'md:pl-[18%]' : 'md:pr-[6%]'}>
            <Work p={p} size={i === 0 ? 'l' : i === 1 ? 'm' : 's'} align={i % 2 ? 'right' : 'left'} />
          </div>))}
      </div>
    </section>
  )
}

export function Home() {
  const to = useTo()
  useSeo({ title: 'Crystals World — Crystal & Mineral Shop in Austin, TX', description: `Find something extraordinary: crystals, minerals and jewelry at ${BUSINESS.address.street}, Austin. Acquire one-of-a-kind pieces online, or visit.` })
  return (
    <>
      {/* ── Opening ── */}
      <section className="ga-open" aria-label="Opening">
        <div className="ga-open-img" data-parallax="0.05">
          <Img name="amethyst-tower" alt="An upright amethyst cluster, deep purple points catching the light" priority sizes="(min-width:768px) 56vw, 100vw" className="h-full w-full object-cover object-[60%_45%]" />
        </div>
        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-24 pt-40 sm:px-10 md:pb-14">
          <p className="ga-tiny ga-fade-in mb-6 !text-[#bdb8ae]">An exhibition of crystals, minerals &amp; jewelry — Austin, Texas</p>
          <h1 className="ga-serif text-[clamp(3.6rem,11.5vw,12rem)] uppercase leading-[.86] tracking-[-0.02em]">
            <span className="ga-open-line"><span>Find</span></span>
            <span className="ga-open-line"><span>something</span></span>
            <span className="ga-open-line"><span className="italic normal-case">extraordinary.</span></span>
          </h1>
          <div className="ga-fade-in mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md ga-mono text-[12px] leading-relaxed tracking-[0.04em] text-[#d9d5cc]">
              On view and for sale at {BUSINESS.address.street}, Austin — and here, one piece at a time. {BUSINESS.google.rating.toFixed(1)} ★ from {BUSINESS.google.reviewCount} Google reviews.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to={to('collection')} className="ga-acquire !text-[#efece4]">Enter the collection</Link>
              <Link to={to('visit')} className="ga-acquire !text-[#efece4]">Visit the shop</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prologue ── */}
      <section id="prologue" className="mx-auto grid max-w-[1440px] gap-10 px-5 py-28 sm:px-10 md:grid-cols-12 md:py-44">
        <p className="ga-tiny md:col-span-3">Prologue</p>
        <div className="md:col-span-8 md:col-start-5">
          <p className="ga-serif text-[clamp(2rem,4.2vw,3.8rem)] leading-[1.08]" data-rv="up">
            Crystals, minerals and jewelry, chosen one piece at a time. Most are <em>one of a kind</em>: when a piece is acquired, it leaves the wall for good.
          </p>
          <p className="ga-label mt-8 max-w-xl" data-rv="up">Every work in this exhibition is in the shop on Guadalupe Street. Acquire it here and collect it in person at no cost, or have it packed and shipped.</p>
        </div>
      </section>

      <Room cat="crystals" picks={['citrine-druzy-heart', 'lapis-lazuli-freeform', 'pistachio-calcite-heart']} />
      <Interlude i={0} />
      <Room cat="minerals" picks={['amethyst-cluster-slab', 'amethyst-crescent-cluster', 'epidote-quartz-specimen']} />
      <Interlude i={2} />
      <Room cat="jewelry" picks={['lapis-lazuli-triple-strand', 'jade-pendant', 'garnet-earrings']} />
      <Interlude i={1} />

      {/* ── Final chapter: Visit ── */}
      <section className="bg-[#0e0e0d] text-[#efece4]" aria-labelledby="visit-h">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-10 md:grid-cols-12 md:py-36">
          <div className="md:col-span-5">
            <p className="ga-tiny !text-[#bdb8ae]">Final chapter</p>
            <h2 id="visit-h" className="mt-6 ga-serif text-[clamp(3rem,7vw,6.5rem)] leading-[.92]" data-rv="up">See it in person.</h2>
            <address className="mt-10 ga-serif text-3xl not-italic leading-tight">{BUSINESS.address.street}<br />Austin, Texas {BUSINESS.address.postal}</address>
            <div className="mt-8 flex flex-wrap gap-3">
              <DirectionsLink where="a_home_visit" className="vx-btn !border-[#efece4] !bg-[#efece4] !text-[#0e0e0d]">Get directions</DirectionsLink>
              <CallLink where="a_home_visit" className="vx-btn-ghost !border-white/40 !text-[#efece4]">Call {BUSINESS.phone}</CallLink>
            </div>
            <div className="mt-10 ga-mono text-[12px] leading-relaxed text-[#d9d5cc] [&_.vx-muted]:!text-[#bdb8ae] [&_.vx-ph]:!text-[#d9d5cc]">
              <p className="ga-tiny !text-[#bdb8ae]">Hours</p><Hours className="mt-2" />
              <p className="ga-tiny mt-6 !text-[#bdb8ae]">Collect in person</p>
              <p className="mt-2">Acquire online and choose “Pick up in store” at checkout. Free.</p>
            </div>
          </div>
          <div className="space-y-5 md:col-span-7">
            <div className="overflow-hidden" data-rv="mask"><Img name="storefront-night" alt="The Crystals World storefront on Guadalupe Street at night, its purple neon sign lit" sizes="(min-width:768px) 58vw, 100vw" className="aspect-[16/11] w-full object-cover" /></div>
            <MapEmbed className="aspect-[16/9] grayscale-[.6]" />
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-10">
          <Signup className="max-w-xl [&_.vx-btn]:!border-[#efece4] [&_.vx-btn]:!bg-[#efece4] [&_.vx-btn]:!text-[#0e0e0d] [&_.vx-input]:!border-white/30 [&_.vx-input]:!text-[#efece4] [&_.vx-muted]:!text-[#bdb8ae]" title="Be first to see new works." note="One short email when new pieces arrive. No spam." />
        </div>
      </section>
    </>
  )
}
