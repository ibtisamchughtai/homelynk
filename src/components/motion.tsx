import { Fragment, useRef, type PointerEvent, type ReactNode } from 'react'
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

// Shared entrance: lift and fade. `custom` carries an optional delay.
const rise: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay },
  }),
}

type Tag = 'div' | 'ul' | 'ol' | 'li' | 'dl' | 'p' | 'section'
type BaseProps = { as?: Tag; className?: string; children?: ReactNode; id?: string }

/** Lifts its content into place the first time it scrolls into view. */
export function Reveal({ as = 'div', delay = 0, className, children, id }: BaseProps & { delay?: number }) {
  const Comp = m[as] as typeof m.div
  return (
    <Comp
      id={id}
      className={className}
      variants={rise}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </Comp>
  )
}

/** Reveals each <StaggerItem> child one after another. */
export function Stagger({
  as = 'div',
  stagger = 0.1,
  delay = 0,
  className,
  children,
  id,
}: BaseProps & { stagger?: number; delay?: number }) {
  const Comp = m[as] as typeof m.div
  return (
    <Comp
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({ as = 'div', className, children }: BaseProps) {
  const Comp = m[as] as typeof m.div
  return (
    <Comp className={className} variants={rise}>
      {children}
    </Comp>
  )
}

/**
 * Headline text where each word rises out of its own mask. Screen readers get
 * the plain sentence once.
 */
export function SplitWords({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={index}>
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <m.span
                className="inline-block origin-bottom-left"
                initial={{ y: '110%', rotate: 6 }}
                animate={{ y: '0%', rotate: 0 }}
                transition={{ delay: delay + index * 0.07, duration: 0.9, ease }}
              >
                {word}
              </m.span>
            </span>{' '}
          </Fragment>
        ))}
      </span>
    </span>
  )
}

/** Text that lights up word by word as it scrolls through the viewport. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <ScrollWord
            key={index}
            progress={scrollYProgress}
            range={[index / words.length, (index + 1) / words.length]}
            still={!!reduce}
          >
            {word}
          </ScrollWord>
        ))}
      </span>
    </p>
  )
}

function ScrollWord({
  progress,
  range,
  still,
  children,
}: {
  progress: MotionValue<number>
  range: [number, number]
  still: boolean
  children: string
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <>
      <m.span style={still ? undefined : { opacity }}>{children}</m.span>{' '}
    </>
  )
}

const pull = { stiffness: 260, damping: 18, mass: 0.6 }

/** Lets its content drift toward the mouse pointer while hovered. */
export function Magnetic({ children, className = '', strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const reduce = useReducedMotion()
  const x = useSpring(0, pull)
  const y = useSpring(0, pull)

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (box.left + box.width / 2)) * strength)
    y.set((event.clientY - (box.top + box.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className={className} onPointerMove={onMove} onPointerLeave={reset}>
      <m.div className="flex h-full w-full" style={{ x, y }}>
        {children}
      </m.div>
    </div>
  )
}

const tilt = { stiffness: 220, damping: 20 }

/** Tilts in 3D toward the pointer. */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), tilt)
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), tilt)

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - box.left) / box.width)
    py.set((event.clientY - box.top) / box.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className="group [perspective:900px]" onPointerMove={onMove} onPointerLeave={reset}>
      <m.div className={className} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </m.div>
    </div>
  )
}

/** A soft emerald glow that follows the pointer across the card. */
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--x', `${event.clientX - box.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - box.top}px`)
  }

  return (
    <div onPointerMove={onMove} className={`group relative isolate overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(52, 211, 153, 0.16), transparent 45%)',
        }}
      />
      {children}
    </div>
  )
}

/** Drifting emerald glows for page backdrops. Purely decorative. */
export function Aurora({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      <div className="absolute -top-48 -left-32 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153_/_0.24),transparent)] motion-safe:animate-aurora" />
      <div className="absolute top-24 -right-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(4_120_87_/_0.4),transparent)] motion-safe:animate-aurora [animation-delay:-9s]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[radial-gradient(var(--color-line-soft)_1px,transparent_1px)] [background-size:28px_28px]" />
    </div>
  )
}
