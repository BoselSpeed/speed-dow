# موقع تحميل تطبيق الفقه ⬇️

موقع **Static بالكامل** لعرض وتحميل تطبيق الفقه، بدون أي Backend أو قاعدة بيانات أو حسابات.

> ⚠️ قبل النشر: استبدل نطاق `example.com` في `index.html` و `robots.txt` و `sitemap.xml`، وحدّث بيانات `src/data/fileInfo.ts` و `src/data/updates.ts` عند إصدار نسخة جديدة.

## التقنيات

- React + TypeScript
- Vite (Static build → `site/`)
- Tailwind CSS
- وضع ليلي/نهاري (محفوظ في LocalStorage)

## بنية المشروع

```
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── data/
│   │   ├── siteConfig.ts     ← روابط التحميل الأربعة
│   │   ├── fileInfo.ts      ← معلومات الملف
│   │   └── updates.ts       ← سجل آخر التحديثات
│   ├── i18n/                ← جاهز لدعم لغات متعددة مستقبلًا
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
└── index.html               ← SEO / Open Graph / الوضع الليلي
```

## معلومات التطبيق

| البند | القيمة |
|---|---|
| الاسم | تطبيق الفقه |
| المعرّف | com.fiqh.app |
| الإصدار | 2.0.0 |
| المنصة | Android 7.0 وأحدث |
| الحجم | 76 MB |
| السعر | مجاني بالكامل |

## طريقة الاستخدام

### 1) إعداد روابط التحميل

افتح `src/data/siteConfig.ts` وعدّل روابط التحميل:

```ts
export const SITE_CONFIG = {
  appName: 'تطبيق الفقه',
  appNameEn: 'Fiqh App',
  downloadLinks: [
    { id: 'link1', label: 'الرابط الأول', href: 'PLACEHOLDER_LINK_1' },
    { id: 'link2', label: 'الرابط الثاني', href: 'PLACEHOLDER_LINK_2' },
    { id: 'link3', label: 'الرابط الثالث', href: 'PLACEHOLDER_LINK_3' },
    { id: 'link4', label: 'الرابط الرابع', href: 'PLACEHOLDER_LINK_4' },
  ],
  primaryColor: '#000000',
  accentColor: '#3b82f6',
}
```

> لا ترفع أي ملف APK أو IPA داخل المشروع. استخدم الروابط الخارجية فقط.

### 2) تعديل معلومات الملف

افتح `src/data/fileInfo.ts` وعدّل:

```ts
export const fileInfo = {
  name: 'تطبيق الفقه',
  description: 'تطبيق الفقه بأحدث إصدار، متاح للتحميل المباشر.',
  version: '2.0.0',
  size: '76 MB',
  fileType: 'APK',
  lastUpdated: '3 أكتوبر 2026',
  fileName: 'تطبيق-الفقه.apk',
}
```

### 3) إضافة تحديث جديد

افتح `src/data/updates.ts` وأضف إصدارًا جديدًا في البداية (الأحدث أولًا):

```ts
{
  version: '2.0.0',
  description: 'وصف التحديث الجديد',
  date: '3 أكتوبر 2026',
},
```

### 4) البناء والنشر

```bash
npm install
npm run build      # ينتج مجلد site/ كاملًا (موقع Static جاهز)
```

انشر محتويات مجلد `site/` — وهو مجلد **مستقل** يحتوي الموقع Static كاملًا (HTML + CSS + JS) — على أي استضافة تدعم المواقع Static (Netlify، Vercel، GitHub Pages، VPS…).

## تخصيص إضافي

| ماذا | أين |
|---|---|
| عنوان الصفحة ووصفها و Open Graph | `index.html` |
| رابط الموقع في `robots.txt` و `sitemap.xml` | استبدل `example.com` بنطاقك |
| ألوان الوضعين الفاتح والداكن | متغيرات `--color-*` في `src/index.css` |
| نصوص الواجهة | `src/i18n/translations.ts` |

## دعم اللغات

البنية جاهزة للغات متعددة عبر `src/i18n/`. العربية هي اللغة الحالية (RTL). لإضافة لغة جديدة: أضف ترجمة `Translation` في `translations.ts` وحدّث `defaultLang` / منطق الاختيار.

## التعليمات والإرشادات

- نصوص أزرار الروابط في `src/i18n/translations.ts`.
- الروابط الأربعة معرفة في `src/data/siteConfig.ts` ويمكن تعديلها بسهولة.

## الإعلانات

- السكربت العام للشبكة الإعلانية (Adsterra) موضوع في نهاية `index.html` قبل `</body>`.
- المربعات معروضة عبر مكوّن `src/components/AdSlot.tsx` باستخدام `iframe srcdoc` لعزل `atOptions` لكل موضع، مع عنوان «إعلان» — حاليًا ثلاثة مواضع: مربع في الأعلى فوق القسم، ومربعان متجاوران أحدهما يمين «آخر التحديثات» والآخر يساره في الشاشات المتوسطة فأكبر، وتُصطف عموديًا في الهاتف.
- لإضافة/إزالة/تعديل المعرضات: عدّل `App.tsx` (أسطر `<AdSlot adKey="…" />`). العزل بـ srcdoc يسمح بتكرار الرمز في عدة مواضع، وإن كانت بعض الشبكات تفضّل كودًا منفصلًا لكل موضع لأغراض التقارير.

## ملاحظات أمنية

- لا توجد أي معلومات سرية داخل الموقع.
- لا يوجد نظام حماية أو تسجيل دخول — الموقع Static بسيط تعتمد عليه فقط.
- لا يتم رفع أي ملف تطبيق داخل المشروع؛ الروابط خارجية فقط.
