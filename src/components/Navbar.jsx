import { useEffect, useState } from 'react'
import { profile } from '../data/content'

const links = [
  { label: 'Fishing', href: '#fishing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-ink-950/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-500/15 text-accent-300 ring-1 ring-accent-500/30">
            {initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-accent-500/20 transition-all hover:bg-accent-400 hover:shadow-accent-400/30"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg ring-1 ring-white/10 md:hidden"
        >
          <span
            className={`h-0.5 w-4 bg-white transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-4 bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-4 bg-white transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-ink-950/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-accent-500 px-3 py-2.5 text-center text-sm font-medium text-white"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
