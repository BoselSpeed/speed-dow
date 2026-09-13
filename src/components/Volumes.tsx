import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

export default function Volumes({ convertData }: { convertData: string[] }) {
  const { t } = useI18n()

  return (
    <section id="volumes" className="relative py-20 sm:py-28" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="geo-dots pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{t.volumeSectionEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.volumeSectionTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.volumeSectionDesc}</p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14 flex flex-col items-center gap-4">
            <div className="card rounded-2xl px-7 py-4 text-center">
              <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{t.oneBook}</span>
            </div>
            <div className="h-8 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {convertData.map((label, i) => (
                <div key={i} className="card rounded-xl px-5 py-4 text-center">
                  <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t.volumesNote}</p>
        </Reveal>
      </div>
    </section>
  )
}
