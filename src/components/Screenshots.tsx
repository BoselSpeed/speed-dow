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
    <section id="gallery" className="relative bg-black py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute left-1/3 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">{t.screenshotsEyebrow}</span>
            <h2 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">{t.screenshotsTitle}</h2>
            <p className="mt-4 text-lg text-gray-400">{t.screenshotsSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-3">
          {books.map((book, i) => {
            const title = lang === 'ar' ? book.ar : book.en
            return (
              <Reveal key={book.ar} delay={i * 80}>
                <div className="screenshot-card group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-900">
                    <img
                      src={book.cover}
                      alt={title}
                      className="h-64 w-full object-cover sm:h-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 z-10 flex items-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 className="text-lg font-bold text-white">{title}</h3>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
