import { m, useReducedMotion, type TargetAndTransition } from 'motion/react'
import { Check, Home, ShieldCheck, UserRound } from 'lucide-react'
import ServiceImage from './ServiceImage'

const ease = [0.22, 1, 0.36, 1] as const

// Path endpoints, in percent of the scene box. The SVG viewBox has the same
// 4:5 shape as the scene (100 x 125), so it is never stretched and the line
// meets the HTML nodes exactly.
const from = { x: 30, y: 27 }
const to = { x: 70, y: 73 }
const Y = 1.25
const linkPath = `M${from.x} ${from.y * Y} C ${from.x} ${52 * Y}, ${to.x} ${48 * Y}, ${to.x} ${to.y * Y}`

/**
 * The hero's single orchestrated moment: a request leaves your home, a line
 * draws to a local pro, and the booking is confirmed. Under reduced motion
 * it renders the finished state with no movement.
 */
export default function LinkScene() {
  const reduce = useReducedMotion()
  const start = (value: TargetAndTransition) => (reduce ? false : value)

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem]" role="img" aria-label="A home cleaning request linked to a verified local pro, marked as booked">
      <m.div
        className="absolute inset-x-[5%] inset-y-[9%] overflow-hidden rounded-[2rem] bg-line"
        initial={start({ opacity: 0, scale: 0.96 })}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease }}
      >
        <ServiceImage slug="home-cleaning" alt="" priority sizes="(min-width: 1024px) 34rem, 90vw" />
        <div className="absolute inset-0 bg-paper/25" />
      </m.div>

      <svg viewBox="0 0 100 125" className="absolute inset-0 z-10 h-full w-full overflow-visible" aria-hidden="true">
        <m.path
          d={linkPath}
          fill="none"
          stroke="#0B0B0B"
          strokeWidth="1.7"
          strokeLinecap="round"
          initial={start({ pathLength: 0 })}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9, duration: 1.1, ease: 'easeInOut' }}
        />
        <m.path
          d={linkPath}
          fill="none"
          stroke="#34D399"
          strokeWidth="0.7"
          strokeLinecap="round"
          initial={start({ pathLength: 0 })}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9, duration: 1.1, ease: 'easeInOut' }}
        />
        {/* Once the link is drawn, a spark keeps travelling from home to pro. */}
        {!reduce && (
          <circle r="1.6" fill="#ffffff" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.4s" begin="2.2s" repeatCount="indefinite" />
            <animateMotion dur="2.4s" begin="2.2s" repeatCount="indefinite" path={linkPath} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.65 0 0.35 1" />
          </circle>
        )}
      </svg>

      {/* Request card */}
      <m.div
        className="absolute top-[3%] left-0 z-20 w-[64%] max-w-[17rem] rounded-2xl bg-surface p-4 motion-safe:animate-float shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]"
        initial={start({ opacity: 0, y: -14 })}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6, ease }}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lynk-soft text-lynk">
            <Home className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-sm text-muted">Your request</p>
            <p className="font-semibold">Home cleaning</p>
          </div>
        </div>
        <p className="mt-3 rounded-lg bg-paper px-3 py-1.5 text-sm text-muted">Saturday, 10:00 AM</p>
      </m.div>

      {/* Link nodes */}
      <Node x={from.x} y={from.y} color="bg-lynk" delay={0.8} reduce={!!reduce} />
      <Node x={to.x} y={to.y} color="bg-tag" delay={1.95} reduce={!!reduce} />

      {/* Pro card */}
      <m.div
        className="absolute right-0 bottom-[3%] z-20 w-[66%] max-w-[18rem] rounded-2xl bg-surface p-4 motion-safe:animate-float [animation-delay:-3.5s] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]"
        initial={start({ opacity: 0, y: 14 })}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.75, duration: 0.6, ease }}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lynk text-paper">
            <UserRound className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="font-semibold">Local pro</p>
            <p className="flex items-center gap-1 text-sm text-muted">
              <ShieldCheck className="size-4 text-lynk" aria-hidden="true" />
              Verified professional
            </p>
          </div>
        </div>
        <m.p
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-tag px-3 py-1 text-sm font-semibold text-paper"
          initial={start({ opacity: 0, scale: 0.6 })}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, type: 'spring', stiffness: 520, damping: 18 }}
        >
          <Check className="size-4" strokeWidth={3} aria-hidden="true" />
          Booked
        </m.p>
      </m.div>
    </div>
  )
}

type NodeProps = { x: number; y: number; color: string; delay: number; reduce: boolean }

function Node({ x, y, color, delay, reduce }: NodeProps) {
  return (
    <m.span
      aria-hidden="true"
      className={`absolute z-30 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-paper ${color}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={reduce ? false : { opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 500, damping: 20 }}
    >
      <span className={`absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping ${color}`} />
    </m.span>
  )
}
