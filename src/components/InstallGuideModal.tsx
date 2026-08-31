import { fileInfo } from '../data/fileInfo'
import { useI18n } from '../i18n/I18nContext'

interface InstallGuideModalProps {
  open: boolean
  onClose: () => void
}

export default function InstallGuideModal({ open, onClose }: InstallGuideModalProps) {
  const t = useI18n()

  if (!open) return null

  const steps = [
    { title: t.installStep1Title, body: t.installStep1Body },
    { title: t.installStep2Title, body: t.installStep2Body },
    { title: t.installStep3Title, body: t.installStep3Body.replace('{fileName}', fileInfo.fileName) },
    { title: t.installStep4Title, body: t.installStep4Body },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.installTitle}
    >
      <div
        className="card relative my-8 w-full max-w-xl rounded-2xl p-6 shadow-2xl"
        style={{ backgroundColor: 'var(--color-surface)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
            {t.installTitle}
          </h2>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            title="إغلاق"
            className="rounded-lg p-2 text-lg leading-none transition-colors"
            style={{ backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text)' }}
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="rounded-xl p-4" style={{ backgroundColor: 'var(--color-surface-2)' }}>
              <h3 className="mb-2 flex items-center gap-2 font-semibold" style={{ color: 'var(--color-text)' }}>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
                >
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="btn-primary mt-6 w-full rounded-xl px-6 py-3 text-base font-semibold"
        >
          {t.installDismiss}
        </button>
      </div>
    </div>
  )
}