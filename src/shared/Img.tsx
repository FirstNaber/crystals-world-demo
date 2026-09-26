import { IMAGES } from './content'

const base = import.meta.env.BASE_URL

/**
 * Responsive image: AVIF with JPEG fallback, correct intrinsic size (no layout shift), lazy by default.
 * `name` is an entry in images.json; owner-added photos (data:/https URLs) render as a plain <img>.
 */
export function Img({ name, alt, sizes = '100vw', className = '', priority = false, style }: {
  name: string; alt: string; sizes?: string; className?: string; priority?: boolean; style?: React.CSSProperties
}) {
  if (/^(data:|https?:|blob:)/.test(name)) return <img src={name} alt={alt} className={className} style={style} loading={priority ? 'eager' : 'lazy'} decoding="async" />
  const m = IMAGES[name]
  if (!m) return <span role="img" aria-label={alt} className={`grid place-items-center bg-black/10 text-xs ${className}`}>[PLACEHOLDER: image]</span>
  const w = (x: number) => `${base}img/${name}-${x}`
  const srcset = (ext: string) => m.widths.map((x) => `${w(x)}.${ext} ${x}w`).join(', ')
  const largest = m.widths[m.widths.length - 1]
  const height = Math.round((m.h / m.w) * largest)
  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <img src={`${w(m.widths[0])}.jpg`} srcSet={srcset('jpg')} sizes={sizes} width={largest} height={height} alt={alt}
        className={className} style={style} loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : {})} />
    </picture>
  )
}

/** Aspect ratio of a catalog image (for placeholders / layout). */
export const ratio = (name: string) => { const m = IMAGES[name]; return m ? m.w / m.h : 0.7 }
