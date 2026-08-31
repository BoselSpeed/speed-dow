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
  adLabel: string
  downloadGuideTitle: string
  downloadGuidePoint1: string
  downloadGuidePoint2: string
  downloadGuidePoint3: string
  downloadGuidePoint4: string
  downloadGuidePoint5: string
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
    adLabel: 'إعلان',
    downloadGuideTitle: 'تنبيه مهم: حمّل الملف بأمان',
    downloadGuidePoint1: 'تتم جميع عمليات التنزيل داخل هذه الصفحة حصريًا، ولن يُنقل تحميلك إلى أي نافذة أو موقع خارجي.',
    downloadGuidePoint2: 'زر «تحميل الملف» في بطاقة التحميل هو الزر الوحيد الذي يُنزّل الملف الحقيقي؛ إذ لا تتم عملية التنزيل أبدًا عبر الإعلانات.',
    downloadGuidePoint3: 'إذا رأيت في إعلان أو نافذة منبثقة أي زر «تنزيل» أو «مدير تنزيل» (Download Manager)، فاعلم أنه إعلان مضلل — أغلق تلك النافذة وارجع إلى هنا لإكمال تنزيلك.',
    downloadGuidePoint4: 'الملف الحقيقي حجمه كبير (يقارب {size})، بينما ملفات الإعلانات صغيرة جدًا لا تتجاوز بضعة ميغابايتات؛ فلا تنخدع بسرعة تحميلها.',
    downloadGuidePoint5: 'تحقق من اسم الملف الذي يصل إليك: يجب أن يكون «{fileName}». ونحن لا نعرض نوافذ «مدير التنزيل» المنبثقة أبدًا.',
  },
}

export const defaultLang: Lang = 'ar'