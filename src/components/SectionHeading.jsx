import Reveal from './Reveal'

export default function SectionHeading({ index, title, subtitle }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-accent-400">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-accent-500/60 to-transparent" />
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-xl text-zinc-400">{subtitle}</p>}
    </Reveal>
  )
}
