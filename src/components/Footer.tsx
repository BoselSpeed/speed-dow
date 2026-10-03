import { useI18n } from '../i18n/I18nContext'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="relative overflow-hidden bg-black py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/assets/icons/app-icon-192.png" alt={t.heroTitle} className="h-12 w-12 rounded-2xl object-cover" />
              <span className="text-2xl font-bold text-white">{t.heroTitle}</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-[1.8] text-gray-400">{t.footerTagline}</p>
            <div className="mt-8">
              <a
                href="#download"
                className="btn-primary inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-black"
              >
                {t.heroDownload}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400">{t.footerLinksTitle}</h4>
            <ul className="mt-6 space-y-4">
              {[
                { href: '#home', label: t.navHome },
                { href: '#about', label: t.navAbout },
                { href: '#features', label: t.navFeatures },
                { href: '#faq', label: t.navFaq },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-gray-400 transition-colors duration-300 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400">{t.switchLangLabel}</h4>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {}}
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/10"
              >
                العربية
              </button>
              <button
                onClick={() => {}}
                className="rounded-xl border border-white/10 bg-transparent px-5 py-2.5 text-sm font-semibold text-gray-400 transition-all duration-300 hover:border-white/20 hover:text-white"
              >
                English
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-gray-500">{t.footerRights} تصميم وتطوير بوشليف SpeedDown © 2026</p>
        </div>
      </div>
    </footer>
  )
}
