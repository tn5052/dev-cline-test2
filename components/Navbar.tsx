'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()
  
  // Transform values for scroll animation
  const navbarPadding = useTransform(scrollY, [0, 100], ['24px', '16px'])
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98])
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.95])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ]

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 3rem) 3rem)",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 3rem) 3rem)",
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const menuItemVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  }

  const logoContainerVariants = {
    initial: { 
      width: 40,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    hover: { 
      width: 120,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  }

  const shortLogoVariants = {
    initial: { 
      x: 0,
      opacity: 1,
      zIndex: 2,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    hover: { 
      x: 40,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  }

  const fullLogoVariants = {
    initial: { 
      scale: 0.9,
      opacity: 0,
      x: -20,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    hover: { 
      scale: 1,
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  }

  return (
    <motion.header 
      className="fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          padding: navbarPadding,
        }}
        className="px-3 sm:px-12 md:px-16 lg:px-20"
      >
        <motion.nav
          style={{
            scale: navbarScale,
            opacity: navbarOpacity,
          }}
          className="max-w-7xl mx-auto backdrop-blur-[20px] backdrop-saturate-[180%] 
            bg-white/70 supports-[backdrop-filter]:bg-white/50 px-3 sm:px-8 py-3 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="relative z-50 h-[33px] overflow-hidden"
              variants={logoContainerVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div 
                className="absolute inset-0 flex items-center"
                variants={fullLogoVariants}
              >
                <Image
                  src="/images/logo/devnex-logo.png"
                  alt="Devnex Full Logo"
                  width={120}
                  height={33}
                  className="object-contain"
                  priority
                />
              </motion.div>
              <motion.div 
                className="absolute inset-0 flex items-center"
                variants={shortLogoVariants}
              >
                <Image
                  src="/images/logo/short-logo.png"
                  alt="Devnex Short Logo"
                  width={40}
                  height={33}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2 mx-1.5 font-semibold uppercase text-sm tracking-wide transition-all duration-200 rounded-full group
                    ${pathname === link.href ? 'text-white' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-[#333333] rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-[#F1F2F4] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 -z-10" />
                </Link>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block btn-secondary bg-[#333333] text-white px-6 py-2 rounded-full font-semibold"
            >
              Get in touch
            </motion.button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-50 p-2.5 rounded-xl bg-gray-50/50 backdrop-blur-sm hover:bg-gray-100/80 transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-5 h-5 relative"
              >
                {[0, 1, 2].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-5 h-0.5 bg-gray-900 transform-gpu left-0"
                    style={{ top: `${i * 8 + 4}px` }}
                    animate={{
                      top: isMenuOpen && i === 1 ? "50%" : `${i * 8 + 4}px`,
                      rotate: isMenuOpen ? 
                        i === 0 ? 45 : i === 2 ? -45 : 0 : 0,
                      opacity: isMenuOpen && i === 1 ? 0 : 1,
                      y: isMenuOpen && (i === 0 || i === 2) ? "-50%" : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </motion.div>
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 md:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-7 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 
                         transition-colors duration-200 z-50"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="h-full flex flex-col pt-24 px-6 pb-8 overflow-auto">
              <motion.div className="flex-1 space-y-2">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={menuItemVariants}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-4 px-5 text-lg font-medium rounded-xl transition-all
                        ${pathname === link.href 
                          ? 'bg-[#333333] text-white shadow-lg shadow-gray-200/50' 
                          : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                variants={menuItemVariants}
                custom={links.length}
                className="mt-8"
              >
                <button className="w-full bg-[#333333] text-white py-4 px-5 rounded-xl font-medium text-lg
                                 shadow-lg shadow-gray-200/50 active:scale-[0.98] transition-transform">
                  Get in touch
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar