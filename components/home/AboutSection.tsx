'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return

    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: true,
        start: "top center",
        end: "bottom center",
      },
    })
  }, [])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h2 
              variants={fadeUpVariants}
              className="section-title"
            >
              Who We Are
            </motion.h2>
            
            <motion.p 
              variants={fadeUpVariants}
              className="text-gray-600 mb-6"
            >
              Founded with a vision to revolutionize digital solutions, Devnex LLC has been at the forefront of technological innovation. We combine cutting-edge AI with creative expertise to deliver exceptional results for our clients.
            </motion.p>

            <motion.p 
              variants={fadeUpVariants}
              className="text-gray-600 mb-8"
            >
              Our team of passionate experts brings together diverse skills and experiences, united by the common goal of helping businesses thrive in the digital age through innovative solutions and strategic thinking.
            </motion.p>

            <motion.div variants={fadeUpVariants}>
              <h3 className="text-xl font-bold mb-4">Our Core Values</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Innovation First',
                  'Client Success',
                  'Quality Driven',
                  'Continuous Growth'
                ].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <div className="relative h-[600px]">
            <div
              ref={imageRef}
              className="absolute inset-0 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 to-secondary/90 mix-blend-multiply"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
