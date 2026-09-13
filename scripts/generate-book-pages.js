import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(process.cwd(), 'public/books')
const SITE_URL = 'https://speed-dow.surge.sh'
const APP_DOWNLOAD = '/downloads/تطبيق-الفقه.apk'

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toSlug(ar) {
  return ar
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const BOOKS = [
  { ar: 'كتاب التوحيد', en: 'Kitab at-Tawhid', cat: 'Tawhid', cover: '/assets/screens/kitab-al-tawhid.jpg' },
  { ar: 'ثلاثة الأصول', en: 'The Three Fundamental Principles', cat: 'Aqeedah' },
  { ar: 'العقيدة الواسطية', en: 'Al-Aqidah al-Wasitiyyah', cat: 'Aqeedah', cover: '/assets/screens/al-aqidah-al-wasitiyyah.jpg' },
  { ar: 'كشف الشبهات', en: 'Kashf ash-Shubuhat', cat: 'Aqeedah', cover: '/assets/screens/kashf-al-shubuhat.jpg' },
  { ar: 'تفسير البغوي', en: 'Tafsir al-Baghawi', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-al-baghawi.jpg' },
  { ar: 'مسند أبي داود', en: 'Musnad Abi Dawud', cat: 'Hadith', cover: '/assets/screens/musnad-abi-dawud.jpg' },
  { ar: 'صحيح البخاري', en: 'Sahih al-Bukhari', cat: 'Hadith', cover: '/assets/screens/sahih-al-bukhari.jpg', multi: true },
  { ar: 'صحيح مسلم', en: 'Sahih Muslim', cat: 'Hadith', multi: true, cover: '/assets/screens/sahih-muslim.jpg' },
  { ar: 'سنن النسائي', en: "Sunan an-Nasa'i", cat: 'Hadith', cover: '/assets/screens/sunan-al-nasai.jpg' },
  { ar: 'سنن الترمذي', en: "Sunan at-Tirmidhi", cat: 'Hadith', cover: '/assets/screens/sunan-al-tirmidhi.jpg' },
  { ar: 'تفسير القرطبي', en: 'Tafsir al-Qurtubi', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-al-qurtubi.jpg' },
  { ar: 'تفسير الطبري', en: 'Tafsir at-Tabari', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-al-tabari.jpg' },
  { ar: 'تفسير الشوكاني', en: 'Tafsir ash-Shawkani', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-al-shawkani.jpg' },
  { ar: 'تفسير ابن كثير', en: 'Tafsir Ibn Kathir', cat: 'Tafsir', multi: true, cover: '/assets/screens/tafsir-ibn-kathir.jpg' },
  { ar: '50 قصة من صحيح البخاري', en: '50 Stories from Sahih al-Bukhari', cat: 'Stories', cover: '/assets/screens/qisas-min-sahih-al-bukhari.jpg' },
]

const CAT_TRANSLATION = {
  Tawhid: { ar: 'التوحيد', en: 'Tawhid' },
  Aqeedah: { ar: 'العقيدة', en: 'Aqeedah' },
  Tafsir: { ar: 'التفسير', en: 'Tafsir' },
  Hadith: { ar: 'الحديث', en: 'Hadith' },
  Stories: { ar: 'قصص', en: 'Stories' },
}

const BOOK_DESCRIPTIONS = {
  'كتاب التوحيد': {
    ar: 'كتاب التوحيد هو أحد أهم الكتب في علم التوحيد، يشرح أركان الإيمان بالله تعالى ويبين نواقض الإسلام بأسلوب واضح ومنظم.',
    en: 'Kitab at-Tawhid is one of the most important books in Islamic monotheism, explaining the pillars of faith in Allah in a clear and organized manner.',
  },
  'ثلاثة الأصول': {
    ar: 'كتاب Three Fundamental Principles يشرح الأصول الثلاثة التي يجب على كل مسلم معرفتها: معرفة الله، معرفة دينه، معرفة نبيه.',
    en: 'The Three Fundamental Principles explains the three essential principles every Muslim must know: knowledge of Allah, knowledge of the religion, and knowledge of the Prophet.',
  },
  'العقيدة الواسطية': {
    ar: 'العقيدة الواسطية لابن تيمية هي متن عقيدة متوسط الحجم، يشرح أصول العقيدة الإسلامية بأسلوب موجز وواضح.',
    en: 'Al-Aqidah al-Wasitiyyah by Ibn Taymiyyah is a medium-length creedal text explaining the fundamentals of Islamic belief in a concise manner.',
  },
  'كشف الشبهات': {
    ar: 'كشف الشبهات يرد على الشبهات المتعلقة بالتوحيد والعقيدة، ويبين الحق من الباطل بأدلة واضحة من الكتاب والسنة.',
    en: 'Kashf ash-Shubuhat responds to doubts related to monotheism and creed, distinguishing truth from falsehood with clear evidence from the Quran and Sunnah.',
  },
  'تفسير البغوي': {
    ar: 'تفسير البغوي (معالم التنزيل) من أقدم وأشهر التفاسير المعتمدة، يجمع بين التفسير بالمأثور والرأي بأسلوب منظم.',
    en: 'Tafsir al-Baghawi (Ma\'alim at-Tanzil) is one of the oldest and most renowned Quranic interpretations, combining transmitted and rational exegesis.',
  },
  'مسند أبي داود': {
    ar: 'مسند أبي داود هو أحد الكتب الستة في السنة النبوية، يضم أحاديث النبي صلى الله عليه وسلم مرتبة على أبواب الفقه.',
    en: 'Musnad Abi Dawud is one of the six major books of Hadith, containing Prophetic traditions organized by chapters of jurisprudence.',
  },
  'صحيح البخاري': {
    ar: 'صحيح البخاري هو أصح كتاب بعد القرآن الكريم، جمعه الإمام البخاري بأدنى صحيح، ويعد المرجع الأول في السنة النبوية.',
    en: 'Sahih al-Bukhari is the most authentic book after the Quran, compiled by Imam Bukhari with rigorous standards, serving as the primary reference for Prophetic traditions.',
  },
  'صحيح مسلم': {
    ar: 'صحيح مسلم هو الثاني من الكتب الستة الصحيحة، اشتهر بدقته في الأسانيد وانتقاءه للأحاديث الصحيحة.',
    en: 'Sahih Muslim is the second of the six authentic Hadith collections, renowned for its precise chains of narration and careful selection of authentic traditions.',
  },
  'سنن النسائي': {
    ar: 'سنن النسائي هو أحد كتب السنة النبوية الستة، يتميز بترتيب الأبواب الفقهية واهتمامه بالأحاديث الصحيحة.',
    en: 'Sunan an-Nasa\'i is one of the six major Hadith collections, distinguished by its organization into juristic chapters and focus on authentic traditions.',
  },
  'سنن الترمذي': {
    ar: 'سنن الترمذي هو كتاب السنن، يضم أحاديث النبي صلى الله عليه وسلم مع شرحها وتخريجها.',
    en: 'Sunan at-Tirmidhi is a Hadith collection containing Prophetic traditions with explanations and verification.',
  },
  'تفسير القرطبي': {
    ar: 'تفسير القرطبي (الجامع لأحكام القرآن) من أروع التفاسير الفقهية، يربط بين التفسير وأحكام الشريعة الإسلامية.',
    en: 'Tafsir al-Qurtubi (Al-Jami\' li-Ahkam al-Quran) is one of the finest juristic exegeses, linking Quranic interpretation with Islamic legal rulings.',
  },
  'تفسير الطبري': {
    ar: 'تفسير الطبري (جامع البيان عن تأويل آي القرآن) من أقدم التفاسير العربية، يعتمد على التفسير بالمأثور من الصحابة والتابعين.',
    en: 'Tafsir at-Tabari (Jami\' al-Bayan \'an Ta\'wil Ay al-Quran) is one of the earliest Arabic exegeses, relying on transmitted interpretations from the Companions and Followers.',
  },
  'تفسير الشوكاني': {
    ar: 'تفسير الشوكاني (فتح القدير) من التفاسير الحديثية المعتمدة، يهتم بالتفسير بالمأثور واللغة العربية.',
    en: 'Tafsir ash-Shawkani (Fath al-Qadir) is a modern exegesis focusing on transmitted interpretation and Arabic linguistics.',
  },
  'تفسير ابن كثير': {
    ar: 'تفسير ابن كثير من أشهر التفاسير الحديثية، يهتم بتبسيط التفسير وتقريبه للقارئ مع الاعتماد على الأحاديث الصحيحة.',
    en: 'Tafsir Ibn Kathir is one of the most famous modern exegeses, simplifying interpretation for readers while relying on authentic Hadith.',
  },
  '50 قصة من صحيح البخاري': {
    ar: 'مجموعة مختارة من خمسين قصة من صحيح البخاري، تعرض دروسًا وعبرًا من حياة النبي صلى الله عليه وسلم وصحابته.',
    en: 'A selected collection of fifty stories from Sahih al-Bukhari, presenting lessons and examples from the life of the Prophet and his Companions.',
  },
}

function generateBookPage(book) {
  const slug = toSlug(book.ar)
  const titleAr = book.ar
  const titleEn = book.en
  const categoryAr = CAT_TRANSLATION[book.cat]?.ar ?? book.cat
  const categoryEn = CAT_TRANSLATION[book.cat]?.en ?? book.cat
  const descriptionAr = BOOK_DESCRIPTIONS[book.ar]?.ar ?? `كتاب ${book.ar} من تطبيق كتب الفقه.`
  const descriptionEn = BOOK_DESCRIPTIONS[book.ar]?.en ?? `Book ${book.en} from the Fiqh App.`
  const cover = book.cover ? `${SITE_URL}${book.cover}` : ''
  const url = `${SITE_URL}/books/${slug}`

  const html = `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/assets/icons/app-icon-192.png" />
    <meta name="theme-color" content="#000000" />
    <title>${escapeHtml(titleAr)} | كتب الفقه</title>
    <meta name="description" content="${escapeHtml(descriptionAr)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(titleAr)} | كتب الفقه" />
    <meta property="og:description" content="${escapeHtml(descriptionAr)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="كتب الفقه" />
    ${cover ? `<meta property="og:image" content="${cover}" />` : ''}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(titleAr)} | كتب الفقه" />
    <meta name="twitter:description" content="${escapeHtml(descriptionAr)}" />
    ${cover ? `<meta name="twitter:image" content="${cover}" />` : ''}

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

    <style>
      :root {
        --bg: #ffffff;
        --surface: #fafafa;
        --surface2: #f3f4f6;
        --text: #000000;
        --text-secondary: #4b5563;
        --border: #e5e7eb;
        --primary: #000000;
        --accent: #3b82f6;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Cairo', system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.8;
        -webkit-font-smoothing: antialiased;
      }
      .container { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; }
      .card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 1rem;
        padding: 2rem;
        margin-top: 2rem;
      }
      .badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 700;
        background: var(--surface2);
        color: var(--text-secondary);
        border: 1px solid var(--border);
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        background: var(--primary);
        color: #fff;
        text-decoration: none;
        font-weight: 700;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px -10px rgba(0,0,0,0.18); }
      .cover {
        width: 100%;
        max-width: 220px;
        border-radius: 0.75rem;
        box-shadow: 0 10px 30px -12px rgba(0,0,0,0.18);
        border: 1px solid var(--border);
      }
      a { color: var(--accent); text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Book",
      "name": "${escapeHtml(titleAr)}",
      "inLanguage": "ar",
      "genre": "${escapeHtml(categoryAr)}",
      "description": "${escapeHtml(descriptionAr)}",
      "url": "${url}",
      "isPartOf": { "@type": "WebSite", "name": "كتب الفقه", "url": "${SITE_URL}/" }
      ${cover ? `, "image": "${cover}"` : ''}
    }
    </script>
  </head>
  <body>
    <div class="container">
      <nav style="margin-bottom: 1.5rem;">
        <a href="/" style="font-weight: 700;">← كتب الفقه</a>
      </nav>

      <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
        <div style="flex: 1 1 220px; max-width: 260px;">
          ${book.cover ? `<img src="${book.cover}" alt="${escapeHtml(titleAr)}" class="cover" loading="eager" />` : '<div class="cover" style="height: 320px; display:flex; align-items:center; justify-content:center; font-size: 4rem;">📕</div>'}
        </div>
        <div style="flex: 1 1 280px;">
          <span class="badge">${escapeHtml(categoryAr)}</span>
          <h1 style="font-size: 1.75rem; font-weight: 800; margin-top: 0.75rem; line-height: 1.3;">${escapeHtml(titleAr)}</h1>
          <p style="margin-top: 1rem; color: var(--text-secondary);">${escapeHtml(descriptionAr)}</p>
          <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <a href="${APP_DOWNLOAD}" download class="btn">تنزيل التطبيق</a>
            <a href="/" class="btn" style="background: var(--surface2); color: var(--text); border: 1px solid var(--border);">العودة للمكتبة</a>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem;">عن الكتاب</h2>
        <p style="color: var(--text-secondary);">${escapeHtml(descriptionAr)}</p>
        <p style="margin-top: 0.75rem; color: var(--text-secondary); font-size: 0.9rem;">
          يمكنك قراءة هذا الكتاب داخل تطبيق <strong>كتب الفقه</strong> بعد تنزيل التطبيق.
          يدعم التطبيق القراءة دون اتصال بالإنترنت للمحتوى المرفق مع التطبيق.
        </p>
      </div>

      <div class="card">
        <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem;">كيفية القراءة</h2>
        <ol style="padding-right: 1.25rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem;">
          <li>اضغط زر <strong>تنزيل التطبيق</strong> لتحميل ملف التطبيق.</li>
          <li>ثبّت التطبيق على جهازك.</li>
          <li>افتح التطبيق وابحث عن الكتاب في المكتبة.</li>
          <li>ابدأ القراءة مباشرة داخل التطبيق.</li>
        </ol>
      </div>

      <footer style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); text-align: center; color: var(--text-secondary); font-size: 0.8rem;">
        <p>© كتب الفقه. جميع الحقوق محفوظة.</p>
        <p style="margin-top: 0.25rem;">
          <a href="/">الرئيسية</a> ·
          <a href="/#about">عن التطبيق</a> ·
          <a href="/#features">المميزات</a> ·
          <a href="/#faq">الأسئلة الشائعة</a>
        </p>
      </footer>
    </div>
  </body>
</html>`

  return html
}

function generate404() {
  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/assets/icons/app-icon-192.png" />
    <meta name="theme-color" content="#000000" />
    <title>الصفحة غير موجودة | كتب الفقه</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <style>
      :root { --bg: #ffffff; --text: #000000; --surface: #fafafa; --border: #e5e7eb; --accent: #3b82f6; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Cairo', system-ui, -apple-system, Segoe UI, Tahoma, Arial, sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; display: grid; place-items: center; padding: 2rem; }
      .box { text-align: center; max-width: 420px; }
      h1 { font-size: 3rem; font-weight: 800; }
      p { margin-top: 1rem; color: #4b5563; }
      a { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; border-radius: 0.75rem; background: #000; color: #fff; text-decoration: none; font-weight: 700; }
      a:hover { opacity: 0.9; }
    </style>
  </head>
  <body>
    <div class="box">
      <h1>404</h1>
      <p>عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <a href="/">العودة إلى الصفحة الرئيسية</a>
    </div>
  </body>
</html>`
}

function main() {
  for (const book of BOOKS) {
    const slug = toSlug(book.ar)
    const dir = path.join(OUT_DIR, slug)
    fs.mkdirSync(dir, { recursive: true })
    const file = path.join(dir, 'index.html')
    fs.writeFileSync(file, generateBookPage(book), 'utf-8')
    console.log(`Generated: /books/${slug}`)
  }

  const notFoundFile = path.resolve(process.cwd(), 'public/404.html')
  fs.writeFileSync(notFoundFile, generate404(), 'utf-8')
  console.log('Generated: /404.html')

  console.log(`\nTotal pages generated: ${BOOKS.length + 1}`)
}

main()
