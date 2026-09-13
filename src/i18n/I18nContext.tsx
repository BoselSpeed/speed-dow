import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { defaultLang, translations, Translation } from './translations'
import type { Lang } from './translations'

interface I18nContextValue {
  lang: Lang
  t: Translation
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nContextValue>({
  lang: defaultLang,
  t: translations[defaultLang],
  setLang: () => {},
})

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem('lang')
    if (stored === 'ar' || stored === 'en') return stored
    const nav = navigator.language?.toLowerCase() || ''
    if (nav.startsWith('en')) return 'en'
  } catch {
    /* ignore */
  }
  return defaultLang
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang)

  useEffect(() => {
    setLangState(detectLang())
  }, [])

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {
      /* ignore */
    }
  }

  const t = translations[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>{children}</I18nContext.Provider>
  )
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext)
}
