import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

interface Shot {
  key: string
  title: string
  desc: string
  kind: 'cover' | 'mixed'
  covers?: string[]
}

function Frame({ shot }: { shot: Shot }) {
  return (
    <div
      className="mx-auto w-44 overflow-hidden rounded-[2rem] border-[3px] bg-white shadow-2xl"
      style={{ borderColor: '#000000' }}
    >
      <div className="mx-auto mt-2 h-5 w-20 rounded-full bg-black" />
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between rounded-lg px-2 py-1.5" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <span className="h-2 w-2 rounded-full bg-black" />
          <span className="text-[8px] font-bold" style={{ color: 'var(--color-text)' }}>{shot.title}</span>
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
        </div>
        {shot.kind === 'cover' && shot.covers?.[0] && (
          <img src={shot.covers[0]} alt={shot.title} className="w-full rounded-lg object-cover" style={{ height: 210 }} loading="lazy" />
        )}
        {shot.kind === 'mixed' && (
          <div className="space-y-2">
            {shot.covers?.map((c, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg p-1.5" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                <img src={c} alt="" className="h-11 w-9 rounded object-cover" loading="lazy" />
                <span className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Screenshots() {
  const { t } = useI18n()
  const [lightbox, setLightbox] = useState<Shot | null>(null)

  const shots: Shot[] = [
    { key: 'library', title: t.shotLibraryTitle, desc: t.shotLibraryDesc, kind: 'mixed', covers: ['/assets/screens/kitab-al-tawhid.jpg', '/assets/screens/sahih-al-bukhari.jpg', '/assets/screens/tafsir-ibn-kathir.jpg', '/assets/screens/al-aqidah-al-wasitiyyah.jpg'] },
    { key: 'volumes', title: t.shotVolumesTitle, desc: t.shotVolumesDesc, kind: 'mixed', covers: ['/assets/screens/tafsir-al-tabari.jpg', '/assets/screens/tafsir-al-qurtubi.jpg', '/assets/screens/sahih-muslim.jpg', '/assets/screens/sunan-al-tirmidhi.jpg'] },
    { key: 'details', title: t.shotDetailsTitle, desc: t.shotDetailsDesc, kind: 'cover', covers: ['/assets/screens/thalatha-al-usul.jpg'] },
  ]

  return (
    <section id="screenshots" className="relative py-20 sm:py-28" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="geo-dots pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{t.screenshotsEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.screenshotsTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.screenshotsSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {shots.map((s, i) => (
            <Reveal key={s.key} delay={i * 140}>
              <button
                className="group block w-full text-center transition-transform duration-300 hover:-translate-y-2"
                onClick={() => setLightbox(s)}
                aria-label={`${s.title} — ${t.openFullscreen}`}
              >
                <Frame shot={s} />
                <h3 className="mt-5 text-lg font-bold" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="mt-1.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{s.desc}</p>
                <span className="mt-2 inline-block text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>{t.openFullscreen} ↕</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 modal-backdrop"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <div className="lightbox-in relative max-w-sm" onClick={(e) => e.stopPropagation()}>
            <Frame shot={lightbox} />
            <div className="mt-5 rounded-xl p-5 text-center" style={{ backgroundColor: 'var(--color-bg)' }}>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{lightbox.title}</h3>
              <p className="mt-1.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{lightbox.desc}</p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
