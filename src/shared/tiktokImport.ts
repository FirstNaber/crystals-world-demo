/**
 * Turn one of the shop's TikTok posts into a draft catalog entry.
 * Uses TikTok's public oEmbed endpoint (no login, CORS-open): caption, cover image and video id.
 * Captions follow the shop's own pattern — "<piece name> <emoji> Available for sale 🤷‍♂️ Crystals world Retail & wholesale…" —
 * so the name is everything before that standard signature. Prices are never in captions; the owner adds them.
 * Live store: short share links (vm.tiktok.com, tiktok.com/t/…) need a small server function to resolve, and the
 * cover image should be copied to the store's own media at import (TikTok's image links expire after ~2 days).
 */
import type { Category } from './content'

export interface TikTokDraft { id: string; url: string; name: string; origin: string | null; material: string | null; category: Category; caption: string; cover: string }

const LONG = /tiktok\.com\/@[\w.-]+\/(?:video|photo)\/(\d{8,})/i
const SHORT = /(?:vm|vt)\.tiktok\.com\/|tiktok\.com\/t\//i

export function tiktokId(url: string) { return url.match(LONG)?.[1] ?? null }

const STONES = ['rose quartz', 'clear quartz', 'smoky quartz', 'lapis lazuli', 'tiger eye', "tiger's eye", 'herkimer diamond', 'amethyst', 'citrine', 'quartz', 'onyx', 'fluorite', 'calcite', 'pyrite', 'jade', 'garnet', 'aragonite', 'obsidian', 'labradorite', 'selenite', 'agate', 'malachite', 'moonstone', 'epidote', 'tourmaline', 'carnelian', 'aventurine', 'sodalite', 'rhodonite', 'opal', 'jasper', 'chrysocolla', 'celestite', 'kyanite']
const title = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase())

export function parseCaption(caption: string): Omit<TikTokDraft, 'id' | 'url' | 'cover'> {
  let head = caption.split(/crystals\s*world/i)[0]
  head = head.split(/available\s+for\s+sale/i)[0]
  const name = head
    .replace(/#\S+/g, '')
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[\s,.;:–—-]+$/, '')
  const origin = name.match(/\bfrom\s+([A-Z][\p{L}]+(?:\s+[A-Z][\p{L}]+)?)/u)?.[1] ?? null
  const lower = name.toLowerCase()
  const stone = STONES.find((s) => lower.includes(s))
  const category: Category = /necklace|pendant|earring|bracelet|\bring\b|beads?\b|jewel/.test(lower) ? 'jewelry'
    : /specimen|geode|\braw\b|rough|tower|point\b/.test(lower) ? 'minerals' : 'crystals'
  return { name: name.slice(0, 80), origin, material: stone ? title(stone) : null, category, caption }
}

/** Copy the (expiring) cover image into a local ≤1200px JPEG data URL. */
async function keepCover(src: string): Promise<string> {
  const blob = await (await fetch(src)).blob()
  const bmp = await createImageBitmap(blob)
  const s = Math.min(1, 1200 / Math.max(bmp.width, bmp.height))
  const c = document.createElement('canvas'); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s)
  c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height); bmp.close()
  return c.toDataURL('image/jpeg', 0.82)
}

export async function importTikTok(raw: string): Promise<TikTokDraft> {
  const url = raw.trim().split('?')[0]
  if (SHORT.test(url)) throw new Error('That’s a short share link. Open the video in your browser and copy the full address (it looks like tiktok.com/@crystals_world01/video/…).')
  const id = tiktokId(url)
  if (!id) throw new Error('That doesn’t look like a TikTok video link.')
  const r = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`)
  if (!r.ok) throw new Error('TikTok didn’t return that video. Check it’s public and try again.')
  const d = await r.json() as { title?: string; thumbnail_url?: string }
  if (!d.thumbnail_url) throw new Error('TikTok didn’t return a cover image for that video.')
  const cover = await keepCover(d.thumbnail_url)
  return { id, url, cover, ...parseCaption(d.title ?? '') }
}
