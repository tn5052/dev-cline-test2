import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import PortfolioSection from '@/components/PortfolioSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

export default async function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
