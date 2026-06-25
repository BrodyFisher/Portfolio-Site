import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { emailjs as cfg, socials } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const socialLinks = [
  { icon: FaLinkedin, href: socials.linkedin, label: 'LinkedIn' },
  { icon: FaGithub, href: socials.github, label: 'GitHub' },
  { icon: FaInstagram, href: socials.instagram, label: 'Instagram' },
].filter((s) => s.href)

export default function Contact() {
  const form = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const sendEmail = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs
      .sendForm(cfg.serviceId, cfg.templateId, form.current, { publicKey: cfg.publicKey })
      .then(() => {
        setStatus('success')
        form.current.reset()
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setStatus('error')
      })
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus:border-accent-500/60 focus:bg-ink-900'

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        index="03"
        title="Let's connect"
        subtitle="Have an opportunity, a question, or just want to say hi? Drop me a message."
      />

      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <p className="text-zinc-400">
            I'm always open to chatting about new projects, internships, or collaborations. The
            fastest way to reach me is the form here — or find me on the platforms below.
          </p>
          <div className="mt-6 flex gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:border-accent-500/40 hover:text-white"
              >
                <Icon className="text-xl" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="from_name"
                required
                placeholder="Your name"
                className={inputClass}
              />
              <input
                type="email"
                name="from_email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="What's on your mind?"
              className={`${inputClass} resize-none`}
            />

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-xl bg-accent-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'success' && (
                <span className="text-sm text-emerald-400">Thanks! Your message was sent. ✓</span>
              )}
              {status === 'error' && (
                <span className="text-sm text-rose-400">
                  Something went wrong — try again or email me directly.
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
