'use client'

import { motion } from 'framer-motion'
import { Container } from '@mantine/core'
import { useState } from 'react'

interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  link?: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration. Features include real-time inventory management, user authentication, and responsive design.',
    image: '/images/portfolio/project-1.png',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    link: 'https://example.com/project1'
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Dashboard',
    category: 'AI & Automation',
    description: 'Custom analytics dashboard with AI-driven insights, real-time data visualization, and predictive analytics capabilities.',
    image: '/images/portfolio/project-2.png',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js'],
    link: 'https://example.com/project2'
  },
  {
    id: '3',
    title: 'Healthcare Management System',
    category: 'Software Solutions',
    description: 'Comprehensive healthcare management system with patient records, appointment scheduling, and billing integration.',
    image: '/images/portfolio/project-3.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://example.com/project3'
  },
  {
    id: '4',
    title: 'Mobile Fitness App',
    category: 'Mobile Development',
    description: 'Feature-rich fitness application with workout tracking, nutrition planning, and social features for motivation and engagement.',
    image: '/images/portfolio/project-4.png',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    link: 'https://example.com/project4'
  }
]

const categories = ['All', 'Web Development', 'AI & Automation', 'Software Solutions', 'Mobile Development']

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="relative h-64">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    <div className="p-6">
      <div className="mb-4">
        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
          {project.category}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span 
            key={tech}
            className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      
      {project.link && (
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          View Project
        </motion.a>
      )}
    </div>
  </motion.div>
)

const PortfolioPageContent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredProjects = projects.filter(
    project => selectedCategory === 'All' || project.category === selectedCategory
  )

  return (
    <>
      <div className="bg-[#EFF2F4] pt-32 pb-20 rounded-b-[40px]">
        <Container size="xl" className="relative">
          <div className="bg-white rounded-[30px] overflow-hidden shadow-lg">
            <div className="relative h-[300px] px-20 py-10">
              <img 
                src="/images/services/main-hero.jpg"
                alt="Portfolio Hero"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 h-full flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-white text-7xl font-bold mb-4">
                    Our Portfolio
                  </h1>
                  <p className="text-white text-xl opacity-90 max-w-2xl">
                    Explore our collection of innovative digital solutions and successful client projects
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </div>
        </Container>
      </div>

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
              Let's collaborate to create something amazing together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
            >
              Get in Touch
            </motion.button>
          </div>
        </Container>
      </motion.section>
    </>
  )
}

export default PortfolioPageContent
