# موقع تحميل ملف واحد ⬇️

موقع **Static بالكامل** لعرض وتحميل ملف واحد فقط، بدون أي Backend أو قاعدة بيانات أو حسابات.

> ⚠️ قبل النشر: استبدل نطاق `example.com` في `index.html` و `robots.txt` و `sitemap.xml`، وحدّث بيانات `src/data/fileInfo.ts` و `src/data/updates.ts` عند إصدار نسخة جديدة.

## التقنيات

- React + TypeScript
- Vite (Static build → `site/`)
- Tailwind CSS
- وضع ليلي/نهاري (محفوظ في LocalStorage)

## بنية المشروع

```
├── public/
│   ├── downloads/
│   │   └── تطبيق-الفقه.apk   ← ملف التحميل (استبدله بنفس الاسم)
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── data/
│   │   ├── fileInfo.ts      ← معلومات الملف (اسم، إصدار، حجم، نوع…)
│   │   └── updates.ts       ← سجل آخر التحديثات
│   ├── i18n/                ← جاهز لدعم لغات متعددة مستقبلًا
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
└── index.html               ← SEO / Open Graph / الوضع الليلي
```

## طريقة الاستخدام

### 1) وضع ملف التحميل

استبدل الملف الموجود داخل `public/downloads/` بملفك الجديد **بنفس الاسم** الذي حددته في `fileInfo.ts` (حقل `fileName`، حاليًا `تطبيق-الفقه.apk`).

> الملف الحالي هو نسخة APK من «تطبيق الفقه» بحجم 85.5 MB.

### 2) تعديل معلومات الملف

افتح `src/data/fileInfo.ts` وعدّل:

```ts
export const fileInfo = {
  name: 'تطبيق الفقه',
  description: 'تطبيق الفقه بأحدث إصدار، متاح للتحميل المباشر.',
  version: '1.0.0',
  size: '85.5 MB',
  fileType: 'APK',
  lastUpdated: '29 أغسطس 2026',
  fileName: 'تطبيق-الفقه.apk', // ← يجب أن يطابق اسم الملف داخل public/downloads/
}
```

### 3) إضافة تحديث جديد

افتح `src/data/updates.ts` وأضف إصدارًا جديدًا في البداية (الأحدث أولًا):

```ts
{
  version: '2.1.0',
  description: 'وصف التحديث الجديد',
  date: '30 أغسطس 2026',
},
```

### 4) البناء والنشر

```bash
npm install
npm run build      # ينتج مجلد site/ كاملًا (موقع Static جاهز)
```

انشر محتويات مجلد `site/` — وهو مجلد **مستقل** يحتوي الموقع Static كاملًا (HTML + CSS + JS + ملف التحميل) — على أي استضافة تدعم المواقع Static (Netlify، Vercel، GitHub Pages، VPS…).

## تخصيص إضافي

| ماذا | أين |
|---|---|
| عنوان الصفحة ووصفها و Open Graph | `index.html` |
| رابط الموقع في `robots.txt` و `sitemap.xml` | استبدل `example.com` بنطاقك |
| ألوان الوضعين الفاتح والداكن | متغيرات `--color-*` في `src/index.css` |
| نصوص الواجهة | `src/i18n/translations.ts` |

## دعم اللغات

البنية جاهزة للغات متعددة عبر `src/i18n/`. العربية هي اللغة الحالية (RTL). لإضافة لغة جديدة: أضف ترجمة `Translation` في `translations.ts` وحدّث `defaultLang` / منطق الاختيار.

## الإعلانات

- السكربت العام للشبكة الإعلانية (Adsterra) موضوع في نهاية `index.html` قبل `</body>`.
- مربع الإعلان (160×300) معروض بأسفل بطاقة التحميل عبر مكوّن `src/components/AdSlot.tsx` باستخدام `iframe srcdoc` لعزل `atOptions` لكل موضع، مع عنوان «إعلان».
- لتغيير كود المربع أو إضافة مربعات أخرى: عدّل `App.tsx` (سطر `<AdSlot adKey="…" />`) — كل موضع يتطلب كودًا مختلفًا من لوحة Adsterra (لا يعيد استخدام نفس الكود في أكثر من موضع).

## ملاحظات أمنية

- لا توجد أي معلومات سرية داخل الموقع.
- الملف داخل `public/downloads/` متاح للتحميل المباشر لأي زائر وهذا مقصود.
- لا يوجد نظام حماية أو تسجيل دخول — الموقع Static بسيط تعتمد عليه فقط.