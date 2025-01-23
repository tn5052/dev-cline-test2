import { Metadata } from 'next'
import PortfolioPageContent from '@/components/portfolio/PortfolioPageContent'

export const metadata: Metadata = {
  title: 'Portfolio | DevNex - Modern Software Solutions',
  description: 'Explore our portfolio of innovative digital solutions, web applications, and successful client projects. See how we transform ideas into impactful digital experiences.',
  keywords: 'portfolio, web development, digital solutions, case studies, client projects, DevNex portfolio',
  openGraph: {
    title: 'Portfolio | DevNex - Modern Software Solutions',
    description: 'Explore our portfolio of innovative digital solutions, web applications, and successful client projects.',
    images: ['/images/portfolio/project-1.png'],
  }
}

export default function Portfolio() {
  return <PortfolioPageContent />
}
