import { Link } from 'react-router'
import Logo from './Logo'
import { Reveal } from './motion'
import { nav, site } from '../lib/site'

export default function Footer() {
  return (
    <footer className="mt-24 bg-footer text-body">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-block rounded-lg" aria-label={`${site.name} home`}>
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs">{site.tagline}</p>
        </div>

        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal text-ink">Pages</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="rounded transition-colors hover:text-lynk">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal text-ink">Get in touch</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`mailto:${site.email}`} className="rounded break-all transition-colors hover:text-lynk">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="rounded transition-colors hover:text-lynk">
                {site.phoneDisplay}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <Reveal className="container-page overflow-hidden">
        <p
          aria-hidden="true"
          className="-mb-[0.18em] bg-gradient-to-b from-line to-transparent bg-clip-text text-center font-display text-[clamp(4.5rem,19vw,15rem)] leading-none font-extrabold tracking-[-0.06em] text-transparent select-none"
        >
          {site.name}
        </p>
      </Reveal>
      <div className="border-t border-line-soft">
        <p className="container-page py-6 text-sm text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
