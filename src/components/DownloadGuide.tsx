import { fileInfo } from '../data/fileInfo'
import { useI18n } from '../i18n/I18nContext'

export default function DownloadGuide() {
  const t = useI18n()

  const points = [
    t.downloadGuidePoint1,
    t.downloadGuidePoint2,
    t.downloadGuidePoint3,
    t.downloadGuidePoint4.replace('{size}', fileInfo.size),
    t.downloadGuidePoint5.replace('{fileName}', fileInfo.fileName),
  ]

  return (
    <section
      className="w-full max-w-lg rounded-2xl border p-6"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <svg
          className="h-6 w-6 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#f59e0b"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
        <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          {t.downloadGuideTitle}
        </h2>
      </div>

      <ol className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex gap-3">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
            >
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {point}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}