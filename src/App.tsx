import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Screenshots from './components/Screenshots'
import HowTo from './components/HowTo'
import Stats from './components/Stats'
import Cta from './components/Cta'
import Footer from './components/Footer'
import DownloadWarning from './components/DownloadWarning'
import InstallationGuideModal from './components/InstallationGuideModal'

function App() {
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

        <About />

        <Features />

        <Screenshots />

        <HowTo />

        <Stats />

        <Cta onOpenInstall={() => setShowInstall(true)} />
      </main>

      <Footer />

      <InstallationGuideModal open={showInstall} onClose={closeInstall} />
    </div>
  )
}

export default App
