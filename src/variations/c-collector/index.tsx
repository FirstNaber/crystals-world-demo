/**
 * VARIATION C — THE COLLECTOR
 * Luxury jewelry house × fashion editorial × mineral catalogue. Oversized type is part of the composition,
 * images move sideways, UI is minimal, and the collection index IS the shop (hover/tap → name, catalogue no., price → collect).
 * Type: DM Serif Display (display) + Archivo (labels).
 */
import { VariationShell } from '../../shared/Shell'
import type { Variation } from '../../shared/variation'
import { Layout } from './Layout'
import { Home } from './Home'
import { CollectionPage } from './CollectionPage'
import { ProductPage } from './ProductPage'
import './collector.css'

export const V_C: Variation = {
  id: 'c', name: 'The Collector', base: '/variation-c-collector', shop: 'collection', theme: 'v-c', themeColor: '#0b0b0a',
  fonts: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Archivo:wght@400;500;600&display=swap',
  words: { bag: 'Bag', add: 'Collect', addShort: 'Collect', checkout: 'Checkout', shopName: 'The Collection', soldOut: 'Collected' },
}

export default function Collector() {
  return <VariationShell v={V_C} Layout={Layout} Home={Home} Shop={CollectionPage} Product={ProductPage} />
}
