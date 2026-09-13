import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'
import Reveal from './Reveal'

export default function Cta({ onOpenInstall }: { onOpenInstall: () => void }) {
  const { t } = useI18n()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    const particles: { x: number; y: number; r: number; vy: number }[] = []
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vy: Math.random() * 0.4 + 0.1,
      })
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.y -= p.vy
        if (p.y < -5) p.y = canvas.height + 5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12"
            style={{ background: 'linear-gradient(135deg, #000000, #111827 55%, #1e293b 100%)' }}
          >
            <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
            <div className="relative">
              <span className="inline-block rounded-full px-4 py-1.5 text-sm font-bold text-white" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                {t.ctaEyebrow}
              </span>
              <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">{t.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{t.ctaSubtitle}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={SITE_CONFIG.downloadUrl}
                  download
                  onClick={() => setClicked(true)}
                  onAnimationEnd={() => setClicked(false)}
                  className={`inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-extrabold text-black shadow-xl transition-transform ${clicked ? 'scale-95' : 'hover:scale-105'}`}
                >
                  {t.ctaButton}
                </a>
                <button
                  onClick={onOpenInstall}
                  className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  {t.installBtn}
                </button>
              </div>
              <p className="mt-5 text-sm text-white/60">{t.ctaNote}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
