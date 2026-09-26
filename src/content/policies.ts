/**
 * PLACEHOLDER POLICY TEXT — the owner must review and confirm every line before launch.
 * Written in plain language so it can be edited without a developer. Not legal advice.
 */
export interface Policy { slug: string; title: string; intro: string; sections: { h: string; p: string[] }[] }

export const POLICIES: Policy[] = [
  {
    slug: 'shipping', title: 'Shipping & packaging',
    intro: 'Crystals and minerals are fragile. Every order is packed by hand as if it were going to a museum.',
    sections: [
      { h: 'How we pack', p: ['Each piece is wrapped individually, then double-boxed with padding on every side.', 'Points, druzy and thin edges get extra protection. Stands ship separately wrapped.'] },
      { h: 'Carriers', p: ['We ship with USPS, UPS and DHL, within the US and worldwide (as listed on the shop’s social media).'] },
      { h: 'Rates & timing', p: ['[PLACEHOLDER: shipping rates by weight/zone and any free-shipping threshold]', '[PLACEHOLDER: handling time, e.g. ships within X business days]'] },
      { h: 'If something arrives damaged', p: ['Keep all packaging and photograph the box and the piece before unwrapping further, then contact us within [PLACEHOLDER: X] days.', '[PLACEHOLDER: insurance / replacement policy]'] },
      { h: 'Pick up instead', p: ['Pickup at 3202 Guadalupe St Ste C, Austin, is always free. Choose “Pick up in store” at checkout.'] },
    ],
  },
  {
    slug: 'returns', title: 'Returns',
    intro: '[PLACEHOLDER: owner to confirm the returns policy]',
    sections: [
      { h: 'Return window', p: ['[PLACEHOLDER: e.g. unused items may be returned within X days of delivery or pickup]'] },
      { h: 'One-of-a-kind pieces', p: ['[PLACEHOLDER: are specimens final sale? store credit only?]'] },
      { h: 'How to return', p: ['Returns can be brought to the shop or shipped back. [PLACEHOLDER: who pays return shipping]'] },
      { h: 'Refunds', p: ['[PLACEHOLDER: refund method and timing]'] },
    ],
  },
  {
    slug: 'privacy', title: 'Privacy',
    intro: '[PLACEHOLDER: owner to confirm] This summary describes what a live version of this site would collect.',
    sections: [
      { h: 'What we collect', p: ['Order details you give us at checkout (name, email, phone, shipping address) and newsletter sign-ups.', 'Payments are processed by our payment provider [PLACEHOLDER: Shopify / Stripe]; we never see or store your full card number.'] },
      { h: 'Analytics', p: ['We measure visits and actions such as “get directions” and “add to cart” to improve the site. [PLACEHOLDER: analytics provider]'] },
      { h: 'Your choices', p: ['Unsubscribe from emails at any time. Ask us to delete your data by contacting [PLACEHOLDER: contact email].'] },
    ],
  },
  {
    slug: 'terms', title: 'Terms',
    intro: '[PLACEHOLDER: owner to confirm]',
    sections: [
      { h: 'Products', p: ['Natural stones vary. Colors and sizes can differ slightly from photos. One-of-a-kind pieces are exactly the piece photographed.', 'Stones are sold as decorative and collectible items. Nothing on this site is medical advice.'] },
      { h: 'Prices & tax', p: ['Prices are in US dollars. Texas sales tax is calculated at checkout based on the delivery or pickup address.'] },
      { h: 'Availability', p: ['Pieces sell in the shop and online. If an item sells in person before your online order is processed, we will refund you in full. [PLACEHOLDER: confirm]'] },
      { h: 'Contact', p: ['Crystals World, 3202 Guadalupe St Ste C, Austin, TX 78705 · (737) 320-8079 · [PLACEHOLDER: contact email]'] },
    ],
  },
]
