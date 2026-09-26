// Builds responsive AVIF + JPEG variants from assets-src/ into public/img/ and writes src/content/images.json.
// Sources are small (≈500–1000 px), so larger widths are upscaled with Lanczos + light sharpening.
// Usage: node scripts/build-images.mjs   (needs ffmpeg with libsvtav1)
import { execFileSync } from 'node:child_process'
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'

const SRC = 'assets-src', OUT = 'public/img', MANIFEST = 'src/content/images.json'
mkdirSync(OUT, { recursive: true })
const probe = (f) => {
  const o = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f]).toString().trim()
  const [w, h] = o.split(',').map(Number); return { w, h }
}
const run = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { env: { ...process.env, SVT_LOG: '1' }, stdio: ['ignore', 'ignore', 'inherit'] })
const manifest = {}

function variants(name, file, crop) {
  const { w: sw, h: sh } = probe(file)
  const cw = crop ? Math.round(sw * crop) : sw, ch = crop ? Math.round(sh * crop) : sh
  const cropF = crop ? `crop=${cw}:${ch}:${Math.round((sw - cw) / 2)}:${Math.round((sh - ch) * 0.66)},` : ''
  const widths = [480, 960, 1440].filter((x) => x <= cw * 2.2)
  for (const w of widths) {
    const h = Math.round((ch / cw) * w / 2) * 2
    const up = w > cw
    const vf = `${cropF}scale=${w}:${h}:flags=lanczos${up ? ',unsharp=5:5:0.6:3:3:0.0' : ''}`
    const base = join(OUT, `${name}-${w}`)
    if (!existsSync(base + '.jpg')) run(['-i', file, '-vf', vf, '-q:v', '4', base + '.jpg'])
    if (!existsSync(base + '.avif')) run(['-i', file, '-vf', vf + ',format=yuv420p', '-frames:v', '1', '-c:v', 'libsvtav1', '-crf', '34', '-preset', '6', base + '.avif'])
  }
  manifest[name] = { w: cw, h: ch, widths }
}

for (const f of readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
  const name = basename(f).replace(/\.\w+$/, '').replace(/^[ps]-/, '')
  const file = join(SRC, f)
  variants(name, file)
  if (f.startsWith('p-')) variants(name + '-detail', file, 0.58) // tighter crop for product galleries
  process.stdout.write('.')
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1))
console.log(`\n${Object.keys(manifest).length} images`)
