/**
 * PITCH DEMO checkout: a realistic flow with no payment processing and no network calls.
 * Production: replace the "Place order" handler with the platform's hosted checkout
 * (Shopify Checkout or Stripe Checkout), which also handles real Texas sales tax.
 */
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ADDRESS_LINE, BUSINESS, DEMO, money } from '../content'
import { track } from '../analytics'
import { Img } from '../Img'
import { totals, useStore } from '../store'
import { useSeo } from '../seo'
import { useTo, useVariation } from '../variation'
import { Ph } from './bits'

type Errors = Partial<Record<string, string>>

export function Checkout() {
  const { lines, bySlug, subtotal, placeOrder } = useStore()
  const v = useVariation(); const to = useTo(); const nav = useNavigate()
  const [fulfilment, setFulfilment] = useState<'pickup' | 'ship'>('pickup')
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const started = useRef(false)
  const t = totals(subtotal, fulfilment)
  useSeo({ title: `Checkout — ${BUSINESS.name}`, description: 'Checkout' })

  useEffect(() => {
    if (!started.current && lines.length) { started.current = true; track('begin_checkout', { value: subtotal, items: lines.length }) }
  }, [lines.length, subtotal])

  if (lines.length === 0) return (
    <section className="vx-page grid min-h-[60vh] place-items-center text-center">
      <div><h1 className="vx-display text-4xl">Nothing to check out yet.</h1>
        <Link to={to(v.shop)} className="vx-btn mt-6">Browse {v.words.shopName.toLowerCase()}</Link></div>
    </section>)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const err: Errors = {}
    if (!f.name?.trim()) err.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email ?? '')) err.email = 'Please enter a valid email.'
    if (fulfilment === 'ship') {
      if (!f.line1?.trim()) err.line1 = 'Street address is required for shipping.'
      if (!f.city?.trim()) err.city = 'City is required.'
      if (!/^\d{5}(-\d{4})?$/.test(f.zip ?? '')) err.zip = 'Enter a 5-digit ZIP code.'
    }
    setErrors(err)
    if (Object.keys(err).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(err)[0]}"]`); first?.focus(); return
    }
    setBusy(true)
    setTimeout(() => { // simulate the payment platform round-trip
      const order = placeOrder({
        lines: lines.map((l) => { const p = bySlug(l.slug)!; return { slug: p.slug, name: p.name, price: p.price ?? 0, qty: l.qty } }),
        fulfilment, contact: { name: f.name, email: f.email, phone: f.phone || undefined },
        address: fulfilment === 'ship' ? { line1: f.line1, city: f.city, state: f.state || 'TX', zip: f.zip } : undefined,
        subtotal, shipping: t.shipping, tax: t.tax, total: t.total, giftNote: f.gift || undefined,
      })
      nav(to(`order/${order.id}`))
    }, 900)
  }

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block text-sm">
      <span className="vx-label">{label}{props.required === false ? <span className="vx-muted"> (optional)</span> : null}</span>
      <input name={name} className="vx-input mt-1 w-full" aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} {...props} required={undefined} />
      {errors[name] && <span id={`${name}-err`} className="vx-error mt-1 block text-xs" role="alert">{errors[name]}</span>}
    </label>
  )

  return (
    <section className="vx-page">
      <h1 className="vx-display text-4xl sm:text-5xl">Checkout</h1>
      <p className="vx-note mt-4">Demo checkout: no card is charged and nothing you type leaves this browser.</p>
      <form className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]" onSubmit={submit} noValidate>
        <div className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="vx-step">1 · Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {field('name', 'Full name', { autoComplete: 'name' })}
              {field('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
              {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', required: false })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="vx-step">2 · How would you like it?</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2" role="radiogroup">
              {([
                ['pickup', 'Pick up in store', `Free · ${BUSINESS.address.street}, Austin. We’ll email you when it’s ready.`],
                ['ship', 'Ship to me', `${money(DEMO.shippingFlat)} flat (placeholder rate). Double-boxed and padded; carriers USPS, UPS or DHL.`],
              ] as const).map(([id, title, desc]) => (
                <label key={id} className={`vx-option ${fulfilment === id ? 'is-on' : ''}`}>
                  <input type="radio" name="fulfilment" value={id} checked={fulfilment === id} onChange={() => setFulfilment(id)} className="mt-1" />
                  <span><span className="block font-medium">{title}</span><span className="vx-muted block text-xs">{desc}</span></span>
                </label>))}
            </div>
            {fulfilment === 'ship' ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-6">
                <div className="sm:col-span-6">{field('line1', 'Street address', { autoComplete: 'address-line1' })}</div>
                <div className="sm:col-span-3">{field('city', 'City', { autoComplete: 'address-level2' })}</div>
                <div className="sm:col-span-1">{field('state', 'State', { autoComplete: 'address-level1', defaultValue: 'TX', maxLength: 2 })}</div>
                <div className="sm:col-span-2">{field('zip', 'ZIP', { autoComplete: 'postal-code', inputMode: 'numeric' })}</div>
              </div>
            ) : (
              <p className="vx-muted mt-4 text-sm">Pickup at {ADDRESS_LINE}. Hours: <Ph>full weekly hours</Ph>. Bring your order number.</p>)}
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="vx-step">3 · Payment</legend>
            <div className="vx-surface space-y-3 p-4 text-sm">
              <p className="font-medium">Card payment (demo)</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="sm:col-span-2 block"><span className="vx-label">Card number</span><input className="vx-input mt-1 w-full" value="4242 4242 4242 4242" readOnly aria-readonly /></label>
                <label className="block"><span className="vx-label">Expiry</span><input className="vx-input mt-1 w-full" value="12 / 34" readOnly aria-readonly /></label>
              </div>
              <p className="vx-muted text-xs">In the live store this is Shopify or Stripe’s secure checkout (cards, Apple Pay, Google Pay).</p>
            </div>
            <label className="block text-sm"><span className="vx-label">Gift note <span className="vx-muted">(optional)</span></span>
              <textarea name="gift" rows={2} maxLength={200} className="vx-input mt-1 w-full" placeholder="A short message to include" /></label>
          </fieldset>
        </div>

        <aside className="vx-surface h-fit space-y-4 p-6 lg:sticky lg:top-24" aria-label="Order summary">
          <h2 className="vx-display text-2xl">Order summary</h2>
          <ul className="space-y-3">
            {lines.map((l) => { const p = bySlug(l.slug)!; return (
              <li key={l.slug} className="flex items-center gap-3 text-sm">
                <span className="block h-14 w-12 shrink-0 overflow-hidden"><Img name={p.images[0]} alt="" sizes="48px" className="h-full w-full object-cover" /></span>
                <span className="flex-1">{p.name}{l.qty > 1 ? ` × ${l.qty}` : ''}</span><span>{money((p.price ?? 0) * l.qty)}</span>
              </li>) })}
          </ul>
          <dl className="space-y-1 border-t vx-line pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>{fulfilment === 'pickup' ? 'Pickup' : 'Shipping'}</dt><dd>{t.shipping ? money(t.shipping) : 'Free'}</dd></div>
            <div className="flex justify-between"><dt>Est. Texas sales tax (8.25%)</dt><dd>{money(t.tax)}</dd></div>
            <div className="flex justify-between border-t vx-line pt-2 text-base font-medium"><dt>Total</dt><dd>{money(t.total)}</dd></div>
          </dl>
          <p className="vx-muted text-xs">Sample prices. Real Texas sales tax is calculated by the payment platform at checkout.</p>
          <button className="vx-btn w-full" type="submit" disabled={busy} aria-busy={busy}>{busy ? 'Placing order…' : `Place order · ${money(t.total)}`}</button>
          <p className="vx-muted text-center text-xs">By ordering you agree to the <Link className="underline" to={to('policies/terms')}>terms</Link> and <Link className="underline" to={to('policies/returns')}>returns policy</Link>.</p>
        </aside>
      </form>
    </section>
  )
}

