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
    <section id="stats" className="relative py-20 sm:py-28" style={{ backgroundColor: '#000000' }}>
      <div className="geo-grid pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>{t.statsEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{t.statsTitle}</h2>
            <p className="mt-4 text-lg text-white/70">{t.statsSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card rounded-2xl p-6 text-center" style={{ backgroundColor: '#0f0f0f', border: '1px solid #262626' }}>
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="mt-2 text-xs font-semibold" style={{ color: '#9ca3af' }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
