import { useI18n } from '../i18n/I18nContext'

interface AdSlotProps {
  adKey: string
  format?: string
  width?: number
  height?: number
}

export default function AdSlot({ adKey, format = 'iframe', width = 160, height = 300 }: AdSlotProps) {
  const { t } = useI18n()

  const adDoc = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key': ${JSON.stringify(adKey)},
        'format': ${JSON.stringify(format)},
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    </script>
    <script type="text/javascript" src="https://www.highrevenueformat.com/${adKey}/invoke.js"></script>
  </body>
</html>`

  return (
    <aside
      className="mx-auto flex w-full max-w-[200px] flex-col items-center gap-2 rounded-2xl border p-3"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <span className="text-xs font-medium tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
        {t.adLabel}
      </span>
      <iframe
        srcDoc={adDoc}
        width={width}
        height={height}
        frameBorder="0"
        scrolling="no"
        loading="lazy"
        title={t.adLabel}
        style={{ border: 0 }}
      />
    </aside>
  )
}