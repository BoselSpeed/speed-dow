import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

interface Book {
  ar: string
  en: string
  cat: string
  cover?: string
  multi?: boolean
}

const BOOKS: Book[] = [
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

const CAT_COLORS: Record<string, string> = {
  'Tawhid': '#000000',
  'Aqeedah': '#3b82f6',
  'Tafsir': '#4b5563',
  'Hadith': '#6b7280',
  'Stories': '#3b82f6',
}

const CAT_TRANSLATION: Record<string, { ar: string; en: string }> = {
  Tawhid: { ar: 'التوحيد', en: 'Tawhid' },
  Aqeedah: { ar: 'العقيدة', en: 'Aqeedah' },
  Tafsir: { ar: 'التفسير', en: 'Tafsir' },
  Hadith: { ar: 'الحديث', en: 'Hadith' },
  Stories: { ar: 'قصص', en: 'Stories' },
}

export default function Contents() {
  const { t, lang } = useI18n()

  const pillars = [
    { icon: '📚', title: t.contentsBooksTitle, desc: t.contentsBooksDesc },
    { icon: '📖', title: t.contentsReadingTitle, desc: t.contentsReadingDesc },
    { icon: '🗂️', title: t.contentsVolumesTitle, desc: t.contentsVolumesDesc },
    { icon: '📴', title: t.contentsOfflineTitle, desc: t.contentsOfflineDesc },
    { icon: '🌐', title: t.contentsLanguagesTitle, desc: t.contentsLanguagesDesc },
  ]

  return (
    <section id="contents" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{t.contentsEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.contentsTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.contentsSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="card h-full rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                  {p.icon}
                </div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{p.title}</h3>
                <p className="mt-2 text-sm leading-[1.8]" style={{ color: 'var(--color-text-secondary)' }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 rounded-2xl p-7 sm:p-9" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <h3 className="text-center text-xl font-bold" style={{ color: 'var(--color-text)' }}>{t.contentsBooksTitle}</h3>
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {BOOKS.map((b) => {
                const cat = CAT_TRANSLATION[b.cat]?.[lang] ?? b.cat
                const name = lang === 'ar' ? b.ar : b.en
                return (
                  <div key={b.ar} className="group flex flex-col items-start overflow-hidden rounded-xl p-3 transition-all duration-300" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                    {b.cover ? (
                      <img src={b.cover} alt={name} className="mb-2 h-24 w-full rounded-lg object-cover" loading="lazy" />
                    ) : (
                      <div className="mb-2 flex h-24 w-full items-center justify-center rounded-lg text-3xl" style={{ backgroundColor: 'var(--color-bg)' }}>📕</div>
                    )}
                    <span className="mb-1 text-[10px] font-bold uppercase tracking-wide" style={{ color: CAT_COLORS[b.cat] }}>{cat}</span>
                    <span className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>{name}</span>
                    {b.multi && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-soft)' }}>
                        {lang === 'ar' ? 'متعدد المجلدات' : 'Multi-volume'}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
