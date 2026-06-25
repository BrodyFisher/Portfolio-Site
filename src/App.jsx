import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FishingGame from './components/FishingGame'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FishingGame />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
