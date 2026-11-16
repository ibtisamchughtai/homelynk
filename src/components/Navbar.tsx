import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { AnimatePresence, m } from 'motion/react'
import { Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { nav, site } from '../lib/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile menu is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-paper'
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" onClick={close} className="rounded-lg" aria-label={`${site.name} home`}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative isolate block rounded-full px-4 py-2 font-medium transition-colors duration-200 ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface shadow-[0_0_0_1px_var(--color-line)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 font-medium text-muted transition-colors hover:text-ink xl:inline-flex"
          >
            <Phone className="size-4 text-lynk" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <Link to="/#download" onClick={close} className="btn-primary hidden sm:inline-flex">
            Get the app
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full text-ink ring-1 ring-line ring-inset transition-colors hover:bg-surface lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto bg-paper lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 pt-4 pb-8">
              {nav.map((item, index) => (
                <m.li
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index + 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={close}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3 font-display text-3xl font-semibold tracking-tight ${
                        isActive ? 'bg-surface text-ink' : 'text-muted'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </m.li>
              ))}
            </ul>
            <div className="container-page flex flex-col gap-3 border-t border-line pt-6">
              <Link to="/#download" onClick={close} className="btn-primary">
                Get the app
              </Link>
              <a href={site.phoneHref} className="btn-ghost">
                <Phone className="size-4" aria-hidden="true" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
