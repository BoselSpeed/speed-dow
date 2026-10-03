export default function DownloadWarning() {

  return (
    <section className="mx-auto max-w-4xl px-5 sm:px-8">
      <div
        className="card rounded-2xl p-6 sm:p-8"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="mb-5 flex items-center gap-3">
          <svg className="h-7 w-7 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true" style={{ color: 'var(--color-text)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>ملاحظة هامة</h2>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>الروابط في الأسفل打开 في نافذة أو تبويب جديد.</p>
          </div>
        </div>

        <ol className="space-y-3">
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: 'var(--color-text)' }}
            >
              1
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>اضغط على أحد الروابط في الأسفل.</p>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: 'var(--color-text)' }}
            >
              2
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>سيتم فتح الرابط في صفحة جديدة.</p>
          </li>
          <li className="flex gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: 'var(--color-text)' }}
            >
              3
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>تأكد من مصدر الرابط قبل التحميل.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}
