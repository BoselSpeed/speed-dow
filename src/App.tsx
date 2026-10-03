import { useEffect } from 'react'
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

function App() {
  useEffect(() => {
    if (localStorage.getItem('installGuideSeen') !== '1') {
      // no-op: keep existing localStorage behavior if needed later
    }
  }, [])

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

        <Cta />
      </main>

      <Footer />
    </div>
  )
}

export default App
