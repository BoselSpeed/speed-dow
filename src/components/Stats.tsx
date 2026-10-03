import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

const STATS = [
  (t: any) => ({ value: '29', label: t.stat1Label }),
  (t: any) => ({ value: '146', label: t.stat2Label }),
  (t: any) => ({ value: '9', label: t.stat3Label }),
  (t: any) => ({ value: '8', label: t.stat4Label }),
  (t: any) => ({ value: '5', label: t.stat5Label }),
  (t: any) => ({ value: '100%', label: t.stat6Label }),
]

export default function Stats() {
  const { t } = useI18n()
  const stats = STATS.map((fn) => fn(t))

  return (
    <section id="stats" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-white/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">{t.statsEyebrow}</span>
            <h2 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">{t.statsTitle}</h2>
            <p className="mt-4 text-lg text-gray-400">{t.statsSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/10">
                <div className="text-4xl font-extrabold text-white sm:text-5xl">{s.value}</div>
                <div className="mt-3 text-xs font-semibold text-gray-400">{s.label}</div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
