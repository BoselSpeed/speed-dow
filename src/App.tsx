import { useState, useEffect } from 'react'
import { fileInfo } from './data/fileInfo'
import { updates } from './data/updates'
import ThemeToggle from './components/ThemeToggle'
import DownloadCard from './components/DownloadCard'
import DownloadGuide from './components/DownloadGuide'
import InstallGuideModal from './components/InstallGuideModal'
import UpdatesList from './components/UpdatesList'
import AdSlot from './components/AdSlot'
import { useI18n } from './i18n/I18nContext'

function App() {
  const t = useI18n()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light'
    setTheme(initial)
    if (initial === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('installGuideSeen') !== '1') {
      setShowInstall(true)
    }
  }, [])

  const closeInstall = () => {
    localStorage.setItem('installGuideSeen', '1')
    setShowInstall(false)
  }

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <header className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
          {fileInfo.name}
        </h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="px-6 pb-12 max-w-4xl mx-auto">
        <section className="flex flex-col items-center gap-8">
          <DownloadGuide />

          <DownloadCard info={fileInfo} />
        </section>

        <section className="mt-12 text-center">
          <button
            onClick={() => setShowInstall(true)}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
            style={{ color: 'var(--color-primary)' }}
          >
            {t.installShowAgain}
          </button>
        </section>

        <section className="mt-12">
          <AdSlot adKey="8268954d284064f8fa131cc1ab864319" />
        </section>

        <section className="mt-12 flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-8">
          <AdSlot adKey="8268954d284064f8fa131cc1ab864319" />

          <div className="w-full md:flex-1 md:min-w-0">
            <UpdatesList updates={updates} />
          </div>

          <AdSlot adKey="8268954d284064f8fa131cc1ab864319" />
        </section>
      </main>

      <InstallGuideModal open={showInstall} onClose={closeInstall} />
    </div>
  )
}

export default App
