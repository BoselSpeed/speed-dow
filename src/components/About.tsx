import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div className="geo-grid pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{t.aboutEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.aboutTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t.aboutIntro}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {[t.aboutP1, t.aboutP2, t.aboutP3].map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="card h-full rounded-2xl p-7">
                <p className="text-sm leading-[1.8]" style={{ color: 'var(--color-text-secondary)' }}>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
