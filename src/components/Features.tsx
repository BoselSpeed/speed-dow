import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

function FeatureIcon({ icon }: { icon: 'library' | 'pdf' | 'offline' | 'volumes' | 'lang' | 'progress' | 'quiz' }) {
  const paths: Record<string, React.ReactNode> = {
    library: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    ),
    pdf: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    ),
    offline: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    ),
    volumes: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    ),
    lang: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.791-.3 1.13-.14.241-.272.468-.272.673 0 .462.374.836.836.836h.439a3.6 3.6 0 001.571-.376c.453-.22.684-.757.497-1.213l-.014-.035.005-.037c.04-.314.008-.63-.046-.94l-.03-.18a1.9 1.9 0 01.255-1.149l.23-.383a6.11 6.11 0 01.809-1.089l.745-.745a1.5 1.5 0 01.285-.213.216.216 0 01.124-.05 1.05 1.05 0 01.86.53.225.225 0 01-.028.253l-1.245 1.246a.75.75 0 001.061 1.06l1.245-1.246a.225.225 0 01.253-.028zm-12.282 8.157c.362.528.777.948 1.208 1.268M4.94 6.708c-.22-.416-.566-1.073-.779-1.552l-.728-1.642A8.954 8.954 0 003.75 4.5c1.454.396 2.961.71 4.5.94m1.693-3.622l.225-.447a1.13 1.13 0 01.87-.62 10.49 10.49 0 011.122 0c.395.056.747.267.87.62l.226.448c.146.288.46.46.774.42 1.539-.199 3.128-.47 4.607-.791.4-.085.67.3.54.693l-.594 1.74c-.196.573-.594 1.032-1.063 1.3" />
    ),
    progress: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    ),
    quiz: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    ),
  }

  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      {paths[icon]}
    </svg>
  )
}

export default function Features() {
  const { t } = useI18n()

  const features = [
    { icon: 'library' as const, title: t.featureLibraryTitle, desc: t.featureLibraryDesc },
    { icon: 'pdf' as const, title: t.featurePdfTitle, desc: t.featurePdfDesc },
    { icon: 'offline' as const, title: t.featureOfflineTitle, desc: t.featureOfflineDesc },
    { icon: 'volumes' as const, title: t.featureVolumesTitle, desc: t.featureVolumesDesc },
    { icon: 'lang' as const, title: t.featureBilingualTitle, desc: t.featureBilingualDesc },
    { icon: 'progress' as const, title: t.featureProgressTitle, desc: t.featureProgressDesc },
    { icon: 'quiz' as const, title: t.featureQuizTitle, desc: t.featureQuizDesc },
  ]

  return (
    <section id="features" className="scroll-mt-24 py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>{t.featuresEyebrow}</span>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.featuresTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.featuresSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 120}>
              <div className="card card-hover h-full rounded-2xl p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-soft)' }}>
                  <FeatureIcon icon={f.icon} />
                </div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
