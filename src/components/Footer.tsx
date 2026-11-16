import { Link } from 'react-router'
import Logo from './Logo'
import { nav, site } from '../lib/site'

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-block rounded-lg" aria-label={`${site.name} home`}>
            <Logo tone="paper" />
          </Link>
          <p className="mt-4 max-w-xs">{site.tagline}</p>
        </div>

        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal text-paper">Pages</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="rounded transition-colors hover:text-tag">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal text-paper">Get in touch</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={`mailto:${site.email}`} className="rounded break-all transition-colors hover:text-tag">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="rounded transition-colors hover:text-tag">
                {site.phoneDisplay}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <p className="container-page py-6 text-sm text-paper/60">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
