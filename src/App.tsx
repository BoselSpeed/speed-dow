import { useEffect, useState } from 'react'
import { useI18n } from './i18n/I18nContext'
import { bookLabels } from './i18n/translations'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Contents from './components/Contents'
import Volumes from './components/Volumes'
import Screenshots from './components/Screenshots'
import HowTo from './components/HowTo'
import Faq from './components/Faq'
import Cta from './components/Cta'
import Footer from './components/Footer'
import DownloadWarning from './components/DownloadWarning'
import InstallationGuideModal from './components/InstallationGuideModal'
import AdSlot from './components/AdSlot'

const AD_KEY = '8268954d284064f8fa131cc1ab864319'

function App() {
  const { lang, t } = useI18n()
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

  const convertData = t.convert(bookLabels[lang])
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Navbar />

      <main>
        <Hero onDiscover={scrollToFeatures} />

        <div className="pb-16">
          <DownloadWarning />
        </div>

        <AdSlot adKey={AD_KEY} />

        <About />

        <AdSlot adKey={AD_KEY} />

        <Features />

        <AdSlot adKey={AD_KEY} />

        <Contents />
        <Volumes convertData={convertData} />
        <Screenshots />

        <HowTo onOpenInstall={() => setShowInstall(true)} />

        <Faq />

        <Cta onOpenInstall={() => setShowInstall(true)} />
      </main>

      <Footer />

      <InstallationGuideModal open={showInstall} onClose={closeInstall} />
    </div>
  )
}

export default App
