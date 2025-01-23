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

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const PortfolioSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Adjusted transform for the first column to be slightly faster than the second column
  const column1Y = useTransform(scrollYProgress, 
    [0.10, 1], 
    ['60%', '-10%']  // Slightly faster speed: full bottom to center
  )
  
  const column2Y = useTransform(scrollYProgress, 
    [0.1, 0.6, 1], 
    ['20%', '0%', '-20%']
  ) // Medium
  
  const column3Y = useTransform(scrollYProgress, 
    [0.2, 0.7, 1], 
    ['10%', '0%', '-10%']
  ) // Slowest

  return (
    <section className="py-20 bg-gray-50 overflow-hidden relative" ref={containerRef}>
      {/* Gradient Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 right-0 w-[40rem] h-[40rem] bg-[#23b8af] rounded-full filter blur-[150px] opacity-70"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariant}
            className="lg:w-1/3 lg:sticky lg:top-20 lg:h-fit"
          >
            <motion.span 
              variants={fadeInUpVariant}
              className="text-secondary font-medium mb-4 block"
            >
              Our Portfolio
            </motion.span>
            <motion.h2 
              variants={fadeInUpVariant}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Transforming Ideas into Digital Excellence
            </motion.h2>
            <motion.p
              variants={fadeInUpVariant}
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
          <div className="lg:w-2/3 grid grid-cols-3 gap-4 relative">
            {/* First Column - Slightly Faster */}
            <motion.div 
              style={{ y: column1Y }}
              className="space-y-4 relative"
            >
              {projects.slice(0, 2).map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
            
            {/* Second Column - Medium */}
            <motion.div 
              style={{ y: column2Y }}
              className="space-y-4 relative"
            >
              {projects.slice(2, 5).map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project}
                  index={index + 2}
                />
              ))}
            </motion.div>

            {/* Third Column - Slowest */}
            <motion.div 
              style={{ y: column3Y }}
              className="space-y-4 relative"
            >
              {projects.slice(5, 8).map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project}
                  index={index + 5}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUpVariant}
      className="group relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg"
    >
      {/* Background Image with Hover Blur */}
      <div className="absolute inset-0 transition-all duration-500 ease-out">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 transition-opacity duration-500" />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Always Visible Text */}
        <div className="transform transition-all duration-500 ease-out group-hover:translate-y-[-1rem]">
          <span className="text-sm font-medium text-secondary/90 block mb-2">
            {project.category}
          </span>
          <h3 className="text-xl font-bold mb-2 text-white">
            {project.title}
          </h3>
          <p className="text-sm text-white/80 mb-4 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Explore Button - Hidden by default, shown on hover */}
        <motion.button
          className="bg-secondary/90 text-white px-6 py-2 rounded-lg 
                     opacity-0 transform translate-y-4 transition-all duration-500 
                     group-hover:opacity-100 group-hover:translate-y-0
                     hover:bg-secondary"
        >
          Explore Project
        </motion.button>
      </div>
    </motion.div>
  )
}

export default PortfolioSection