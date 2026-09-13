import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'
import { BOOKS, CAT_TRANSLATION } from '../data/books'

function toSlug(ar: string): string {
  return ar
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const CAT_COLORS: Record<string, string> = {
  'Tawhid': '#000000',
  'Aqeedah': '#3b82f6',
  'Tafsir': '#4b5563',
  'Hadith': '#6b7280',
  'Stories': '#3b82f6',
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
                const slug = toSlug(b.ar)
                return (
                  <a key={b.ar} href={`/books/${slug}`} className="group flex flex-col items-start overflow-hidden rounded-xl p-3 transition-all duration-300" style={{ backgroundColor: 'var(--color-surface-2)' }}>
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
                  </a>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
