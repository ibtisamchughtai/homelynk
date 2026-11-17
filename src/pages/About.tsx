import { Handshake, ShieldCheck, Sparkles } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DownloadBand from '../components/DownloadBand'
import { Reveal, ScrollWords, Stagger, StaggerItem } from '../components/motion'
import { site } from '../lib/site'
import { usePageTitle } from '../lib/usePageTitle'

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust',
    text: 'We focus on connecting customers with reliable local professionals.',
  },
  {
    icon: Sparkles,
    title: 'Quality',
    text: `${site.name} is built around cleaner, safer and more consistent service experiences.`,
  },
  {
    icon: Handshake,
    title: 'Transparency',
    text: 'Clear booking details, secure payments and simple communication.',
  },
]

export default function About() {
  usePageTitle('About')

  return (
    <>
      <PageHeader title="Building trust in every service.">
        <p>
          {site.name} is a Canadian home services platform that connects customers with trusted local
          professionals. Our goal is to make home services easier, safer and more transparent.
        </p>
        <p className="mt-4">
          Whether you need cleaning, maintenance or other home services, {site.name} helps you find reliable
          professionals, book quickly and pay securely through the app.
        </p>
      </PageHeader>

      <section aria-labelledby="mission-title" className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-band px-6 py-12 text-ink sm:px-14 sm:py-20">
          <div aria-hidden="true" className="absolute -top-32 -right-32 -z-10 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153_/_0.4),transparent)] motion-safe:animate-aurora" />
          <h2 id="mission-title" className="font-sans text-lg font-semibold tracking-normal text-ink">
            Our mission
          </h2>
          <ScrollWords
            className="mt-5 max-w-[24ch] font-display text-[clamp(1.875rem,4.5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
            text="To make home services simple, reliable and accessible for everyone by combining trusted professionals with easy-to-use technology."
          />
        </Reveal>
      </section>

      <section aria-labelledby="values-title" className="container-page mt-24">
        <Reveal>
          <h2 id="values-title" className="text-4xl font-bold sm:text-5xl">
            Our values
          </h2>
        </Reveal>
        <Stagger as="ul" stagger={0.15} className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <StaggerItem as="li" key={title} className="group relative pt-5">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-line" />
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-0.5 w-1/3 bg-lynk-deep transition-[width] duration-500 ease-out group-hover:w-full"
              />
              <Icon
                className="size-7 text-lynk transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
                aria-hidden="true"
              />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <DownloadBand />
    </>
  )
}
