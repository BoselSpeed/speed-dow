import { createContext, ReactNode, useContext } from 'react'
import { defaultLang, translations, Translation } from './translations'

const I18nContext = createContext<Translation>(translations[defaultLang])

export function I18nProvider({ children }: { children: ReactNode }) {
  const t = translations[defaultLang]

  document.documentElement.lang = defaultLang
  document.documentElement.dir = t.dir

  return <I18nContext.Provider value={t}>{children}</I18nContext.Provider>
}

export function useI18n(): Translation {
  return useContext(I18nContext)
}