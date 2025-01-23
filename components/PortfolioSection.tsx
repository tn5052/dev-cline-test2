'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'AI-Powered Customer Service',
    category: 'AI Automation',
    description: 'Automated customer support system with NLP.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'E-commerce Website Redesign',
    category: 'Web Design',
    description: 'Complete overhaul of an e-commerce platform with modern UI/UX.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Brand Identity Development',
    category: 'Branding',
    description: 'Comprehensive brand identity design for a tech startup.',
    image: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Digital Marketing Campaign',
    category: 'Marketing',
    description: 'Multi-channel marketing campaign that increased conversions by 150%.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mobile App Development',
    category: 'App Development',
    description: 'Cross-platform mobile app for fitness tracking.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cloud Infrastructure',
    category: 'DevOps',
    description: 'Scalable cloud architecture implementation.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Data Analytics Dashboard',
    category: 'Analytics',
    description: 'Real-time business intelligence platform.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Blockchain Solution',
    category: 'Web3',
    description: 'Decentralized application development.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
  },
]

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const projectVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.610, 0.355, 1.000]
    }
  }
}

const PortfolioSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Create different scroll progress for each column
  const column1Y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const column2Y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const column3Y = useTransform(scrollYProgress, [0, 1], [150, -150])

  return (
    <section className="py-20 bg-gray-50" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:w-1/3 lg:sticky lg:top-20 lg:h-fit"
          >
            <motion.span 
              variants={projectVariant}
              className="text-secondary font-medium mb-4 block"
            >
              Our Portfolio
            </motion.span>
            <motion.h2 
              variants={projectVariant}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Transforming Ideas into Digital Excellence
            </motion.h2>
            <motion.p
              variants={projectVariant}
              className="text-gray-600 text-lg mb-8"
            >
              We craft innovative solutions that drive business growth and user engagement. Explore our diverse portfolio of successful digital transformations.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              View All Projects
            </motion.button>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:w-2/3 grid grid-cols-3 gap-4"
          >
            {/* First Column */}
            <motion.div 
              style={{ y: column1Y }}
              className="space-y-4"
            >
              {projects.slice(0, 2).map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
            
            {/* Second Column */}
            <motion.div 
              style={{ y: column2Y }}
              className="space-y-4"
            >
              {projects.slice(2, 5).map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project}
                  index={index + 2}
                />
              ))}
            </motion.div>

            {/* Third Column */}
            <motion.div 
              style={{ y: column3Y }}
              className="space-y-4"
            >
              {projects.slice(5, 8).map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project}
                  index={index + 5}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <motion.div
      ref={cardRef}
      variants={projectVariant}
      style={{ scale, opacity }}
      className="group relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg"
    >
      <img
        src={project.image}
        alt={project.title}
        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 text-white">
          <span className="text-xs font-medium text-secondary/90 block mb-1">
            {project.category}
          </span>
          <h3 className="text-sm font-bold mb-1 line-clamp-2">{project.title}</h3>
          <p className="text-xs text-white/80 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PortfolioSection