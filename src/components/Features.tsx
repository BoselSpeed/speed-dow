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
    <section id="features" className="relative bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden="true">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-gradient-to-tl from-black/5 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">{t.featuresEyebrow}</span>
            <h2 className="mt-4 text-4xl font-extrabold text-black sm:text-5xl">{t.featuresTitle}</h2>
            <p className="mt-4 text-lg text-gray-600">{t.featuresSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <div className={`group relative h-full rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:border-black hover:shadow-2xl ${f.wide ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-2xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-black">{f.title}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-gray-600">{f.desc}</p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
