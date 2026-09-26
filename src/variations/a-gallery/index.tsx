import { VariationShell } from '../../shared/Shell'
import type { Variation } from '../../shared/variation'
import { StubLayout, StubShop, StubProduct } from '../_stub'

const v: Variation = {
  id: 'a', name: 'The Gallery', base: '/variation-a-gallery', shop: 'collection', theme: 'v-a', themeColor: '#111111',
  fonts: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
  words: { bag: 'Bag', add: 'Add to bag', addShort: 'Add', checkout: 'Checkout', shopName: 'Shop', soldOut: 'Sold' },
}
export default function Variation() {
  return <VariationShell v={v} Layout={StubLayout} Home={StubShop} Shop={StubShop} Product={StubProduct} />
}