export function Confirmation({ id }: { id: string }) {
  const { getOrder } = useStore()
  const v = useVariation(); const to = useTo()
  const o = getOrder(id)
  useSeo({ title: `Order ${id} — ${BUSINESS.name}`, description: 'Order confirmation' })
  if (!o) return <section className="vx-page text-center"><h1 className="vx-display text-4xl">Order not found.</h1><Link to={to()} className="vx-btn mt-6">Home</Link></section>
  return (
    <section className="vx-page max-w-3xl">
      <p className="vx-eyebrow">Order {o.id}</p>
      <h1 className="vx-display mt-3 text-4xl sm:text-6xl">Thank you, {o.contact.name.split(' ')[0]}.</h1>
      <p className="mt-6 text-lg">{o.fulfilment === 'pickup'
        ? `Your ${o.lines.length > 1 ? 'pieces are' : 'piece is'} set aside at the shop. We’ll email ${o.contact.email} when ${o.lines.length > 1 ? 'they’re' : 'it’s'} ready for pickup at ${BUSINESS.address.street}.`
        : `We’ll pack your order carefully and email tracking to ${o.contact.email}.`}</p>
      <p className="vx-note mt-6">Demo order: no payment was taken and nothing was sent. One-of-a-kind pieces in this order now show as sold across the demo.</p>
      <dl className="vx-surface mt-8 space-y-2 p-6 text-sm">
        {o.lines.map((l) => <div key={l.slug} className="flex justify-between"><dt>{l.name}{l.qty > 1 ? ` × ${l.qty}` : ''}</dt><dd>{money(l.price * l.qty)}</dd></div>)}
        <div className="flex justify-between border-t vx-line pt-2"><dt>{o.fulfilment === 'pickup' ? 'Pickup' : 'Shipping'}</dt><dd>{o.shipping ? money(o.shipping) : 'Free'}</dd></div>
        <div className="flex justify-between"><dt>Est. tax</dt><dd>{money(o.tax)}</dd></div>
        <div className="flex justify-between text-base font-medium"><dt>Total</dt><dd>{money(o.total)}</dd></div>
      </dl>
      <div className="mt-8 flex flex-wrap gap-3"><Link to={to(v.shop)} className="vx-btn">Keep browsing</Link><Link to={to('visit')} className="vx-btn-ghost">Plan your visit</Link></div>
    </section>
  )
}
