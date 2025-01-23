'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { FaRobot, FaCode, FaBrain, FaChartLine, FaPalette } from 'react-icons/fa'
import Link from 'next/link'

const services = [
  { 
    id: 1, 
    name: 'AI Automation', 
    icon: FaRobot,
    color: 'from-blue-500 via-blue-400 to-cyan-400',
    shadowColor: 'shadow-blue-500/20'
  },
  { 
    id: 2, 
    name: 'Web Development', 
    icon: FaCode,
    color: 'from-violet-500 via-purple-500 to-purple-400',
    shadowColor: 'shadow-purple-500/20'
  },
  { 
    id: 3, 
    name: 'AI Agents', 
    icon: FaBrain,
    color: 'from-emerald-500 via-green-500 to-teal-400',
    shadowColor: 'shadow-emerald-500/20'
  },
  { 
    id: 4, 
    name: 'Digital Marketing', 
    icon: FaChartLine,
    color: 'from-rose-500 via-red-500 to-orange-400',
    shadowColor: 'shadow-rose-500/20'
  },
  { 
    id: 5, 
    name: 'Branding', 
    icon: FaPalette,
    color: 'from-amber-400 via-yellow-400 to-orange-400',
    shadowColor: 'shadow-amber-400/20'
  },
]

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  const headingRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const textX = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), { stiffness: 100, damping: 30 })
  const textY = useSpring(useTransform(mouseY, [-100, 100], [-5, 5]), { stiffness: 100, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = headingRef.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 }
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const headingControls = useAnimation()
  const glowControls = useAnimation()

  const gradients = {
    primary: "from-blue-600 via-indigo-600 to-violet-600", // Trust & Innovation
    accent: "from-cyan-500 via-teal-500 to-emerald-500",  // Growth & Success
    highlight: "from-amber-400 to-orange-500" // Energy & Creativity
  }

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

  useEffect(() => {
    // Animate glow effect
    glowControls.start({
      opacity: [0.4, 0.6, 0.4],
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    })
  }, [glowControls])

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  }

  return (
    <div ref={containerRef} className="relative min-h-screen pt-16 overflow-hidden bg-[#f8f9fa]">
      {/* Floating Gradient Background */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="geometric-shape absolute -top-20 -right-20 w-96 h-96 text-primary/5" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="currentColor"/>
        </svg>
        <svg className="geometric-shape absolute -bottom-40 -left-40 w-[600px] h-[600px] text-secondary/5" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="currentColor"/>
        </svg>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 h-[calc(100vh-4rem)] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
          {/* Left Column - Text Content */}
          <motion.div className="space-y-8 relative z-20">
            {/* Updated Value Proposition Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full 
                bg-gradient-to-r from-indigo-50/80 to-violet-50/80 border border-indigo-100/50
                backdrop-blur-sm shadow-sm"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  background: [
                    'linear-gradient(to right, #4F46E5, #7C3AED)',
                    'linear-gradient(to right, #7C3AED, #4F46E5)',
                    'linear-gradient(to right, #4F46E5, #7C3AED)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
              />
              <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 
                bg-clip-text text-transparent flex items-center gap-2"
              >
                AI-Powered
                <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.5 13.5L12 16l8-8-8 8-8-8 8 8 2.5-2.5z"/>
                </svg>
                Future-Ready Solutions
              </span>
            </motion.div>

            {/* New Creative Heading Design */}
            <div className="relative space-y-3">
              {/* Transform Text */}
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  className="text-4xl font-semibold tracking-tight"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-block"
                  >
                    We Help You
                  </motion.span>
                </motion.h2>
              </div>

              {/* Main Heading */}
              <div className="relative">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="inline-block">
                    Transform
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className={`h-1 -mt-2 bg-gradient-to-r ${gradients.highlight} block`}
                    />
                  </span>{" "}
                  <span className="inline-block">
                    Your Digital
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-2"
                >
                  <span className={`text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${gradients.primary} 
                    bg-clip-text text-transparent inline-block`}
                  >
                    Presence
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  </span>
                </motion.div>

                {/* Impact Tagline */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="mt-4 flex items-center gap-4"
                >
                  <motion.div
                    animate={{ scaleX: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`h-px w-12 bg-gradient-to-r ${gradients.accent}`}
                  />
                  <span className={`text-xl font-medium bg-gradient-to-r ${gradients.accent} 
                    bg-clip-text text-transparent`}
                  >
                    that creates lasting impact
                  </span>
                </motion.div>
              </div>
            </div>

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
              className="flex flex-wrap gap-4 relative z-30"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer"
                >
                  Start Project
                </motion.button>
              </Link>
              
              <Link href="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 text-primary border-2 border-primary/10 rounded-lg font-medium hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  View Our Work
                </motion.button>
              </Link>
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
            className="relative hidden lg:block pointer-events-none"
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
                  const Icon = service.icon

                  return (
                    <div
                      key={service.id}
                      className="service-item absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      }}
                    >
                      <div
                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${service.color} 
                          ${service.shadowColor} shadow-lg backdrop-blur-md bg-opacity-90
                          flex flex-col items-center justify-center text-white
                          border border-white/10`}
                      >
                        <Icon className="text-3xl mb-2" />
                        <span className="text-xs font-medium text-center px-2">
                          {service.name}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 pointer-events-none">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
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