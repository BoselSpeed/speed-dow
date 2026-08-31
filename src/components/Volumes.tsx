import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

const VOL_BOOK = {
  cover: '/assets/screens/tafsir-ibn-kathir.jpg',
  ar: 'تفسير ابن كثير',
  en: 'Tafsir Ibn Kathir',
}

export default function Volumes({ convertData }: { convertData: string[] }) {
  const { t, lang } = useI18n()

  return (
    <section id="volumes" className="scroll-mt-24 py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>{t.volumeSectionEyebrow}</span>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.volumeSectionTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.volumeSectionDesc}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
            <div className="flex items-center gap-5">
              <div className="card rounded-2xl p-4 text-center">
                <img src={VOL_BOOK.cover} alt={lang === 'ar' ? VOL_BOOK.ar : VOL_BOOK.en} className="mb-3 h-52 w-40 rounded-lg object-cover" loading="lazy" />
                <div className="font-bold" style={{ color: 'var(--color-text)' }}>{lang === 'ar' ? VOL_BOOK.ar : VOL_BOOK.en}</div>
                <div className="mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold" style={{ color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-soft)' }}>
                  {t.oneBook}
                </div>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-2xl" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>↓</div>
                <div className="mt-2 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{convertData.length} {lang === 'ar' ? 'مجلدات' : 'volumes'}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {convertData.map((vol, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg font-bold" style={{ color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-soft)' }}>
                    {i + 1}
                  </div>
                  <span className="font-medium" style={{ color: 'var(--color-text)' }}>{vol}</span>
                </div>
              ))}
              <div className="col-span-2 mt-1 rounded-xl px-4 py-3 text-sm" style={{ color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-primary-soft)' }}>
                {t.volumesNote}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
