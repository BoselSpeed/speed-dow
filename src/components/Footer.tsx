import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'

export default function Footer() {
  const { t, lang } = useI18n()

  const links = [
    { href: '#about', label: t.navAbout },
    { href: '#features', label: t.navFeatures },
    { href: '#contents', label: t.contentsAnchor },
    { href: '#screenshots', label: t.navScreenshots },
    { href: '#how', label: t.howAnchor },
    { href: '#faq', label: t.navFaq },
  ]

  return (
    <footer className="border-t py-12" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs text-center md:text-left">
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              <img src="/assets/icons/app-icon-512.png" alt={t.heroTitle} className="h-9 w-9 rounded-xl" />
              <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{t.heroTitle}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t.footerTagline}</p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-3 font-bold" style={{ color: 'var(--color-text)' }}>{t.footerLinksTitle}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm transition-colors" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-3 font-bold" style={{ color: 'var(--color-text)' }}>{lang === 'ar' ? 'التنزيل' : 'Download'}</h4>
            <a href={SITE_CONFIG.downloadUrl} download className="btn-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold">
              {t.heroDownload}
            </a>
            <p className="mt-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{t.downloadableNote}</p>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
          © {new Date().getFullYear()} {t.heroTitle}. {t.footerRights}
        </div>
      </div>
    </footer>
  )
}
