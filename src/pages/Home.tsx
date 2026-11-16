import { Link } from 'react-router'
import { CalendarCheck, CircleCheck, CreditCard, MapPin, MessageCircle, ShieldCheck } from 'lucide-react'
import LinkScene from '../components/LinkScene'
import ServiceImage from '../components/ServiceImage'
import DownloadBand from '../components/DownloadBand'
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

  return (
    <>
      <section className="container-page grid items-center gap-12 pt-10 pb-8 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <h1 className="text-[clamp(3rem,8.5vw,6.25rem)] leading-[0.95] font-extrabold tracking-[-0.04em]">
            Clean spaces, happy places.
          </h1>
          <p className="lead mt-7">
            {site.name} connects you with trusted cleaning and home service professionals for fast, secure and
            reliable help.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/#download" className="btn-lynk">
              Get the app
            </Link>
            <Link to="/how-it-works" className="btn-ghost">
              See how it works
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-muted">
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-lynk" aria-hidden="true" />
              Trusted
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck className="size-5 text-lynk" aria-hidden="true" />
              Reliable
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-5 text-lynk" aria-hidden="true" />
              Local
            </li>
          </ul>
        </div>
        <LinkScene />
      </section>

      <section aria-labelledby="services-title" className="container-page mt-20 sm:mt-28">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 id="services-title" className="max-w-[16ch] text-4xl leading-[1.05] font-bold sm:text-5xl">
            Book trusted pros for every corner of home.
          </h2>
          <p className="max-w-sm text-muted">Cleaning, repairs and more, from people who live and work nearby.</p>
        </div>
        <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-line">
                <ServiceImage slug={service.slug} alt={service.title} />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-1 text-muted">{service.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="why-title" className="container-page mt-24 sm:mt-32">
        <div className="grid gap-12 rounded-[2rem] bg-surface p-6 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
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
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="border-t-2 border-ink pt-5">
                <Icon className="size-6 text-lynk" aria-hidden="true" />
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DownloadBand id="download" />
    </>
  )
}

