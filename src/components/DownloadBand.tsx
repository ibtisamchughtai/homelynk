import { m } from 'motion/react'
import StoreButtons from './StoreButtons'
import { Reveal } from './motion'

type DownloadBandProps = {
  id?: string
}

export default function DownloadBand({ id }: DownloadBandProps) {
  return (
    <section id={id} aria-labelledby="download-title" className="container-page mt-24">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-band px-6 py-12 text-ink sm:px-12 sm:py-16">
        <div aria-hidden="true" className="absolute -top-32 -right-24 -z-10 size-[26rem] rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153_/_0.48),transparent)] motion-safe:animate-aurora" />
        <div aria-hidden="true" className="absolute -bottom-40 left-1/4 -z-10 size-[22rem] rounded-full bg-[radial-gradient(closest-side,rgb(11_11_11_/_0.48),transparent)] motion-safe:animate-aurora [animation-delay:-8s]" />
        <svg
          viewBox="0 0 600 300"
          className="pointer-events-none absolute right-8 bottom-8 hidden w-[26rem] md:block text-lynk opacity-70"
          aria-hidden="true"
        >
          <m.path
            d="M20 260 C 180 260, 200 60, 380 80 S 560 200, 590 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 1.6, ease: 'easeInOut' }}
          />
          <m.circle
            cx="20"
            cy="260"
            r="9"
            fill="currentColor"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 16 }}
          />
          <circle cx="590" cy="40" r="9" fill="currentColor" className="origin-center [transform-box:fill-box] motion-safe:animate-ping" />
          <m.circle
            cx="590"
            cy="40"
            r="9"
            fill="currentColor"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, type: 'spring', stiffness: 400, damping: 16 }}
          />
        </svg>
        <div className="relative max-w-xl">
          <h2 id="download-title" className="text-4xl font-bold text-ink sm:text-5xl">
            Ready to book your next service?
          </h2>
          <p className="mt-4 text-lg text-ink">Download HomeLynk and get started today.</p>
          <div className="mt-8">
            <StoreButtons />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
