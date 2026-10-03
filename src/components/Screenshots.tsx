import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

export default function Screenshots() {
  const { t, lang } = useI18n()

  const books = [
    { ar: 'كتاب التوحيد', en: 'Kitab at-Tawhid', cover: '/assets/screens/kitab-al-tawhid.jpg' },
    { ar: 'العقيدة الواسطية', en: 'Al-Aqidah al-Wasitiyyah', cover: '/assets/screens/al-aqidah-al-wasitiyyah.jpg' },
    { ar: 'كشف الشبهات', en: 'Kashf ash-Shubuhat', cover: '/assets/screens/kashf-al-shubuhat.jpg' },
    { ar: 'صحيح البخاري', en: 'Sahih al-Bukhari', cover: '/assets/screens/sahih-al-bukhari.jpg' },
    { ar: 'صحيح مسلم', en: 'Sahih Muslim', cover: '/assets/screens/sahih-muslim.jpg' },
    { ar: 'سنن الترمذي', en: 'Sunan at-Tirmidhi', cover: '/assets/screens/sunan-al-tirmidhi.jpg' },
    { ar: 'تفسير الطبري', en: 'Tafsir at-Tabari', cover: '/assets/screens/tafsir-al-tabari.jpg' },
    { ar: 'تفسير ابن كثير', en: 'Tafsir Ibn Kathir', cover: '/assets/screens/tafsir-ibn-kathir.jpg' },
    { ar: '50 قصة من صحيح البخاري', en: '50 Stories from Sahih al-Bukhari', cover: '/assets/screens/qisas-min-sahih-al-bukhari.jpg' },
  ]

  return (
    <section id="gallery" className="relative py-20 sm:py-28" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="geo-dots pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{t.screenshotsEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.screenshotsTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.screenshotsSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3">
          {books.map((book, i) => {
            const title = lang === 'ar' ? book.ar : book.en
            return (
              <Reveal key={book.ar} delay={i * 80}>
                <div className="card rounded-2xl p-4 text-center">
                  <img src={book.cover} alt={title} className="mx-auto h-48 w-auto rounded-lg object-cover shadow-lg" loading="lazy" />
                  <h3 className="mt-3 text-sm font-bold" style={{ color: 'var(--color-text)' }}>{title}</h3>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
