/**
 * VARIATION B — THE AUSTIN DESTINATION
 * Premium Austin boutique + lifestyle brand: warm, welcoming, commerce-first.
 * Flow: DISCOVER → EXPLORE → FIND YOUR PIECE → VISIT. Location and pickup are always one tap away.
 * Type: Fraunces (display) + Figtree (body).
 */
import { VariationShell } from '../../shared/Shell'
import type { Variation } from '../../shared/variation'
import { Layout } from './Layout'
import { Home } from './Home'
import { Shop } from './Shop'
import { ProductPage } from './ProductPage'
import './austin.css'

export const V_B: Variation = {
  id: 'b', name: 'The Austin Destination', base: '/variation-b-austin', shop: 'shop', theme: 'v-b', themeColor: '#f8f2e7',
  fonts: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Figtree:wght@400;500;600;700&display=swap',
  words: { bag: 'Cart', add: 'Add to cart', addShort: 'Add', checkout: 'Checkout', shopName: 'The Shop', soldOut: 'Sold' },
}

export default function Austin() {
  return <VariationShell v={V_B} Layout={Layout} Home={Home} Shop={Shop} Product={ProductPage} />
}
