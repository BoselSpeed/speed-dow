import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

const STEPS = [
  (t: any) => ({ num: '01', title: t.howStep1Title, desc: t.howStep1Desc, icon: '📱' }),
  (t: any) => ({ num: '02', title: t.howStep2Title, desc: t.howStep2Desc, icon: '⚙️' }),
  (t: any) => ({ num: '03', title: t.howStep3Title, desc: t.howStep3Desc, icon: '📚' }),
]

export default function HowTo() {
  const { t } = useI18n()
  const steps = STEPS.map((fn) => fn(t))

  return (
    <section id="how" className="relative bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.4]" aria-hidden="true">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-r from-black/5 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">{t.howEyebrow}</span>
            <h2 className="mt-4 text-4xl font-extrabold text-black sm:text-5xl">{t.howTitle}</h2>
            <p className="mt-4 text-lg text-gray-600">{t.howSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 150}>
              <div className="group relative h-full rounded-3xl border border-gray-200 bg-white p-10 text-center transition-all duration-500 hover:border-black hover:shadow-2xl">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-3xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {s.icon}
                </div>
                <div className="text-sm font-bold text-gray-400">{s.num}</div>
                <h3 className="mt-3 text-xl font-bold text-black">{s.title}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-gray-600">{s.desc}</p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-16 text-center">
            <a
              href="#download"
              className="btn-primary inline-flex items-center gap-2 rounded-2xl bg-black px-10 py-5 text-lg font-bold text-white"
            >
              {t.howStep1Title}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
