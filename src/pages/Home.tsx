import { useRef } from 'react'
import { Link } from 'react-router'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { CalendarCheck, CircleCheck, CreditCard, MapPin, MessageCircle, ShieldCheck } from 'lucide-react'
import LinkScene from '../components/LinkScene'
import ServiceImage from '../components/ServiceImage'
import DownloadBand from '../components/DownloadBand'
import Marquee from '../components/Marquee'
import { Aurora, Magnetic, Reveal, SplitWords, Stagger, StaggerItem, TiltCard } from '../components/motion'
import { services, site } from '../lib/site'
import { usePageTitle } from '../lib/usePageTitle'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Verified professionals',
    text: 'Every service provider is carefully vetted to ensure quality and trust.',
  },
  {
    icon: CalendarCheck,
    title: 'Easy booking',
    text: 'Book appointments in a few taps with flexible scheduling.',
  },
  {
    icon: CreditCard,
    title: 'Secure payments',
    text: 'Protected in-app payments with transparent pricing and buyer protection.',
  },
  {
    icon: MessageCircle,
    title: 'Real-time chat',
    text: 'Stay connected with your provider before, during and after your booking.',
  },
]

export default function Home() {
  usePageTitle()
  const heroRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  return (
    <>
      <div ref={heroRef} className="relative isolate">
        <Aurora />
        <section className="container-page grid items-center gap-12 pt-10 pb-8 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <m.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
            <h1 className="text-[clamp(3rem,8.5vw,6.25rem)] leading-[0.95] font-extrabold tracking-[-0.04em]">
              <SplitWords text="Clean spaces," />
              <SplitWords text="happy places." delay={0.14} className="text-lynk" />
            </h1>
            <Reveal delay={0.45}>
              <p className="lead mt-7">
                {site.name} connects you with trusted cleaning and home service professionals for fast, secure and
                reliable help.
              </p>
            </Reveal>
            <Reveal delay={0.6} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <Link to="/#download" className="btn-lynk w-full">
                  Get the app
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/how-it-works" className="btn-ghost w-full">
                  See how it works
                </Link>
              </Magnetic>
            </Reveal>
            <Stagger as="ul" delay={0.8} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-muted">
              <StaggerItem as="li" className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-lynk" aria-hidden="true" />
                Trusted
              </StaggerItem>
              <StaggerItem as="li" className="flex items-center gap-2">
                <CircleCheck className="size-5 text-lynk" aria-hidden="true" />
                Reliable
              </StaggerItem>
              <StaggerItem as="li" className="flex items-center gap-2">
                <MapPin className="size-5 text-lynk" aria-hidden="true" />
                Local
              </StaggerItem>
            </Stagger>
          </m.div>
          <m.div style={reduce ? undefined : { y: sceneY }}>
            <LinkScene />
          </m.div>
        </section>
      </div>

      <Marquee />

      <section aria-labelledby="services-title" className="container-page mt-20 sm:mt-28">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 id="services-title" className="max-w-[16ch] text-4xl leading-[1.05] font-bold sm:text-5xl">
            Book trusted pros for every corner of home.
          </h2>
          <p className="max-w-sm text-muted">Cleaning, repairs and more, from people who live and work nearby.</p>
        </Reveal>
        <Stagger as="ul" stagger={0.12} className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem as="li" key={service.slug}>
              <TiltCard className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-line ring-1 ring-transparent transition-shadow duration-500 group-hover:shadow-[0_24px_60px_-24px_var(--color-lynk-deep)] group-hover:ring-lynk-deep/40">
                <ServiceImage
                  slug={service.slug}
                  alt={service.title}
                  className="transition-[scale] duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </TiltCard>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-1 text-muted">{service.blurb}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-labelledby="why-title" className="container-page mt-24 sm:mt-32">
        <Reveal className="relative isolate grid gap-12 overflow-hidden rounded-[2rem] bg-panel p-6 ring-1 ring-line-soft sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div aria-hidden="true" className="absolute -bottom-40 -left-40 -z-10 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153_/_0.16),transparent)] motion-safe:animate-aurora" />
          <div>
            <h2 id="why-title" className="text-4xl leading-[1.05] font-bold sm:text-5xl">
              Home services made simple.
            </h2>
            <p className="mt-5 text-lg text-muted">
              From booking trusted professionals to secure payments and live communication, {site.name} gives you
              everything you need in one place.
            </p>
            <Link to="/features" className="btn-ghost mt-8">
              Explore all features
            </Link>
          </div>
          <Stagger as="ul" stagger={0.12} delay={0.2} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }) => (
              <StaggerItem as="li" key={title} className="group relative pt-5">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-line" />
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-0.5 w-1/3 bg-lynk-deep transition-[width] duration-500 ease-out group-hover:w-full"
                />
                <Icon
                  className="size-6 text-lynk transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
                  aria-hidden="true"
                />
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </section>

      <DownloadBand id="download" />
    </>
  )
}

