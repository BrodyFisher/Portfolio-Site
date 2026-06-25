import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'
import { profile, socials } from '../data/content'

const socialLinks = [
  { icon: FaLinkedin, href: socials.linkedin, label: 'LinkedIn' },
  { icon: FaGithub, href: socials.github, label: 'GitHub' },
  { icon: FaInstagram, href: socials.instagram, label: 'Instagram' },
].filter((s) => s.href)

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-aurora absolute inset-0 -z-10" />
      <div className="bg-grid absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 pb-20 pt-32 md:grid-cols-[1.3fr_1fr] md:pt-40">
        {/* Left: text */}
        <div className="reveal is-visible">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="block text-zinc-400 text-2xl font-semibold sm:text-3xl">Hi, I'm</span>
            <span className="text-gradient">{profile.name.split(' ')[0]}</span>
          </h1>

          <p className="mt-4 max-w-xl text-lg font-medium text-zinc-300 sm:text-xl">
            {profile.role}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#fishing"
              className="rounded-xl bg-accent-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-400"
            >
              Go fishing 🎣
            </a>
            <a
              href="#contact"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              Get in touch
            </a>

            <div className="ml-1 flex items-center gap-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: portrait */}
        <div className="reveal is-visible relative mx-auto w-full max-w-xs">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent-600/30 via-accent-500/10 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-850 shadow-2xl">
            <img
              src={profile.image}
              alt={profile.name}
              className="aspect-[4/5] w-full object-cover object-top"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-ink-850/90 px-4 py-3 shadow-xl backdrop-blur">
            <p className="font-mono text-xs text-zinc-400">📍 {profile.location}</p>
          </div>
        </div>
      </div>

      <a
        href="#fishing"
        className="mx-auto hidden w-fit items-center gap-2 pb-8 text-xs text-zinc-500 transition-colors hover:text-zinc-300 md:flex"
      >
        <HiArrowDown className="animate-bounce" /> Scroll to explore
      </a>
    </section>
  )
}
