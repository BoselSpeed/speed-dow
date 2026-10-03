import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'
import Reveal from './Reveal'

export default function Cta() {
  const { t } = useI18n()

  return (
    <section id="download" className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">{t.ctaEyebrow}</span>
            <h2 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">{t.ctaTitle}</h2>
            <p className="mt-4 text-lg text-gray-400">{t.ctaSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SITE_CONFIG.downloadLinks.map((link, i) => (
            <Reveal key={link.id} delay={i * 100}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/10 hover:-translate-y-2"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-gray-400 text-black transition-transform duration-500 group-hover:scale-110">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">{link.label}</h3>
                <p className="mt-2 text-sm text-gray-400">{t.ctaNote}</p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
