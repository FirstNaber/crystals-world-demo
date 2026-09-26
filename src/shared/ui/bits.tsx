/** Small shared pieces. They are themed by the variation's CSS variables (see index.css → .vx-*). */
import { useState, type ReactNode } from 'react'
import { BUSINESS, TEL_HREF, money, type Product } from '../content'
import { track } from '../analytics'
import { useStore } from '../store'
import { useVariation } from '../variation'

/** Visible placeholder for facts the owner still has to supply. */
export const Ph = ({ children }: { children: ReactNode }) => <span className="vx-ph">[PLACEHOLDER: {children}]</span>

export function DirectionsLink({ children, className = '', where = '' }: { children: ReactNode; className?: string; where?: string }) {
  return <a href={BUSINESS.google.directionsUrl} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track('get_directions', { where })}>{children}</a>
}
export function CallLink({ children, className = '', where = '' }: { children: ReactNode; className?: string; where?: string }) {
  return <a href={TEL_HREF} className={className} onClick={() => track('call', { where })}>{children}</a>
}

/** Price with an honest "sample" marker (prices are placeholders until the owner supplies real ones). */
export function Price({ p, className = '', mark = true }: { p: Product; className?: string; mark?: boolean }) {
  if (p.price == null) return <Ph>price</Ph>
  return <span className={className}>{money(p.price)}{mark && <span className="vx-sample" title="Sample price for the demo">sample</span>}</span>
}

/** Add-to-bag button that knows about sold / one-of-a-kind / unpriced states. */
export function AddButton({ p, className = 'vx-btn', label }: { p: Product; className?: string; label?: string }) {
  const { add, isSold, lines } = useStore()
  const v = useVariation()
  const sold = isSold(p)
  const inBag = lines.some((l) => l.slug === p.slug)
  if (sold) return <button className={className} disabled aria-disabled>{v.words.soldOut}</button>
  if (p.price == null) return <button className={className} disabled>Price on request</button>
  if (inBag && p.one_of_a_kind) return <button className={className} onClick={() => add(p.slug)} aria-label={`${p.name} is in your ${v.words.bag.toLowerCase()}`}>In your {v.words.bag.toLowerCase()} ✓</button>
  return <button className={className} onClick={() => add(p.slug)}>{label ?? v.words.add}</button>
}

export function Availability({ p, className = '' }: { p: Product; className?: string }) {
  const { isSold, left } = useStore()
  if (isSold(p)) return <span className={className}>Sold{p.one_of_a_kind ? ' — this piece has found a home' : ''}</span>
  if (p.one_of_a_kind) return <span className={className}>One of a kind · only 1</span>
  return <span className={className}>{left(p)} available</span>
}

/** "New arrivals" signup. Front end only in the pitch demo: nothing is sent. */
export function Signup({ className = '', title = 'New arrivals, first.', note = 'One short email when new pieces land. No spam.' }: { className?: string; title?: string; note?: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle')
  return (
    <div className={className}>
      <p className="vx-display text-2xl">{title}</p>
      <p className="vx-muted mt-1 text-sm">{note}</p>
      {state === 'done' ? <p className="mt-4 text-sm font-medium" role="status">You’re on the list. (Demo: no email was sent.)</p> : (
        <form className="mt-4 flex flex-col gap-2 sm:flex-row" noValidate onSubmit={(e) => {
          e.preventDefault()
          const email = new FormData(e.currentTarget).get('email') as string
          if (!/^\S+@\S+\.\S+$/.test(email)) return setState('error')
          setState('done'); track('sign_up', { method: 'newsletter' })
        }}>
          <label className="sr-only" htmlFor="signup-email">Email address</label>
          <input id="signup-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="vx-input flex-1" aria-invalid={state === 'error'} aria-describedby={state === 'error' ? 'signup-err' : undefined} />
          <button className="vx-btn" type="submit">Sign up</button>
        </form>)}
      {state === 'error' && <p id="signup-err" className="mt-2 text-sm" role="alert">Please enter a valid email address.</p>}
    </div>
  )
}

/** Weekly hours: only a 10 PM closing time is known, so the table is an explicit placeholder. */
export function Hours({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      {BUSINESS.hours ? null : (
        <>
          <p><Ph>full weekly hours</Ph></p>
          <p className="vx-muted mt-1 text-sm">{BUSINESS.hoursNote}</p>
        </>)}
    </div>
  )
}

export function MapEmbed({ className = '' }: { className?: string }) {
  return <iframe title={`Map to ${BUSINESS.name}, ${BUSINESS.address.street}, Austin`} src={BUSINESS.google.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={`block w-full border-0 ${className}`} />
}

/** Thin, honest demo bar shown at the top of every variation. */
export function DemoBar() {
  return <div className="vx-demobar">Concept demo for {BUSINESS.name} · sample prices · no real payments</div>
}
