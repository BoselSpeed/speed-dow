import { Update } from '../data/updates'
import { useI18n } from '../i18n/I18nContext'

interface UpdatesListProps {
  updates: Update[]
}

export default function UpdatesList({ updates }: UpdatesListProps) {
  const t = useI18n()

  return (
    <div className="card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
        {t.latestUpdates}
      </h2>
      <ol className="space-y-6">
        {updates.map((update, index) => (
          <li key={index} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
              >
                {index + 1}
              </span>
              {index < updates.length - 1 && (
                <span
                  className="mt-2 h-full w-px"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                  {t.versionLabel} {update.version}
                </h3>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text-secondary)' }}
                >
                  {update.date}
                </span>
              </div>
              <p className="mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {update.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
