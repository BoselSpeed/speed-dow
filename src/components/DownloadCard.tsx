import { FileInfo } from '../data/fileInfo'
import { useI18n } from '../i18n/I18nContext'

export default function DownloadCard({ info }: { info: FileInfo }) {
  const t = useI18n()

  return (
    <div className="card rounded-2xl p-8 w-full max-w-lg text-center">
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16"
          style={{ color: 'var(--color-primary)' }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.25 11.25h-8.25m-3 3.75h.008v.008H6v-.008zm7.5-3.75h.008v.008H13.5v-.008zm3.75 0h.008v.008H17.25v-.008zM3.75 19.5h16.5a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H3.75A.75.75 0 003 6v12a.75.75 0 00.75.75z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
        {info.name}
      </h2>

      <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
        {info.description}
      </p>

      <dl className="grid grid-cols-2 gap-3 text-right mb-8">
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <dt className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t.versionLabel}</dt>
          <dd className="font-semibold" style={{ color: 'var(--color-text)' }}>{info.version}</dd>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <dt className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t.sizeLabel}</dt>
          <dd className="font-semibold" style={{ color: 'var(--color-text)' }}>{info.size}</dd>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <dt className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t.typeLabel}</dt>
          <dd className="font-semibold" style={{ color: 'var(--color-text)' }}>{info.fileType}</dd>
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-surface-2)' }}>
          <dt className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{t.lastUpdatedLabel}</dt>
          <dd className="font-semibold" style={{ color: 'var(--color-text)' }}>{info.lastUpdated}</dd>
        </div>
      </dl>

      <a
        href={`/downloads/${info.fileName}`}
        download
        className="btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-lg font-semibold"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        {t.download}
      </a>
    </div>
  )
}
