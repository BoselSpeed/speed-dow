import { useI18n } from '../i18n/I18nContext'

export default function DownloadWarning() {
  const { t } = useI18n()

  return (
    <section className="mx-auto max-w-4xl px-5 sm:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{t.warningTitle}</h2>
              <p className="mt-1 text-sm text-gray-400">{t.warningIntro}</p>
            </div>
          </div>

          <ol className="space-y-4">
            {[t.warningPoint1, t.warningPoint2, t.warningPoint3, t.warningPoint4].map((point, index) => (
              <li key={index} className="flex gap-4">
                <span
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-black"
                >
                  {index + 1}
                </span>
                <p className="flex-1 text-sm leading-relaxed text-gray-300">{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
