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
      'افتح الرابط الذي اخترته من قسم الروابط في هذا الموقع',
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
      <strong key={i} className="font-bold text-white">
        {part}
      </strong>
    ) : (
      <span key={i} className="text-gray-300">{part}</span>
    ),
  )
}

export default function InstallationGuideModal({ open, onClose }: InstallationGuideModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="خطوات تعطيل Play Protect وتنزيل التطبيق"
    >
      <div
        className="modal-in relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-5">
              <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                <span aria-hidden="true" className="text-2xl">📱</span>
                خطوات تعطيل Play Protect وتنزيل التطبيق
              </h2>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            title="إغلاق"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-xl text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <p className="mb-6 text-sm font-medium text-gray-400">
            على جهازك (Android):
          </p>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="mb-4 flex items-center gap-3 text-base font-semibold text-white">
                  <span aria-hidden="true" className="text-2xl">
                    {step.icon}
                  </span>
                  <span>{step.title}</span>
                </h3>
                <ol className="space-y-3">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-black"
                      >
                        {i + 1}
                      </span>
                      <span className="text-gray-300">{renderItem(item)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-4">
          <button
            onClick={onClose}
            className="btn-primary w-full rounded-xl bg-white px-6 py-3 text-base font-bold text-black"
          >
            فهمت، أُكمل
          </button>
        </div>
      </div>
    </div>
  )
}
