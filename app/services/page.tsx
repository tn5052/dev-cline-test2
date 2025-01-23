import { Metadata } from 'next'
import ServicesPageContent from '../../components/services/ServicesPageContent'

export const metadata: Metadata = {
  title: 'Our Services | Devnex LLC - Full-Service Digital Agency',
  description: 'Transform your business with our comprehensive digital services. From AI automation to branding, web development, and digital marketing. Expert solutions tailored for your success.',
  keywords: 'digital agency, AI automation, web development, digital marketing, branding, SEO services, PPC management, content writing, web design, e-commerce solutions, WordPress development, chatbots',
  openGraph: {
    title: 'Our Services | Devnex LLC - Full-Service Digital Agency',
    description: 'Transform your business with our comprehensive digital services. Expert solutions in AI, web development, marketing, and branding.',
    type: 'website',
  }
}

export default function ServicesPage() {
  return (
    <main className="overflow-hidden">
      <ServicesPageContent />
    </main>
  )
}
