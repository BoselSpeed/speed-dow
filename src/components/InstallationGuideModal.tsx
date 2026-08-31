interface InstallationGuideModalProps {
  open: boolean
  onClose: () => void
}

interface Step {
  icon: string
  title: string
  items: string[]
}

const steps: Step[] = [
  {
    icon: '🔓',
    title: 'الخطوة 1 — فعّل "مصادر مجهولة" (مصدر التطبيق):',
    items: [
      'افتح **الإعدادات** → **التطبيقات والتنبيهات** (أو "التطبيقات")',
      'اضغط على **إعدادات التطبيقات المخصصة** (في أسفل الشاشة)',
      'اضغط على **تطبيق غير معروف** (أو "تثبيت تطبيقات غير معروفة")',
      'اختر المتصفح الذي تستخدمه (Chrome مثلاً)',
      'فعّل **السماح من هذا المصدر**',
    ],
  },
  {
    icon: '🛡️',
    title: 'الخطوة 2 — عطّل حماية Play Protect مؤقتاً:',
    items: [
      'افتح **Google Play Store**',
      'اضغط على **صورة حسابك** (أعلى اليمين)',
      'اضغط على **Play Protect**',
      'اضغط على ⚙ **الإعدادات** (أعلى اليمين)',
      'أوقف **"فحص تطبيقات على جهازك"** — ستسألك عن السبب، اختر أي سبب أو اتركه فارغاً',
      'أوقف أيضاً **"raphicul تطبيقات ضارة"** (إذا كان مفعلاً)',
    ],
  },
  {
    icon: '📲',
    title: 'الخطوة 3 — ثبّت التطبيق:',
    items: [
      'افتح المجلد الذي حفظت فيه الملف `تطبيق-الفقه.apk`',
      'اضغط على الملف',
      'اضغط **تثبيت** (قد يظهر "تثبيت مرفوض" — اضغط "تثبيت على أي حال")',
      'إذا ظهرت رسالة "هذه الإصدار من Google Play Protect..." اضغط **"تجاهل"** أو **"تثبيت على أي حال"**',
      'اضغط **فتح** بعد الانتهاء',
    ],
  },
  {
    icon: '✅',
    title: 'الخطوة 4 — أعد تفعيل Play Protect:',
    items: [
      'عد إلى **Google Play Store** → **صورة الحساب** → **Play Protect**',
      'فعّل **"فحص تطبيقات على جهازك"** من جديد',
      'فعّل **"raphicul تطبيقات ضارة"**',
    ],
  },
]

function renderItem(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ fontWeight: 700, color: 'var(--color-text)' }}>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function InstallationGuideModal({ open, onClose }: InstallationGuideModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="خطوات تعطيل Play Protect وتنزيل التطبيق"
    >
      <div
        className="modal-in card relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: 'var(--color-surface)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between gap-3 border-b px-6 py-4"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <h2
            className="flex items-center gap-2 text-lg font-bold leading-snug"
            style={{ color: 'var(--color-text)' }}
          >
            <span aria-hidden="true">📱</span>
            خطوات تعطيل Play Protect وتنزيل التطبيق
          </h2>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            title="إغلاق"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl leading-none transition-colors hover:opacity-80"
            style={{ backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text)' }}
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <p className="mb-5 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            على جهازك (Android):
          </p>

          <div className="space-y-5">
            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-xl border p-4"
                style={{ backgroundColor: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}
              >
                <h3
                  className="mb-3 flex items-center gap-2 text-base font-semibold"
                  style={{ color: 'var(--color-text)' }}
                >
                  <span aria-hidden="true" className="text-xl">
                    {step.icon}
                  </span>
                  <span>{step.title}</span>
                </h3>
                <ol className="space-y-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                        style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{renderItem(item)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t px-6 py-4" style={{ borderColor: 'var(--color-border)' }}>
          <button
            onClick={onClose}
            className="btn-primary w-full rounded-xl px-6 py-3 text-base font-semibold"
          >
            فهمت، أُكمل
          </button>
        </div>
      </div>
    </div>
  )
}