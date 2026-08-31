import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t" style={{ backgroundColor: '#000000', color: '#ffffff', borderColor: '#262626' }}>
      <div className="geo-grid pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/assets/icons/app-icon-192.png" alt={t.heroTitle} className="h-10 w-10 rounded-xl object-cover" />
              <span className="text-xl font-bold">{t.heroTitle}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-[1.8]" style={{ color: '#9ca3af' }}>{t.footerTagline}</p>
            <a
              href={SITE_CONFIG.downloadUrl}
              download
              className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
            >
              {t.heroDownload}
            </a>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>{t.footerLinksTitle}</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: '#home', label: t.navHome },
                { href: '#about', label: t.navAbout },
                { href: '#features', label: t.navFeatures },
                { href: '#screenshots', label: t.navScreenshots },
                { href: '#faq', label: t.navFaq },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm transition-colors duration-200 hover:text-white" style={{ color: '#9ca3af' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#9ca3af' }}>{t.switchLangLabel}</h4>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {}}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
              >
                العربية
              </button>
              <button
                onClick={() => {}}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold"
                style={{ backgroundColor: 'transparent', color: '#9ca3af', border: '1px solid #262626' }}
              >
                English
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t pt-6" style={{ borderColor: '#262626' }}>
          <p className="text-center text-xs" style={{ color: '#6b7280' }}>{t.footerRights}</p>
        </div>
      </div>
    </footer>
  )
}
