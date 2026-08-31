import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home', label: t.navHome },
    { href: '#about', label: t.navAbout },
    { href: '#features', label: t.navFeatures },
    { href: '#screenshots', label: t.navScreenshots },
    { href: '#faq', label: t.navFaq },
  ]

  const barStyle = scrolled
    ? { backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', boxShadow: '0 6px 24px -18px rgba(22,22,255,.4)' }
    : { backgroundColor: 'transparent' }

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-all"
      style={barStyle}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <img src="/assets/icons/app-icon-512.png" alt={t.heroTitle} className="h-9 w-9 rounded-xl" />
          <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{t.heroTitle}</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors"
            style={{ color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-soft)' }}
            title={t.switchLangLabel}
          >
            {t.switchLangLabel}
          </button>
          <ThemeToggle />
          <a
            href={SITE_CONFIG.downloadUrl}
            download
            className="btn-primary hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold sm:inline-flex"
          >
            {t.heroDownload}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 lg:hidden"
            style={{ backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text)' }}
            aria-label="القائمة"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t px-4 py-3" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium"
                style={{ color: 'var(--color-text)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={SITE_CONFIG.downloadUrl}
              download
              onClick={() => setOpen(false)}
              className="btn-primary rounded-lg px-4 py-2.5 text-center font-semibold"
            >
              {t.heroDownload}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
