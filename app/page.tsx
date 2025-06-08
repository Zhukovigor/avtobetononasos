import Navigation from "./components/navigation"
import Hero from "./components/hero"
import Portfolio from "./components/portfolio"
import Gallery from "./components/gallery"
import Contact from "./components/contact"
import Footer from "./components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Portfolio />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
