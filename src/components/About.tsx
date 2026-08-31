import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

export default function About() {
  const { t } = useI18n()

  const paragraphs = [t.aboutP1, t.aboutP2, t.aboutP3]

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
            {t.aboutEyebrow}
          </span>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>
            {t.aboutTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {t.aboutIntro}
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="card card-hover h-full rounded-2xl p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold" style={{ backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
