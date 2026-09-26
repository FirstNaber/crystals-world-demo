/**
 * Each variation provides a small config (base path, vocabulary, fonts, theme class).
 * Shared pages (cart, checkout, confirmation, visit, policies) read it, so plumbing is identical
 * while voice and styling follow the variation.
 */
import { createContext, useContext, useEffect } from 'react'

export interface Variation {
  id: 'a' | 'b' | 'c'
  name: string
  base: string // e.g. '/variation-a-gallery'
  shop: string // shop path segment: 'collection' | 'shop'
  theme: string // root class, defines CSS variables
  fonts: string // Google Fonts stylesheet URL
  themeColor: string
  words: {
    bag: string // "Bag" / "Cart"
    add: string // "Acquire" / "Add to cart" / "Collect"
    addShort: string
    checkout: string
    shopName: string // "The Collection" / "Shop"
    soldOut: string
  }
}

export const VariationCtx = createContext<Variation | null>(null)
export const useVariation = () => {
  const v = useContext(VariationCtx)
  if (!v) throw new Error('useVariation outside a variation')
  return v
}
/** Build a link inside the current variation. */
export const useTo = () => {
  const v = useVariation()
  return (path = '') => `${v.base}${path ? `/${path.replace(/^\//, '')}` : ''}`
}

const loaded = new Set<string>()
/** Load a variation's Google Fonts only when that variation is opened. */
export function useFonts(href: string) {
  useEffect(() => {
    if (loaded.has(href)) return
    loaded.add(href)
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href
    document.head.appendChild(l)
  }, [href])
}
