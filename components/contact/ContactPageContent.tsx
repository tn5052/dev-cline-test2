'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@mantine/core'

const ContactPageContent = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    token: '' // For CSRF protection
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // CSRF token would be implemented here
        },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '', token: '' })
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      setFormStatus('error')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#EFF2F4] pt-32 pb-20 rounded-b-[40px]">
        <Container size="xl" className="relative">
          <div className="bg-white rounded-[30px] overflow-hidden shadow-lg">
            <div className="relative h-[300px] px-20 py-10">
              <img 
                src="/images/services/main-hero.jpg" 
                alt="Contact Us Hero" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 h-full flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-white text-7xl font-bold mb-4">
                    Contact Us
                  </h1>
                </motion.div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Contact Form Section */}
      <section className="py-20">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </motion.button>

                {formStatus === 'success' && (
                  <p className="text-green-600 text-center">Message sent successfully!</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
                )}
              </form>
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <a href="mailto:info@devnex.co" className="text-primary hover:underline block">info@devnex.co</a>
                    <a href="mailto:devnexglobal@gmail.com" className="text-primary hover:underline block">devnexglobal@gmail.com</a>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Phone</h3>
                    <a href="tel:+923556662291" className="text-primary hover:underline">+92 355 666 2291</a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Follow us</h2>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.instagram.com/devnex.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <span className="text-xl">📸</span>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/devnexglobal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <span className="text-xl">💼</span>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://twitter.com/DevnexGlobal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <span className="text-xl">🐦</span>
                    <span>Twitter</span>
                  </a>
                  <a
                    href="https://www.facebook.com/Devnexglobal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <span className="text-xl">👍</span>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

              {/* Clutch Reviews */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Client Reviews</h2>
                <div className="flex items-center justify-between mb-4">
                  <img src="https://static.clutch.co/badges/reviews.svg" alt="Clutch Reviews" className="h-16" />
                  <a 
                    href="https://clutch.co/profile/devnex#highlights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Reviews →
                  </a>
                </div>
                <div className="text-gray-600">
                  Check out our reviews on Clutch to see what our clients say about working with us.
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-primary text-white"
      >
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's work together to bring your vision to life with our expertise.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </motion.button>
          </div>
        </Container>
      </motion.section>
    </>
  )
}

export default ContactPageContent
