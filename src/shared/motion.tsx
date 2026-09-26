/**
 * Motion without a library. Two tiny managers, mounted once per variation layout:
 *  - Reveal:   any element with [data-rv] gets .is-in when it enters the viewport (CSS does the animation).
 *  - Parallax: any element with [data-parallax="0.1"] shifts by transform as it crosses the viewport.
 * Both do nothing when the visitor prefers reduced motion (CSS also neutralises the transitions).
 * Only transform/opacity/clip-path change, so there is no layout work while scrolling.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const prefersReducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export function MotionManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    const reduce = prefersReducedMotion()
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    const scan = () => document.querySelectorAll('[data-rv]:not(.is-in)').forEach((el) => (reduce ? el.classList.add('is-in') : io.observe(el)))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    let items: HTMLElement[] = []
    let raf = 0
    const collect = () => { items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')) }
    const frame = () => {
      raf = 0
      const vh = innerHeight
      for (const el of items) {
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) continue
        const k = parseFloat(el.dataset.parallax || '0.1')
        const p = (r.top + r.height / 2 - vh / 2) / vh // -1 … 1 around centre
        el.style.transform = `translate3d(0, ${(-p * k * 100).toFixed(2)}px, 0)`
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame) }
    if (!reduce) {
      collect(); frame()
      addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll)
    }
    const mo2 = reduce ? null : new MutationObserver(() => { collect(); onScroll() })
    mo2?.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect(); mo2?.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [pathname])
  return null
}

/** Scroll to top on route change (keeps hash links working). */
export function ScrollTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) { document.getElementById(hash.slice(1))?.scrollIntoView(); return }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
