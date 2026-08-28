# موقع تحميل ملف واحد ⬇️

موقع **Static بالكامل** لعرض وتحميل ملف واحد فقط، بدون أي Backend أو قاعدة بيانات أو حسابات.

> ⚠️ قبل النشر: استبدل ملف التحميل التجريبي (`my-file.zip`) بملفك الحقيقي، وعدّل بيانات `src/data/fileInfo.ts` و `src/data/updates.ts`، واستبدل نطاق `example.com` في `index.html` و `robots.txt` و `sitemap.xml`.

## التقنيات

- React + TypeScript
- Vite (Static build → `dist/`)
- Tailwind CSS
- وضع ليلي/نهاري (محفوظ في LocalStorage)

## بنية المشروع

```
├── public/
│   ├── downloads/
│   │   └── my-file.zip      ← ضع ملفك هنا (بنفس الاسم)
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

استبدل الملف الموجود داخل `public/downloads/` بملفك الحقيقي **بنفس الاسم** الذي حددته في `fileInfo.ts` (حقل `fileName`).

> يوجد حاليًا ملف Placeholder بالاسم `my-file.zip` ليعمل الموقع فورًا، استبدله عندما تجهّز ملفك.

### 2) تعديل معلومات الملف

افتح `src/data/fileInfo.ts` وعدّل:

```ts
export const fileInfo = {
  name: 'اسم الملف',
  description: 'وصف مختصر',
  version: '2.0.0',
  size: '250 MB',
  fileType: 'ZIP',
  lastUpdated: '29 أغسطس 2026',
  fileName: 'my-file.zip', // ← يجب أن يطابق اسم الملف داخل public/downloads/
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
npm run build      # ينتج مجلد dist/
```

انشر محتويات مجلد `dist/` على أي استضافة تدعم المواقع Static (Netlify، Vercel، GitHub Pages، VPS…).

## تخصيص إضافي

| ماذا | أين |
|---|---|
| عنوان الصفحة ووصفها و Open Graph | `index.html` |
| رابط الموقع في `robots.txt` و `sitemap.xml` | استبدل `example.com` بنطاقك |
| ألوان الوضعين الفاتح والداكن | متغيرات `--color-*` في `src/index.css` |
| نصوص الواجهة | `src/i18n/translations.ts` |

## دعم اللغات

البنية جاهزة للغات متعددة عبر `src/i18n/`. العربية هي اللغة الحالية (RTL). لإضافة لغة جديدة: أضف ترجمة `Translation` في `translations.ts` وحدّث `defaultLang` / منطق الاختيار.

## ملاحظات أمنية

- لا توجد أي معلومات سرية داخل الموقع.
- الملف داخل `public/downloads/` متاح للتحميل المباشر لأي زائر وهذا مقصود.
- لا يوجد نظام حماية أو تسجيل دخول — الموقع Static بسيط تعتمد عليه فقط.