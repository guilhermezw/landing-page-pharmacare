import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Manifesto from "@/components/Manifesto"
import Plataforma from "@/components/Plataforma"
import PharmAssist from "@/components/PharmAssist"
import Visao from "@/components/Visao"
import Crenca from "@/components/Crenca"
import CTAFinal from "@/components/CTAFinal"
import Footer from "@/components/Footer"

export default function App() {
  return (
    <div className="relative min-h-screen bg-surface">
      <a
        href="#conteudo"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-full focus-visible:bg-primary focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white focus-visible:shadow-glass"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Manifesto />
        <Plataforma />
        <PharmAssist />
        <Visao />
        <Crenca />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  )
}
