'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'

const Navbar = () => {
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
        className="px-12 md:px-16 lg:px-20"
      >
        <motion.nav
          style={{
            scale: navbarScale,
            opacity: navbarOpacity,
          }}
          className="max-w-7xl mx-auto backdrop-blur-[20px] backdrop-saturate-[180%] 
            bg-white/70 supports-[backdrop-filter]:bg-white/50 px-8 py-4 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="relative">
              <Image
                src="/images/logo/devnex-logo.png"
                alt="Devnex Logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </Link>

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