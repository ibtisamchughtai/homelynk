import { Sparkle } from 'lucide-react'

const items = ['Home cleaning', 'Deep cleaning', 'Moving help', 'Repairs', 'Verified pros', 'Secure payments', 'LaSalle', 'Châteauguay']

/** An endless ribbon of services and areas. Pauses on hover. */
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span
            className={`font-display text-4xl font-bold tracking-[-0.03em] sm:text-6xl ${
              index % 2 ? 'text-transparent [-webkit-text-stroke:1.5px_var(--color-lynk)]' : 'text-ink'
            }`}
          >
            {item}
          </span>
          <Sparkle className="size-6 shrink-0 fill-lynk text-lynk" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label="Services and areas" className="mt-16 overflow-hidden border-y border-line-soft py-6 sm:mt-24 sm:py-8">
      <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
