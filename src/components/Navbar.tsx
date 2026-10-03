import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
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
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? 'border-b border-white/10' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <a href="#home" className="flex items-center gap-3 group">
          <img src="/assets/icons/app-icon-192.png" alt={t.heroTitle} className="h-10 w-10 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105" />
          <span className="text-lg font-bold tracking-tight text-white">{t.heroTitle}</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            title={t.switchLangLabel}
          >
            {t.switchLangLabel}
          </button>
          <ThemeToggle />
          <a
            href="#download"
            className="btn-primary hidden items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black sm:inline-flex"
          >
            {t.heroDownload}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-white/20 bg-white/5 p-2 lg:hidden backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            aria-label="القائمة"
          >
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl flex flex-col gap-4 px-5 py-6 sm:px-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white py-2"
                style={{ color: 'var(--color-text)' }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="btn-primary rounded-xl bg-white px-4 py-3 text-center font-bold text-black"
            >
              {t.heroDownload}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
