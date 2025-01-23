import { Metadata } from 'next'
import AboutPageContent from '../../components/about/AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us | Devnex LLC - Full-Service Digital Agency',
  description: 'Meet the innovative team behind Devnex LLC. We\'re a dedicated group of digital experts committed to transforming businesses through technology and creativity.',
  keywords: 'Devnex team, digital agency team, tech experts, web developers, AI engineers, SEO specialists, digital marketing experts, about Devnex, company culture, tech leadership',
  openGraph: {
    title: 'About Us | Devnex LLC - Full-Service Digital Agency',
    description: 'Meet the innovative team behind Devnex LLC. Leaders in digital transformation, web development, AI, and marketing.',
    type: 'website',
  }
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <AboutPageContent />
    </main>
  )
}
