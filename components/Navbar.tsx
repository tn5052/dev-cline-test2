'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const headerHeight = useTransform(scrollY, [0, 100], ['7rem', '4.5rem'])
  const headerPadding = useTransform(scrollY, [0, 100], ['1.5rem', '0.75rem'])
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.header 
      className="fixed top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          height: headerHeight,
          padding: headerPadding,
        }}
        className="transition-all duration-300"
      >
        <motion.nav
          style={{ backgroundColor: headerBg }}
          className={`backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 px-8 py-4 transition-all duration-300
            ${isScrolled ? 'shadow-lg rounded-b-2xl' : 'rounded-2xl'}`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="text-gray-900 text-xl font-bold">
              Devnex
            </Link>

            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-6 py-2 mx-2 font-semibold uppercase text-sm tracking-wide transition-colors rounded-full
                    ${pathname === link.href 
                      ? 'text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                    }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-[#333333] rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-[#F1F2F4] rounded-full opacity-0 hover:opacity-100 transition-opacity -z-10"
                    initial={false}
                  />
                </Link>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary bg-[#333333] text-white px-6 py-2 rounded-full font-semibold"
            >
              Get in touch
            </motion.button>
          </div>
        </motion.nav>
      </motion.div>

      <button className="md:hidden text-gray-900 absolute right-4 top-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </motion.header>
  )
}

export default Navbar
