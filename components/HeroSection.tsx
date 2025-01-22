'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const services = [
  { id: 1, name: 'AI Automation', icon: '🤖', color: 'from-blue-400 to-blue-600' },
  { id: 2, name: 'Web Development', icon: '💻', color: 'from-purple-400 to-purple-600' },
  { id: 3, name: 'AI Agents', icon: '🎯', color: 'from-green-400 to-green-600' },
  { id: 4, name: 'Digital Marketing', icon: '📱', color: 'from-red-400 to-red-600' },
  { id: 5, name: 'Branding', icon: '✨', color: 'from-yellow-400 to-yellow-600' },
]

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!orbitRef.current) return

    // Animate the entire orbit container
    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none"
    })

    // Counter-rotate service items to keep them upright
    gsap.to(".service-item", {
      rotation: -360,
      duration: 30,
      repeat: -1,
      ease: "none"
    })
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    // Animate geometric shapes
    gsap.to(".geometric-shape", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    })
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen pt-16 overflow-hidden bg-[#f8f9fa]">
      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="geometric-shape absolute -top-20 -right-20 w-96 h-96 text-primary/5" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="currentColor"/>
        </svg>
        <svg className="geometric-shape absolute -bottom-40 -left-40 w-[600px] h-[600px] text-secondary/5" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="currentColor"/>
        </svg>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 h-[calc(100vh-4rem)]">
        <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm"
            >
              Digital Innovation Agency
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl lg:text-7xl font-['Chillax'] font-semibold leading-tight"
            >
              Transform Your
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Digital Presence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 text-lg max-w-lg"
            >
              We combine AI innovation with creative excellence to deliver exceptional digital solutions that drive real business growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Start Project
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 text-primary border-2 border-primary/10 rounded-lg font-medium hover:bg-primary/5 transition-colors"
              >
                View Our Work
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
            >
              {[
                { number: "150+", label: "Clients" },
                { number: "10+", label: "Years" },
                { number: "95%", label: "Success Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Orbital Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Central Devnex Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute z-10 w-48 h-48 bg-white rounded-full shadow-xl flex items-center justify-center p-6"
              >
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Image
                      src="/images/logo/devnex-logo.png"
                      alt="Devnex Logo"
                      width={140}
                      height={50}
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-full"
                  />
                </div>
              </motion.div>

              {/* Orbital Ring with Dotted Line */}
              <div className="absolute w-[500px] h-[500px]">
                <svg className="absolute inset-0 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="200"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="opacity-30"
                  />
                </svg>
              </div>

              {/* Services Orbital Container */}
              <div ref={orbitRef} className="absolute w-[500px] h-[500px]">
                {services.map((service, index) => {
                  const angle = (index * 360) / services.length
                  const radius = 200 // Match the circle radius
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius

                  return (
                    <motion.div
                      key={service.id}
                      className="service-item absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        className={`w-20 h-20 rounded-lg bg-gradient-to-br ${service.color} 
                          shadow-lg flex flex-col items-center justify-center text-white cursor-pointer
                          backdrop-blur-md bg-opacity-90`}
                        whileHover={{
                          boxShadow: "0 0 20px rgba(0,0,0,0.2)"
                        }}
                      >
                        <span className="text-2xl mb-1">{service.icon}</span>
                        <span className="text-xs font-medium text-center">
                          {service.name}
                        </span>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
                />
              </div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="180"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-secondary)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-6 h-6 text-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection