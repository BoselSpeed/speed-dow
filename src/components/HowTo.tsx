import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'
import { SITE_CONFIG } from '../data/siteConfig'

export default function HowTo({ onOpenInstall }: { onOpenInstall: () => void }) {
  const { t } = useI18n()

  const steps = [
    { title: t.howStep1Title, desc: t.howStep1Desc, icon: '⬇️' },
    { title: t.howStep2Title, desc: t.howStep2Desc, icon: '📲' },
    { title: t.howStep3Title, desc: t.howStep3Desc, icon: '📚' },
    { title: t.howStep4Title, desc: t.howStep4Desc, icon: '🗂️' },
    { title: t.howStep5Title, desc: t.howStep5Desc, icon: '📖' },
  ]

  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>{t.howEyebrow}</span>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.howTitle}</h2>
          <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.howSubtitle}</p>
        </div>
      </Reveal>

      <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 lg:block" style={{ backgroundColor: 'var(--color-border)' }} aria-hidden="true" />
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 110}>
            <div className="relative flex h-full flex-col items-center rounded-2xl p-5 text-center card">
              <div
                className="relative z-10 mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                style={{ backgroundColor: 'var(--color-surface-2)' }}
              >
                <span>{s.icon}</span>
                <span
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {i + 1}
                </span>
              </div>
              <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href={SITE_CONFIG.downloadUrl} download className="btn-primary rounded-xl px-6 py-3 font-bold">
            {t.heroDownload}
          </a>
          <button
            onClick={onOpenInstall}
            className="rounded-xl px-6 py-3 font-bold"
            style={{ color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-soft)' }}
          >
            {t.installBtn}
          </button>
        </div>
      </Reveal>
    </section>
  )
}
