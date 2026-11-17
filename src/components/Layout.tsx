import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { LazyMotion, MotionConfig, m } from 'motion/react'

const loadMotionFeatures = () => import('../lib/motionFeatures').then((module) => module.default)
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // After a client-side page change, move focus to the new page so screen
  // reader and keyboard users start at the top of the content.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-cta px-5 py-3 font-semibold text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <m.main
        id="main"
        ref={mainRef}
        key={pathname}
        tabIndex={-1}
        className="outline-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </m.main>
      <Footer />
      <ScrollRestoration />
    </MotionConfig>
    </LazyMotion>
  )
}
