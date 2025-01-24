import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import FAQSection from '@/components/home/FAQSection'

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
