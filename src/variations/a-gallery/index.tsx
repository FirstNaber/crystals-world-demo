/**
 * VARIATION A — THE GALLERY
 * Contemporary art museum × luxury jewelry. The site is an exhibition in rooms; every specimen is a work
 * with a wall label, and buying is a quiet "Acquire". Reviews are pull-quotes between rooms; Visit is the final chapter.
 * Type: Instrument Serif (display) + Geist / Geist Mono (labels). No animation library: CSS + IntersectionObserver.
 */
import { VariationShell } from '../../shared/Shell'
import type { Variation } from '../../shared/variation'
import { Layout } from './Layout'
import { Home } from './Home'
import { Collection } from './Collection'
import { ObjectPage } from './ObjectPage'
import './gallery.css'

export const V_A: Variation = {
  id: 'a', name: 'The Gallery', base: '/variation-a-gallery', shop: 'collection', theme: 'v-a', themeColor: '#0e0e0d',
  fonts: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500&family=Geist+Mono:wght@400;500&display=swap',
  words: { bag: 'Bag', add: 'Acquire', addShort: 'Acquire', checkout: 'Proceed to checkout', shopName: 'The Collection', soldOut: 'Sold' },
}

export default function Gallery() {
  return <VariationShell v={V_A} Layout={Layout} Home={Home} Shop={Collection} Product={ObjectPage} />
}
