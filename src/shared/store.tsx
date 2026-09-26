/**
 * Shop state shared by every variation: catalog (base + owner edits), cart, sold state, orders.
 * Everything persists in localStorage so the pitch demo behaves like a real store across pages.
 * In production this whole file is replaced by the commerce platform (see README → "Going live").
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { BASE_PRODUCTS, DEMO, type Product } from './content'
import { track } from './analytics'

export interface CartLine { slug: string; qty: number }
export interface Order {
  id: string
  createdAt: number
  lines: { slug: string; name: string; price: number; qty: number }[]
  fulfilment: 'ship' | 'pickup'
  contact: { name: string; email: string; phone?: string }
  address?: { line1: string; city: string; state: string; zip: string }
  subtotal: number
  shipping: number
  tax: number
  total: number
  giftNote?: string
}
interface Overrides { [slug: string]: { price?: number | null; sold?: boolean; stock?: number } }

const K = { cart: 'cw-cart-v2', soldQty: 'cw-sold-v2', owner: 'cw-owner-products-v1', overrides: 'cw-overrides-v1', orders: 'cw-orders-v1' }
const read = <T,>(k: string, fallback: T): T => { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fallback } catch { return fallback } }
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); return true } catch { return false } }

interface Store {
  products: Product[]
  bySlug: (slug: string) => Product | undefined
  left: (p: Product) => number
  isSold: (p: Product) => boolean
  // cart
  lines: CartLine[]
  add: (slug: string, qty?: number) => boolean
  setQty: (slug: string, qty: number) => void
  remove: (slug: string) => void
  clear: () => void
  count: number
  subtotal: number
  open: boolean
  setOpen: (o: boolean) => void
  lastAdded: string | null
  // orders
  placeOrder: (o: Omit<Order, 'id' | 'createdAt'>) => Order
  getOrder: (id: string) => Order | undefined
  // owner catalog
  ownerProducts: Product[]
  saveOwnerProduct: (p: Product) => boolean
  deleteOwnerProduct: (slug: string) => void
  setOverride: (slug: string, o: Overrides[string]) => void
  resetDemo: () => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => read(K.cart, []))
  const [soldQty, setSoldQty] = useState<Record<string, number>>(() => read(K.soldQty, {}))
  const [ownerProducts, setOwnerProducts] = useState<Product[]>(() => read(K.owner, []))
  const [overrides, setOverrides] = useState<Overrides>(() => read(K.overrides, {}))
  const [open, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState<string | null>(null)

  useEffect(() => { write(K.cart, lines) }, [lines])
  useEffect(() => { write(K.soldQty, soldQty) }, [soldQty])
  useEffect(() => { write(K.overrides, overrides) }, [overrides])
  // keep every open tab in sync (owner catalog in one tab, shop in another)
  useEffect(() => {
    const on = (e: StorageEvent) => {
      if (e.key === K.owner) setOwnerProducts(read(K.owner, []))
      if (e.key === K.overrides) setOverrides(read(K.overrides, {}))
      if (e.key === K.soldQty) setSoldQty(read(K.soldQty, {}))
    }
    addEventListener('storage', on); return () => removeEventListener('storage', on)
  }, [])

  const products = useMemo(() => {
    const merged = [...ownerProducts, ...BASE_PRODUCTS.filter((b) => !ownerProducts.some((o) => o.slug === b.slug))]
    return merged.map((p) => ({ ...p, ...(overrides[p.slug] ?? {}) }))
  }, [ownerProducts, overrides])

  const bySlug = useCallback((slug: string) => products.find((p) => p.slug === slug), [products])
  const left = useCallback((p: Product) => (p.sold ? 0 : Math.max(0, p.stock - (soldQty[p.slug] ?? 0))), [soldQty])
  const isSold = useCallback((p: Product) => left(p) < 1, [left])
  const cap = useCallback((p: Product) => (p.one_of_a_kind ? Math.min(1, left(p)) : left(p)), [left])

  const add = useCallback((slug: string, qty = 1) => {
    const p = products.find((x) => x.slug === slug)
    if (!p || cap(p) < 1 || p.price == null) return false
    setLines((ls) => {
      const cur = ls.find((l) => l.slug === slug)
      const next = Math.min((cur?.qty ?? 0) + qty, cap(p))
      return cur ? ls.map((l) => (l.slug === slug ? { ...l, qty: next } : l)) : [...ls, { slug, qty: Math.min(qty, cap(p)) }]
    })
    setLastAdded(slug); setOpen(true)
    track('add_to_cart', { item_id: p.no, item_name: p.name, price: p.price, category: p.category })
    return true
  }, [products, cap])

  const setQty = useCallback((slug: string, qty: number) => {
    const p = products.find((x) => x.slug === slug); if (!p) return
    setLines((ls) => ls.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, Math.min(qty, cap(p))) } : l)))
  }, [products, cap])

  // drop cart lines that became unavailable (sold elsewhere, deleted by owner)
  useEffect(() => {
    setLines((ls) => {
      const next = ls.filter((l) => { const p = products.find((x) => x.slug === l.slug); return p && !isSold(p) && p.price != null })
      return next.length === ls.length ? ls : next
    })
  }, [products, isSold])

  const priceOf = (slug: string) => products.find((p) => p.slug === slug)?.price ?? 0
  const subtotal = lines.reduce((n, l) => n + priceOf(l.slug) * l.qty, 0)

  const placeOrder: Store['placeOrder'] = (o) => {
    const order: Order = { ...o, id: `CW-${Date.now().toString(36).toUpperCase().slice(-6)}`, createdAt: Date.now() }
    const orders = read<Order[]>(K.orders, []); write(K.orders, [order, ...orders].slice(0, 20))
    // one-of-a-kind pieces sell once; multiples reduce stock
    setSoldQty((s) => { const n = { ...s }; o.lines.forEach((l) => { n[l.slug] = (n[l.slug] ?? 0) + l.qty }); return n })
    setLines([])
    track('purchase_demo', { transaction_id: order.id, value: order.total, fulfilment: order.fulfilment })
    return order
  }
  const getOrder = (id: string) => read<Order[]>(K.orders, []).find((o) => o.id === id)

  const saveOwnerProduct = (p: Product) => {
    const next = [p, ...ownerProducts.filter((x) => x.slug !== p.slug)]
    const ok = write(K.owner, next)
    if (ok) { setOwnerProducts(next); track('owner_publish', { item_id: p.no }) }
    return ok
  }
  const deleteOwnerProduct = (slug: string) => { const next = ownerProducts.filter((x) => x.slug !== slug); write(K.owner, next); setOwnerProducts(next) }
  const setOverride = (slug: string, o: Overrides[string]) => setOverrides((cur) => ({ ...cur, [slug]: { ...(cur[slug] ?? {}), ...o } }))
  const resetDemo = () => { Object.values(K).forEach((k) => localStorage.removeItem(k)); setLines([]); setSoldQty({}); setOwnerProducts([]); setOverrides({}) }

  const value: Store = {
    products, bySlug, left, isSold, lines, add, setQty, remove: (slug) => setLines((ls) => ls.filter((l) => l.slug !== slug)),
    clear: () => setLines([]), count: lines.reduce((n, l) => n + l.qty, 0), subtotal, open, setOpen, lastAdded,
    placeOrder, getOrder, ownerProducts, saveOwnerProduct, deleteOwnerProduct, setOverride, resetDemo,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useStore must be used inside <StoreProvider>')
  return c
}

/** Totals for checkout. Shipping + Texas sales tax are demo estimates; the platform computes real ones. */
export function totals(subtotal: number, fulfilment: 'ship' | 'pickup') {
  const shipping = fulfilment === 'pickup' || subtotal === 0 ? 0 : DEMO.freeShippingOver && subtotal >= DEMO.freeShippingOver ? 0 : DEMO.shippingFlat
  // In Texas, delivery charges on taxable items are taxable too.
  const tax = Math.round((subtotal + shipping) * DEMO.taxRate * 100) / 100
  return { shipping, tax, total: Math.round((subtotal + shipping + tax) * 100) / 100 }
}
