import { useI18n } from '../i18n/I18nContext'

function PhoneMockup() {
  const { t } = useI18n()

  return (
    <div className="anim-float relative mx-auto w-72 sm:w-80">
      <div className="phone-mockup">
        <div className="relative overflow-hidden rounded-[2rem] bg-black">
          <div className="mx-auto mt-3 h-6 w-28 rounded-full bg-gray-900" />
          <div className="px-4 py-5">
            <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-900 px-4 py-3">
              <div>
                <div className="text-xs font-bold text-white">{t.heroTitle}</div>
                <div className="text-[10px] text-gray-400">{t.shotLibraryTitle}</div>
              </div>
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-white to-gray-600" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-gray-900 p-3">
                <img src="/assets/screens/kitab-al-tawhid.jpg" alt="" className="h-14 w-10 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-white">كتاب التوحيد</div>
                  <div className="text-[10px] text-gray-400">متوفر دون اتصال</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-gray-900 p-3">
                <img src="/assets/screens/sahih-al-bukhari.jpg" alt="" className="h-14 w-10 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-white">صحيح البخاري</div>
                  <div className="text-[10px] text-gray-400">مجلدات</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-gray-900 p-3">
                <img src="/assets/screens/tafsir-ibn-kathir.jpg" alt="" className="h-14 w-10 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-white">تفسير ابن كثير</div>
                  <div className="text-[10px] text-gray-400">مجلدات</div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-gray-900 p-4">
              <div className="mb-2 flex items-center justify-between text-[10px] text-gray-400">
                <span>{t.featureProgressTitle}</span>
                <span>70%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-white to-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-gradient-to-br from-white to-gray-400 opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 opacity-20 blur-3xl"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export default function Hero({ onDiscover }: { onDiscover: () => void }) {
  const { t } = useI18n()

  return (
    <section id="home" className="relative overflow-hidden bg-black pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(800px 400px at 70% 10%, rgba(255,255,255,0.08), transparent), radial-gradient(600px 300px at 10% 90%, rgba(255,255,255,0.05), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="anim-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-white" />
            {t.heroBadge}
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-4 text-2xl font-bold text-white/90 sm:text-3xl">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{t.heroHighlight}</span>
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
            {t.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#download"
              className="btn-primary inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-black"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              {t.heroDownload}
            </a>
            <button
              onClick={onDiscover}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              {t.heroDiscover}
            </button>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[t.statsBooks, t.statsOffline, t.statsProgress].map((s, i) => (
              <div key={i} className="glass-card rounded-2xl p-4 text-center">
                <div className="text-sm font-semibold text-white">{s}</div>
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
