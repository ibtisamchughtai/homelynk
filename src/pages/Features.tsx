import { Bell, CalendarCheck, CreditCard, MapPin, MessageCircle, ShieldCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import DownloadBand from '../components/DownloadBand'
import { Spotlight, Stagger, StaggerItem } from '../components/motion'
import { site } from '../lib/site'
import { usePageTitle } from '../lib/usePageTitle'

const features = [
  {
    icon: CalendarCheck,
    title: 'Fast booking',
    text: 'Schedule cleaning and home services quickly from your phone.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted providers',
    text: 'Book with confidence through a platform built around reliability.',
  },
  {
    icon: CreditCard,
    title: 'Secure payments',
    text: 'Pay safely in-app with clear pricing and payment protection.',
  },
  {
    icon: MessageCircle,
    title: 'In-app chat',
    text: 'Talk with your provider before and during the job.',
  },
  {
    icon: MapPin,
    title: 'Local services',
    text: 'Connect with professionals available near you.',
  },
  {
    icon: Bell,
    title: 'Live updates',
    text: 'Stay informed about bookings, messages and service progress.',
  },
]

export default function Features() {
  usePageTitle('Features')

  return (
    <>
      <PageHeader title="Everything you need in one simple app.">
        <p>
          {site.name} helps you book, manage, communicate and pay for trusted home services through one modern
          platform.
        </p>
      </PageHeader>

      <section aria-label="App features" className="container-page">
        <Stagger
          as="ul"
          stagger={0.08}
          className="grid gap-px overflow-hidden rounded-[2rem] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ icon: Icon, title, text }) => (
            <StaggerItem as="li" key={title} className="bg-surface">
              <Spotlight className="h-full p-8 sm:p-10">
                <span className="grid size-12 place-items-center rounded-xl bg-lynk-soft text-lynk transition-[scale,rotate,background-color,color] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-lynk group-hover:text-paper">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 text-muted">{text}</p>
              </Spotlight>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <DownloadBand />
    </>
  )
}
