/**
 * Per-page <title>, description, Open Graph/Twitter tags and JSON-LD.
 * scripts/prerender.mjs writes the same tags into static HTML for every route at build time,
 * so crawlers and link previews get them without running JavaScript.
 */
import { useEffect } from 'react'
import { ADDRESS_LINE, BUSINESS, type Product } from './content'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://firstnaber.github.io' // set VITE_SITE_URL per deploy

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
  el.content = value
}

export function useSeo({ title, description, image, jsonLd }: { title: string; description: string; image?: string; jsonLd?: object | object[] }) {
  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', SITE_URL + location.pathname)
    setMeta('property', 'og:image', image ?? `${SITE_URL}${import.meta.env.BASE_URL}og.jpg`)
    setMeta('name', 'twitter:card', 'summary_large_image')
    document.head.querySelectorAll('script[data-seo]').forEach((s) => s.remove())
    for (const data of [localBusinessLd(), ...(jsonLd ? ([] as object[]).concat(jsonLd) : [])]) {
      const s = document.createElement('script'); s.type = 'application/ld+json'; s.dataset.seo = '1'
      s.textContent = JSON.stringify(data); document.head.appendChild(s)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, JSON.stringify(jsonLd ?? null)])
}

/** Note: no aggregateRating — Google does not allow self-published review stars on a business's own site. */
export function localBusinessLd() {
  return {
    '@context': 'https://schema.org', '@type': 'Store', name: BUSINESS.name, description: `${BUSINESS.type} in Austin, Texas. Crystals, minerals and jewelry.`,
    telephone: BUSINESS.phoneE164, url: SITE_URL + import.meta.env.BASE_URL,
    image: `${SITE_URL}${import.meta.env.BASE_URL}og.jpg`,
    address: { '@type': 'PostalAddress', streetAddress: BUSINESS.address.street, addressLocality: BUSINESS.address.city, addressRegion: BUSINESS.address.region, postalCode: BUSINESS.address.postal, addressCountry: 'US' },
    hasMap: BUSINESS.google.profileUrl,
    sameAs: Object.entries(BUSINESS.social).filter(([k]) => !k.endsWith('Handle')).map(([, v]) => v),
    // openingHoursSpecification: [PLACEHOLDER: add once weekly hours are confirmed]
    areaServed: ADDRESS_LINE,
  }
}

export function productLd(p: Product, available: boolean, imageUrl: string) {
  return {
    '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.no, description: p.description,
    image: [imageUrl], category: p.category, material: p.material ?? undefined, brand: { '@type': 'Brand', name: BUSINESS.name },
    offers: p.price == null ? undefined : {
      '@type': 'Offer', price: p.price, priceCurrency: 'USD', itemCondition: 'https://schema.org/NewCondition',
      availability: available ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      availableDeliveryMethod: ['http://purl.org/goodrelations/v1#DeliveryModePickUp', 'http://purl.org/goodrelations/v1#DeliveryModeMail'],
    },
  }
}
