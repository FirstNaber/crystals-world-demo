import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const VARIANTS = [
  { path: '/original', label: 'Original' },
  { path: '/variation-a-gallery', label: 'A · Gallery' },
  { path: '/variation-b-austin', label: 'B · Austin' },
  { path: '/variation-c-collector', label: 'C · Collector' },
]

/** Floating compare switcher for the pitch. Collapsed by default so it never covers the shop UI. */
export function DevToolbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(() => { try { return sessionStorage.getItem('cw-toolbar') === 'hide' } catch { return false } })
  if (hidden) return null
  return (
    <div className="cw-toolbar" data-open={open}>
      {open && (
        <nav aria-label="Compare variations" className="cw-toolbar-menu">
          <Link to="/" onClick={() => setOpen(false)}>All versions</Link>
          {VARIANTS.map((v) => <Link key={v.path} to={v.path} aria-current={pathname.startsWith(v.path) ? 'page' : undefined} onClick={() => setOpen(false)}>{v.label}</Link>)}
          <Link to="/owner" onClick={() => setOpen(false)}>Owner catalog</Link>
          <button onClick={() => { try { sessionStorage.setItem('cw-toolbar', 'hide') } catch { /* ignore */ } setHidden(true) }}>Hide toolbar</button>
        </nav>)}
      <button className="cw-toolbar-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? 'Close' : 'Compare'}</button>
    </div>
  )
}
