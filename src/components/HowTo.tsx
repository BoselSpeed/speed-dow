import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'
import Reveal from './Reveal'

const STEPS = [
  (t: any) => ({ num: '01', title: t.howStep1Title, desc: t.howStep1Desc }),
  (t: any) => ({ num: '02', title: t.howStep2Title, desc: t.howStep2Desc }),
  (t: any) => ({ num: '03', title: t.howStep3Title, desc: t.howStep3Desc }),
  (t: any) => ({ num: '04', title: t.howStep4Title, desc: t.howStep4Desc }),
  (t: any) => ({ num: '05', title: t.howStep5Title, desc: t.howStep5Desc }),
]

export default function HowTo() {
  const { t } = useI18n()
  const steps = STEPS.map((fn) => fn(t))

  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="geo-line h-px w-full" style={{ top: 0 }} aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{t.howEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.howTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.howSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 100}>
              <div className="card h-full rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                  {s.num}
                </div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{s.title}</h3>
                <p className="mt-2 text-sm leading-[1.8]" style={{ color: 'var(--color-text-secondary)' }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <div className="mt-10 text-center">
            <a
              href={SITE_CONFIG.downloadUrl}
              download
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold"
            >
              {t.howStep1Title}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
