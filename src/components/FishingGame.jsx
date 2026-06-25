import { useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

// Fish types: rarer fish are worth more. `weight` controls spawn frequency.
const SPECIES = [
  { emoji: '🐟', value: 10, weight: 30, size: 30, speed: 1.0 },
  { emoji: '🐠', value: 25, weight: 24, size: 30, speed: 1.3 },
  { emoji: '🦀', value: 40, weight: 14, size: 30, speed: 0.7 },
  { emoji: '🐡', value: 60, weight: 12, size: 32, speed: 0.9 },
  { emoji: '🦑', value: 90, weight: 8, size: 34, speed: 1.5 },
  { emoji: '🦈', value: 150, weight: 4, size: 46, speed: 1.9 },
  { emoji: '💎', value: 300, weight: 2, size: 26, speed: 0.5 },
  { emoji: '🥾', value: -5, weight: 6, size: 28, speed: 0.4 }, // junk!
]

const TOTAL_WEIGHT = SPECIES.reduce((s, f) => s + f.weight, 0)
const MAX_FISH = 7
const BEST_KEY = 'fisher_best_score'

function pickSpecies() {
  let r = Math.random() * TOTAL_WEIGHT
  for (const f of SPECIES) {
    if ((r -= f.weight) <= 0) return f
  }
  return SPECIES[0]
}

export default function FishingGame() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const stateRef = useRef(null) // mutable game state, lives outside React renders
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [lastCatch, setLastCatch] = useState(null) // { emoji, value }

  useEffect(() => {
    const stored = Number(localStorage.getItem(BEST_KEY)) || 0
    setBest(stored)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let lastSpawn = 0
    const SURFACE = 14 // y where the water surface / rod line begins

    // size in CSS pixels, set on resize
    const dims = { w: 0, h: 0 }

    const game = {
      fish: [],
      bubbles: [],
      hook: { x: 0, y: SURFACE + 6, targetX: 0, state: 'idle', fish: null },
      score: 0,
    }
    stateRef.current = game

    const resize = () => {
      const rect = wrapRef.current.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dims.w = rect.width
      dims.h = rect.height
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (game.hook.state === 'idle') {
        game.hook.x = dims.w / 2
        game.hook.targetX = dims.w / 2
      }
    }

    const spawnFish = () => {
      if (game.fish.length >= MAX_FISH) return
      const sp = pickSpecies()
      const dir = Math.random() < 0.5 ? 1 : -1
      const y = SURFACE + 50 + Math.random() * (dims.h - SURFACE - 90)
      game.fish.push({
        ...sp,
        x: dir === 1 ? -sp.size : dims.w + sp.size,
        y,
        dir,
        v: sp.speed * (0.7 + Math.random() * 0.6),
        wob: Math.random() * Math.PI * 2,
      })
    }

    const finishCatch = (f) => {
      game.score += f.value
      if (game.score < 0) game.score = 0
      setScore(game.score)
      setLastCatch({ emoji: f.emoji, value: f.value })
      setBest((b) => {
        const nb = Math.max(b, game.score)
        if (nb !== b) localStorage.setItem(BEST_KEY, String(nb))
        return nb
      })
    }

    const step = (t) => {
      const h = game.hook

      // spawn over time
      if (t - lastSpawn > 700) {
        spawnFish()
        lastSpawn = t
      }
      while (game.fish.length < 3) spawnFish()

      // ---- update fish ----
      for (const f of game.fish) {
        f.x += f.dir * f.v
        f.wob += 0.05
        f.y += Math.sin(f.wob) * 0.3
      }
      game.fish = game.fish.filter(
        (f) => f.x > -f.size - 10 && f.x < dims.w + f.size + 10,
      )

      // ---- update bubbles ----
      if (Math.random() < 0.25) {
        game.bubbles.push({
          x: Math.random() * dims.w,
          y: dims.h,
          r: 1 + Math.random() * 3,
          v: 0.3 + Math.random() * 0.7,
        })
      }
      for (const b of game.bubbles) b.y -= b.v
      game.bubbles = game.bubbles.filter((b) => b.y > SURFACE)

      // ---- update hook ----
      if (h.state === 'idle') {
        h.x += (h.targetX - h.x) * 0.2
        h.y = SURFACE + 6
      } else if (h.state === 'down') {
        h.y += 6
        for (const f of game.fish) {
          const dx = f.x - h.x
          const dy = f.y - h.y
          if (dx * dx + dy * dy < (f.size * 0.55) ** 2) {
            h.fish = f
            game.fish = game.fish.filter((x) => x !== f)
            h.state = 'up'
            break
          }
        }
        if (h.y >= dims.h - 14) h.state = 'up'
      } else if (h.state === 'up') {
        h.y -= 7
        if (h.fish) {
          h.fish.x = h.x
          h.fish.y = h.y + 6
        }
        if (h.y <= SURFACE + 6) {
          h.y = SURFACE + 6
          if (h.fish) {
            finishCatch(h.fish)
            h.fish = null
          }
          h.state = 'idle'
        }
      }

      // ---- draw ----
      ctx.clearRect(0, 0, dims.w, dims.h)

      // water gradient
      const grad = ctx.createLinearGradient(0, 0, 0, dims.h)
      grad.addColorStop(0, '#0e2a3f')
      grad.addColorStop(0.5, '#0a2233')
      grad.addColorStop(1, '#06141f')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, dims.w, dims.h)

      // surface shimmer
      ctx.strokeStyle = 'rgba(139,92,246,0.35)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, SURFACE)
      ctx.lineTo(dims.w, SURFACE)
      ctx.stroke()

      // bubbles
      ctx.fillStyle = 'rgba(255,255,255,0.10)'
      for (const b of game.bubbles) {
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // fish
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (const f of game.fish) {
        ctx.save()
        ctx.translate(f.x, f.y)
        // emoji fish face left by default; flip when swimming right
        if (f.dir === 1) ctx.scale(-1, 1)
        ctx.font = `${f.size}px serif`
        ctx.fillText(f.emoji, 0, 0)
        ctx.restore()
      }

      // fishing line + hook
      ctx.strokeStyle = 'rgba(255,255,255,0.45)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(h.x, 0)
      ctx.lineTo(h.x, h.y)
      ctx.stroke()

      if (h.fish) {
        ctx.save()
        ctx.translate(h.fish.x, h.fish.y)
        ctx.font = `${h.fish.size}px serif`
        ctx.fillText(h.fish.emoji, 0, 0)
        ctx.restore()
      } else {
        // bait
        ctx.fillStyle = '#c4b5fd'
        ctx.beginPath()
        ctx.arc(h.x, h.y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    // ---- input ----
    const pointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
      if (game.hook.state === 'idle') game.hook.targetX = Math.max(8, Math.min(dims.w - 8, x))
    }
    const cast = (e) => {
      e.preventDefault()
      pointerMove(e)
      if (game.hook.state === 'idle') {
        game.hook.x = game.hook.targetX
        game.hook.state = 'down'
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrapRef.current)
    canvas.addEventListener('pointermove', pointerMove)
    canvas.addEventListener('pointerdown', cast)
    canvas.addEventListener('touchmove', pointerMove, { passive: false })
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointermove', pointerMove)
      canvas.removeEventListener('pointerdown', cast)
      canvas.removeEventListener('touchmove', pointerMove)
    }
  }, [])

  return (
    <section id="fishing" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        index="01"
        title="Gone fishing"
        subtitle="Instead of a wall of repos, here's a little game I built. Move your cursor (or finger) over the water and click to drop the line — bigger fish are worth more, but watch out for the boot. 🥾"
      />

      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-850/60 shadow-2xl">
          {/* scoreboard */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Score</p>
                <p className="text-xl font-bold text-white tabular-nums">{score}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Best</p>
                <p className="text-xl font-bold text-accent-300 tabular-nums">{best}</p>
              </div>
            </div>
            {lastCatch && (
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-sm">
                <span className="text-lg">{lastCatch.emoji}</span>
                <span
                  className={`font-mono font-semibold ${
                    lastCatch.value >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {lastCatch.value >= 0 ? `+${lastCatch.value}` : lastCatch.value}
                </span>
              </div>
            )}
          </div>

          {/* canvas stage */}
          <div
            ref={wrapRef}
            className="relative h-[360px] w-full cursor-crosshair select-none sm:h-[420px]"
            style={{ touchAction: 'none' }}
          >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          </div>

          {/* legend */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 px-5 py-3 font-mono text-xs text-zinc-400">
            {SPECIES.map((s) => (
              <span key={s.emoji} className="inline-flex items-center gap-1">
                {s.emoji}
                <span className={s.value >= 0 ? 'text-zinc-500' : 'text-rose-400/80'}>
                  {s.value >= 0 ? s.value : s.value}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
