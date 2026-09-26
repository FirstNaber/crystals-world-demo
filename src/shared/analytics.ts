/**
 * Analytics hooks. No IDs are configured: events go to window.dataLayer (GTM/GA4-compatible shape)
 * and, when localStorage.cwDebug = '1', to the console. Wire a real GA4/Plausible ID at launch.
 *
 * Events: get_directions · call · add_to_cart · begin_checkout · sign_up · purchase_demo · owner_publish
 */
type Props = Record<string, string | number | boolean | null | undefined>
declare global { interface Window { dataLayer?: unknown[] } }

export function track(event: string, props: Props = {}) {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...props, ts: Date.now() })
    if (import.meta.env.DEV || localStorage.getItem('cwDebug') === '1') console.info('[analytics]', event, props)
  } catch { /* never let analytics break the page */ }
}
