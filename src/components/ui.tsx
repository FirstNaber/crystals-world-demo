import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Fade + rise on scroll. */
export function Reveal({ children, delay = 0, className = '', y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Headline that rises line by line from behind a mask. Pass lines as an array. */
export function Lines({ lines, className = '', delay = 0, as: Tag = 'h2' }: { lines: ReactNode[]; className?: string; delay?: number; as?: 'h1' | 'h2' | 'h3' | 'p' }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: '105%' }}
            animate={inView ? { y: 0 } : undefined}
            transition={{ duration: 1.25, ease: EASE, delay: delay + i * 0.09 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Image revealed by a mask that opens upward, with a slow settle-in zoom. */
export function Photo({ src, alt, className = '', imgClassName = '', position = 'center' }: { src: string; alt: string; className?: string; imgClassName?: string; position?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`relative overflow-hidden bg-charcoal ${className}`}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{ objectPosition: position }}
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 2.2, ease: EASE }}
      />
    </motion.div>
  )
}

/** Pill button; the fill sweeps up on hover. */
export function Button({ href, children, variant = 'solid', tone = 'light', external = false, className = '' }: {
  href: string; children: ReactNode; variant?: 'solid' | 'outline'; tone?: 'light' | 'dark'; external?: boolean; className?: string
}) {
  const onDark = tone === 'light'
  const base = 'group relative inline-flex whitespace-nowrap items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-500'
  const solid = onDark ? 'bg-ivory text-ink' : 'bg-ink text-ivory'
  const outline = onDark ? 'border border-ivory/35 text-ivory hover:text-ink' : 'border border-ink/25 text-ink hover:text-ivory'
  const sweep = variant === 'solid' ? (onDark ? 'bg-brass' : 'bg-brass') : onDark ? 'bg-ivory' : 'bg-ink'
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`${base} ${variant === 'solid' ? solid : outline} ${className}`}>
      <span aria-hidden className={`absolute inset-0 translate-y-full rounded-full ${sweep} transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0`} />
      <span className="relative">{children}</span>
      <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
    </a>
  )
}

export function Stars({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-[1em] w-[1em] fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </span>
  )
}
