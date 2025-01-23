'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const footerSections = {
    services: [
      { name: 'AI Automation', href: '/services/ai-automation' },
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Digital Marketing', href: '/services/digital-marketing' },
      { name: 'AI Agents', href: '/services/ai-agents' },
      { name: 'Branding', href: '/services/branding' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Open Source', href: '/open-source' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ]
  }

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-200">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="block">
              <Image
                src="/images/logo/devnex-logo.png"
                alt="Devnex Logo"
                width={140}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-600 max-w-sm">
              Empowering businesses with cutting-edge AI solutions and innovative digital experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerSections.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerSections.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerSections.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-semibold mb-4">Stay Updated</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex flex-wrap gap-4">
            {footerSections.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-right md:text-right order-first md:order-last">
            © {new Date().getFullYear()} Devnex LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
