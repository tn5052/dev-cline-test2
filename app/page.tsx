import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import PortfolioSection from '@/components/PortfolioSection'
import FAQSection from '@/components/FAQSection'

export default async function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <FAQSection />
    </main>
  )
}
