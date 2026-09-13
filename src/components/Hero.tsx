import { useI18n } from '../i18n/I18nContext'
import { SITE_CONFIG } from '../data/siteConfig'

function PhoneMockup() {
  const { t } = useI18n()

  return (
    <div className="anim-float relative mx-auto w-64 sm:w-72">
      <div
        className="relative overflow-hidden rounded-[2.5rem] border-4 bg-white shadow-2xl"
        style={{ borderColor: '#000000', maxHeight: 540 }}
      >
        <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-black" />
        <div className="px-3 py-4">
          <div className="mb-3 flex items-center justify-between rounded-xl px-3 py-2" style={{ backgroundColor: 'var(--color-surface-2)' }}>
            <div>
              <div className="text-[10px] font-bold" style={{ color: 'var(--color-text)' }}>{t.heroTitle}</div>
              <div className="text-[9px]" style={{ color: 'var(--color-text-secondary)' }}>{t.shotLibraryTitle}</div>
            </div>
            <div className="h-5 w-5 rounded-md" style={{ background: 'linear-gradient(135deg, #000000, #3b82f6)' }} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: 'var(--color-surface-2)' }}>
              <img src="/assets/screens/kitab-al-tawhid.jpg" alt="" className="h-12 w-9 rounded object-cover" loading="lazy" />
              <div>
                <div className="text-[10px] font-semibold" style={{ color: 'var(--color-text)' }}>كتاب التوحيد</div>
                <div className="text-[8px]" style={{ color: 'var(--color-text-secondary)' }}>متوفر دون اتصال</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: 'var(--color-surface-2)' }}>
              <img src="/assets/screens/sahih-al-bukhari.jpg" alt="" className="h-12 w-9 rounded object-cover" loading="lazy" />
              <div>
                <div className="text-[10px] font-semibold" style={{ color: 'var(--color-text)' }}>صحيح البخاري</div>
                <div className="text-[8px]" style={{ color: 'var(--color-text-secondary)' }}>مجلدات</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg p-2" style={{ backgroundColor: 'var(--color-surface-2)' }}>
              <img src="/assets/screens/tafsir-ibn-kathir.jpg" alt="" className="h-12 w-9 rounded object-cover" loading="lazy" />
              <div>
                <div className="text-[10px] font-semibold" style={{ color: 'var(--color-text)' }}>تفسير ابن كثير</div>
                <div className="text-[8px]" style={{ color: 'var(--color-text-secondary)' }}>مجلدات</div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: 'var(--color-surface-2)' }}>
            <div className="mb-1 flex items-center justify-between text-[9px]" style={{ color: 'var(--color-text-secondary)' }}>
              <span>{t.featureProgressTitle}</span>
              <span>70%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'var(--color-bg)' }}>
              <div className="h-full w-[70%] rounded-full" style={{ background: 'linear-gradient(90deg, #000000, #3b82f6)' }} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -right-3 -top-3 h-28 w-28 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: 'var(--color-accent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-4 -left-3 h-32 w-32 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: 'var(--color-primary)' }}
        aria-hidden="true"
      />
    </div>
  )
}

export default function Hero({ onDiscover }: { onDiscover: () => void }) {
  const { t } = useI18n()

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(700px 320px at 80% 10%, var(--color-primary-soft), transparent), radial-gradient(600px 260px at 10% 85%, var(--color-accent-soft), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="anim-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <span className="h-2 w-2 rounded-full bg-black dark:bg-white" />
            {t.heroBadge}
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: 'var(--color-text)' }}>
            {t.heroTitle}
          </h1>
          <p className="mt-3 text-xl font-bold sm:text-2xl" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="gradient-text">{t.heroHighlight}</span>
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {t.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={SITE_CONFIG.downloadUrl}
              download
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t.heroDownload}
            </a>
            <button
              onClick={onDiscover}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold transition-all duration-200"
              style={{ color: 'var(--color-text)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              {t.heroDiscover}
            </button>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[t.statsBooks, t.statsOffline, t.statsProgress].map((s) => (
              <div key={s} className="card rounded-xl px-3 py-3 text-center">
                <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="anim-fade-up anim-delay-2">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}
