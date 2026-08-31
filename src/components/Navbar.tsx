import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b border-[var(--color-border)]' : ''}`}
      style={{ backgroundColor: scrolled ? 'var(--color-bg)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-10">
        <a href="#home" className="flex items-center gap-3 group">
          <img src="/assets/icons/app-icon-192.png" alt={t.heroTitle} className="h-9 w-9 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105" />
          <span className="text-lg font-bold tracking-tight" style={{ color: scrolled ? 'var(--color-text)' : 'var(--color-text)' }}>{t.heroTitle}</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-200"
            style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
            title={t.switchLangLabel}
          >
            {t.switchLangLabel}
          </button>
          <ThemeToggle />
          <a
            href={SITE_CONFIG.downloadUrl}
            download
            className="btn-primary hidden items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold sm:inline-flex"
          >
            {t.heroDownload}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 lg:hidden transition-colors duration-200"
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
        <div className="border-t lg:hidden" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <div className="mx-auto max-w-7xl flex flex-col gap-3 px-5 py-4 sm:px-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium py-2"
                style={{ color: 'var(--color-text)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={SITE_CONFIG.downloadUrl}
              download
              onClick={() => setOpen(false)}
              className="btn-primary rounded-lg px-4 py-3 text-center font-bold"
            >
              {t.heroDownload}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
