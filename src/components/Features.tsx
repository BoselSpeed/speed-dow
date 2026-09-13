import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

export default function Features() {
  const { t } = useI18n()

  const features = [
    { icon: '📚', title: t.featureLibraryTitle, desc: t.featureLibraryDesc, wide: false },
    { icon: '📖', title: t.featurePdfTitle, desc: t.featurePdfDesc, wide: false },
    { icon: '📴', title: t.featureOfflineTitle, desc: t.featureOfflineDesc, wide: false },
    { icon: '🗂️', title: t.featureVolumesTitle, desc: t.featureVolumesDesc, wide: false },
    { icon: '🌐', title: t.featureBilingualTitle, desc: t.featureBilingualDesc, wide: false },
    { icon: '📊', title: t.featureProgressTitle, desc: t.featureProgressDesc, wide: false },
    { icon: '✅', title: t.featureQuizTitle, desc: t.featureQuizDesc, wide: true },
  ]

  return (
    <section id="features" className="relative py-20 sm:py-28" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="geo-dots pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{t.featuresEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.featuresTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.featuresSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className={`card flex h-full flex-col rounded-2xl p-7 ${f.wide ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-2xl" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="mt-2 text-sm leading-[1.8]" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
