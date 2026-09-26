import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// Each version is its own code-split chunk: visiting one never downloads the others.
const Switcher = lazy(() => import('./switcher/Switcher'))
const Original = lazy(() => import('./original/OriginalApp'))
const Gallery = lazy(() => import('./variations/a-gallery'))
const Austin = lazy(() => import('./variations/b-austin'))
const Collector = lazy(() => import('./variations/c-collector'))
const Owner = lazy(() => import('./shared/ui/Owner').then((m) => ({ default: m.OwnerPage })))

export default function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Routes>
        <Route path="/" element={<Switcher />} />
        <Route path="/original" element={<Original />} />
        <Route path="/variation-a-gallery/*" element={<Gallery />} />
        <Route path="/variation-b-austin/*" element={<Austin />} />
        <Route path="/variation-c-collector/*" element={<Collector />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="*" element={<Switcher />} />
      </Routes>
    </Suspense>
  )
}
