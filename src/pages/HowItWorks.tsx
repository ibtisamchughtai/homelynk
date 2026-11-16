import { m, useReducedMotion } from 'motion/react'
import { CalendarPlus, Search, Sparkles } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DownloadBand from '../components/DownloadBand'
import { site } from '../lib/site'
import { usePageTitle } from '../lib/usePageTitle'

const steps = [
  {
    icon: Search,
    title: 'Choose a service',
    text: 'Select the cleaning or home service you need and enter your details.',
  },
  {
    icon: CalendarPlus,
    title: 'Book a provider',
    text: 'Pick a time, confirm your booking and connect with a local professional.',
  },
  {
    icon: Sparkles,
    title: 'Enjoy the result',
    text: 'Track the job, chat with your provider and pay securely in the app.',
  },
]

export default function HowItWorks() {
  usePageTitle('How it works')
  const reduce = useReducedMotion()

  return (
    <>
      <PageHeader title="Book trusted home services in three simple steps.">
        <p>
          {site.name} keeps the process simple, from the moment you request a service to the moment the job is
          complete.
        </p>
      </PageHeader>

      <section aria-label="Steps" className="container-page">
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {/* The line that links the steps; draws once when it scrolls into view. */}
          <m.span
            aria-hidden="true"
            className="absolute top-7 right-[16%] left-[16%] hidden h-[3px] origin-left rounded-full bg-lynk md:block"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          />
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-ink font-display text-xl font-bold text-paper ring-8 ring-paper">
                {index + 1}
              </span>
              <div className="md:mt-2">
                <Icon className="size-6 text-lynk md:mx-auto" aria-hidden="true" />
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 max-w-[34ch] text-muted md:mx-auto">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <DownloadBand />
    </>
  )
}
