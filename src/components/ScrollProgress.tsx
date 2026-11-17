import { m, useScroll, useSpring } from 'motion/react'

/** A thin emerald bar across the top of the window that fills as you scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-lynk-deep via-lynk to-lynk-deep"
      style={{ scaleX }}
    />
  )
}
