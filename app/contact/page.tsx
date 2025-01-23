import { Metadata } from 'next'
import ContactPageContent from '../../components/contact/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us | Devnex LLC - Full-Service Digital Agency',
  description: 'Get in touch with Devnex LLC for innovative digital solutions. Expert team ready to transform your business with AI, web development, marketing, and branding services.',
  keywords: 'contact Devnex, digital agency contact, technology consultancy, web development company, AI solutions contact, digital marketing agency contact, Pakistan tech company',
  openGraph: {
    title: 'Contact Us | Devnex LLC - Full-Service Digital Agency',
    description: 'Connect with Devnex LLC for innovative digital solutions and expert consultation.',
    type: 'website',
  }
}

export default function ContactPage() {
  return (
    <main className="overflow-hidden">
      <ContactPageContent />
    </main>
  )
}
