import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'
import Reveal from './Reveal'

export default function Cta() {
  const { t } = useI18n()

  return (
    <section id="download" className="relative py-20 sm:py-28" style={{ backgroundColor: '#000000' }}>
      <div className="geo-grid pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>{t.ctaEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-4 text-lg text-white/70">{t.ctaSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {SITE_CONFIG.downloadLinks.map((link, i) => (
            <Reveal key={link.id} delay={i * 100}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex flex-col items-center rounded-2xl p-8 text-center transition-transform hover:-translate-y-1"
                style={{ backgroundColor: '#0f0f0f', border: '1px solid #262626' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ backgroundColor: '#262626' }}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">{link.label}</h3>
                <p className="mt-2 text-sm text-white/70">{t.ctaNote}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
