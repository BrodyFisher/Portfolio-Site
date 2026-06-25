import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">Built with React, Vite & Tailwind</p>
      </div>
    </footer>
  )
}
