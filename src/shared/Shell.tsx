/**
 * Route shell shared by all three variations. A variation supplies its config, layout and the
 * three pages that carry its identity (home, shop/collection, product). Everything else is shared.
 */
import { useEffect, type ComponentType, type ReactNode } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { VariationCtx, useFonts, type Variation } from './variation'
import { CartDrawer } from './ui/CartDrawer'
import { Checkout, Confirmation } from './ui/Checkout'
import { NotFound, PolicyPage, VisitPage } from './ui/pages'
import { MotionManager, ScrollTop } from './motion'
import { DevToolbar } from './ui/DevToolbar'

function Order() { const { id } = useParams(); return <Confirmation id={id ?? ''} /> }

export function VariationShell({ v, Layout, Home, Shop, Product, extra }: {
  v: Variation
  Layout: ComponentType<{ children: ReactNode }>
  Home: ComponentType; Shop: ComponentType; Product: ComponentType
  extra?: ReactNode
}) {
  useFonts(v.fonts)
  useEffect(() => {
    const m = document.querySelector('meta[name="theme-color"]'); m?.setAttribute('content', v.themeColor)
    document.documentElement.dataset.variation = v.id
    return () => { delete document.documentElement.dataset.variation }
  }, [v])
  return (
    <VariationCtx.Provider value={v}>
      <div className={`vx ${v.theme}`}>
        <ScrollTop />
        <MotionManager />
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path={v.shop} element={<Shop />} />
            <Route path={`${v.shop}/:slug`} element={<Product />} />
            <Route path="visit" element={<VisitPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order/:id" element={<Order />} />
            <Route path="policies/:page" element={<PolicyPage />} />
            {extra}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <CartDrawer />
        <DevToolbar />
      </div>
    </VariationCtx.Provider>
  )
}
