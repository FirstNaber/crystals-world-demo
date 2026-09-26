import { useState } from 'react'
import { BUSINESS } from '../content'
import { Img } from '../Img'

/**
 * A TikTok post from the shop's own account, referenced, not copied.
 * Shows a lightweight poster; TikTok's official player (and its cookies) only load when the visitor presses play.
 */
export function TikTokCard({ id, poster, title, className = '' }: { id: string; poster: string; title: string; className?: string }) {
  const [play, setPlay] = useState(false)
  const url = `${BUSINESS.social.tiktok}/video/${id}`
  return (
    <figure className={`relative overflow-hidden bg-black ${className}`} style={{ aspectRatio: '9 / 16' }}>
      {play ? (
        <iframe title={`TikTok video: ${title}`} src={`https://www.tiktok.com/embed/v2/${id}`} className="absolute inset-0 h-full w-full border-0" allow="fullscreen; autoplay; encrypted-media" allowFullScreen />
      ) : (
        <>
          <Img name={poster} alt="" sizes="300px" className="absolute inset-0 h-full w-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          <button onClick={() => setPlay(true)} className="absolute inset-0 grid place-items-center text-white" aria-label={`Play video: ${title}`}>
            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/70 bg-black/30 backdrop-blur-sm transition-transform duration-300 hover:scale-110">▶</span>
          </button>
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-white">
            <span className="block text-sm leading-tight">{title}</span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/70">{BUSINESS.social.instagramHandle} · TikTok</span>
          </figcaption>
        </>)}
      <a href={url} target="_blank" rel="noopener noreferrer" className="absolute right-2 top-2 rounded-full bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white">Open<span className="sr-only"> {title} on TikTok</span> ↗</a>
    </figure>
  )
}
