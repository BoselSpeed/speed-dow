import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

export default function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-gradient-to-l from-white/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">{t.aboutEyebrow}</span>
            <h2 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">{t.aboutTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-400">{t.aboutIntro}</p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {[t.aboutP1, t.aboutP2, t.aboutP3].map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/10">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="relative text-sm leading-[1.8] text-gray-300">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
