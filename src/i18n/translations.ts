export type Lang = 'ar'

export interface Translation {
  dir: 'rtl' | 'ltr'
  siteTitle: string
  download: string
  versionLabel: string
  sizeLabel: string
  typeLabel: string
  lastUpdatedLabel: string
  latestUpdates: string
  themeDarkTitle: string
  themeLightTitle: string
  themeDarkLabel: string
  themeLightLabel: string
}

export const translations: Record<Lang, Translation> = {
  ar: {
    dir: 'rtl',
    siteTitle: 'تحميل الملف',
    download: 'تحميل الملف',
    versionLabel: 'الإصدار',
    sizeLabel: 'الحجم',
    typeLabel: 'النوع',
    lastUpdatedLabel: 'آخر تحديث',
    latestUpdates: 'آخر التحديثات',
    themeDarkTitle: 'الوضع الداكن',
    themeLightTitle: 'الوضع الفاتح',
    themeDarkLabel: 'تفعيل الوضع الداكن',
    themeLightLabel: 'تفعيل الوضع الفاتح',
  },
}

export const defaultLang: Lang = 'ar'