import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import { Reveal, Stagger, StaggerItem } from '../components/motion'
import { site } from '../lib/site'
import { usePageTitle } from '../lib/usePageTitle'

const details = [
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: 'Phone', value: site.phoneDisplay, href: site.phoneHref },
  { icon: MapPin, label: 'Location', value: site.location },
  { icon: Clock, label: 'Hours', value: site.hours },
]

export default function Contact() {
  usePageTitle('Contact')

  return (
    <>
      <PageHeader title="We'd love to hear from you.">
        <p>
          Have questions about {site.name} or want to learn more about our services? Send us a message and we'll get
          back to you as soon as possible.
        </p>
      </PageHeader>

      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <section aria-labelledby="details-title">
          <h2 id="details-title" className="sr-only">
            Contact details
          </h2>
          <Stagger as="dl" stagger={0.1} delay={0.3} className="divide-y divide-line border-y border-line">
            {details.map(({ icon: Icon, label, value, href }) => (
              <StaggerItem key={label} className="group flex items-start gap-4 py-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-lynk-soft text-lynk transition-[scale,rotate,background-color,color] duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-lynk group-hover:text-paper">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-0.5 font-semibold break-words">
                    {href ? (
                      <a href={href} className="rounded underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-lynk">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <Reveal delay={0.4}>
          <ContactForm />
        </Reveal>
      </div>
    </>
  )
}
