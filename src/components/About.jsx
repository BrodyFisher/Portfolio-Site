import { skills, profile } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="border-y border-white/5 bg-ink-900/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <SectionHeading
          index="02"
          title="About me"
          subtitle="A quick look at what I work with and what drives me."
        />

        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-zinc-300">{profile.bio}</p>
            <p className="mt-4 leading-relaxed text-zinc-400">
              I'm endlessly curious and love collaborating on projects with other people. Whether
              it's low-level C++, a quick Python prototype, or wiring up hardware, I'm always
              excited to learn something new and push my skillset further.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-1">
              {skills.map((group) => (
                <div
                  key={group.group}
                  className="rounded-2xl border border-white/10 bg-ink-850/60 p-5"
                >
                  <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-300">
                    {group.group}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-zinc-200 ring-1 ring-white/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
