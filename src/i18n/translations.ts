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
  installTitle: string
  installStep1Title: string
  installStep1Body: string
  installStep2Title: string
  installStep2Body: string
  installStep3Title: string
  installStep3Body: string
  installStep4Title: string
  installStep4Body: string
  installDismiss: string
  installShowAgain: string
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
    installTitle: 'خطوات تعطيل Play Protect وتنزيل التطبيق على جهازك (Android)',
    installStep1Title: 'الخطوة 1 — فعّل "مصادر مجهولة" (مصدر التطبيق)',
    installStep1Body: 'افتح الإعدادات ← التطبيقات والتنبيهات (أو "التطبيقات") ← اضغط على إعدادات التطبيقات المتخصصة (في أسفل الشاشة) ← اضغط على "تطبيق غير معروف" (أو "تثبيت تطبيقات غير معروفة") ← اختر المتصفح الذي تستخدمه (مثل Chrome) ← فعّل "السماح من هذا المصدر".',
    installStep2Title: 'الخطوة 2 — عطّل حماية Play Protect مؤقتًا',
    installStep2Body: 'افتح Google Play Store ← اضغط على صورة حسابك (أعلى اليمين) ← اضغط على Play Protect ← اضغط على ⚙ الإعدادات (أعلى اليمين) ← أوقف "فحص تطبيقات على جهازك" — ستظهر رسالة تأكيد، اختر أي سبب أو اتركه فارغًا ← أوقف أيضًا "حماية تطبيقات ضارة" (إذا كان مفعلاً).',
    installStep3Title: 'الخطوة 3 — ثبّت التطبيق',
    installStep3Body: 'افتح المجلد الذي حفظت فيه الملف "{fileName}" ← اضغط على الملف ← اضغط "تثبيت" (قد تظهر رسالة "تثبيت مرفوض" — اضغط "تثبيت على أي حال") ← إذا ظهرت رسالة "هذه الإصدار من Google Play Protect..." اضغط "تجاهل" أو "تثبيت على أي حال" ← اضغط "فتح" بعد الانتهاء.',
    installStep4Title: 'الخطوة 4 — أعد تفعيل Play Protect',
    installStep4Body: 'عد إلى Google Play Store ← صورة الحساب ← Play Protect ← فعّل "فحص تطبيقات على جهازك" من جديد ← فعّل "حماية تطبيقات ضارة".',
    installDismiss: 'فهمت، أُكمل',
    installShowAgain: 'إعادة عرض خطوات التثبيت',
  },
}

export const defaultLang: Lang = 'ar'