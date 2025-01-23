'use client'

import { motion } from 'framer-motion'
import { Container, Title, Text } from '@mantine/core'

interface SubService {
  title: string
  description: string
}

interface Service {
  category: string
  icon: string
  description: string
  subServices: SubService[]
}

const services: Service[] = [
  {
    category: "AI & Automation",
    icon: "/images/services/ai-automation.svg",
    description: "Revolutionize your business operations with cutting-edge AI solutions",
    subServices: [
      {
        title: "AI Agents & Assistants",
        description: "Custom AI agents tailored to automate specific business processes and enhance productivity"
      },
      {
        title: "Intelligent Chatbots",
        description: "Advanced conversational AI for superior customer service and engagement"
      },
      {
        title: "Workflow Automation",
        description: "Smart automation solutions to streamline your business operations"
      }
    ]
  },
  {
    category: "Development & Design",
    icon: "/images/services/web-dev.svg",
    description: "Create compelling digital experiences that drive results",
    subServices: [
      {
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies"
      },
      {
        title: "E-commerce Solutions",
        description: "Scalable online stores with seamless payment integration"
      },
      {
        title: "WordPress Development",
        description: "Custom WordPress solutions with powerful functionality"
      }
    ]
  },
  {
    category: "Digital Marketing",
    icon: "/images/services/digital-marketing.svg",
    description: "Drive growth through data-driven digital marketing strategies",
    subServices: [
      {
        title: "SEO Optimization",
        description: "Comprehensive SEO strategies to improve your online visibility"
      },
      {
        title: "PPC Management",
        description: "Results-driven paid advertising campaigns across platforms"
      },
      {
        title: "Content Marketing",
        description: "Strategic content creation that engages and converts"
      }
    ]
  },
  {
    category: "Branding & Identity",
    icon: "/images/services/branding.svg",
    description: "Build a powerful brand that resonates with your audience",
    subServices: [
      {
        title: "Brand Strategy",
        description: "Strategic brand positioning and identity development"
      },
      {
        title: "Visual Design",
        description: "Professional design services for all brand touchpoints"
      },
      {
        title: "Brand Guidelines",
        description: "Comprehensive brand guidelines for consistent communication"
      }
    ]
  }
]

interface ServiceCardProps {
  service: Service
  index: number
}

const ServiceCard = ({ service, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4"
        >
          <img src={service.icon} alt={service.category} className="w-6 h-6" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.category}</h3>
        <Text className="text-gray-600">{service.description}</Text>
      </div>
      
      <div className="grid gap-4">
        {service.subServices.map((subService, idx) => (
          <motion.div
            key={subService.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Text fw={600} className="text-gray-900 mb-1">
              {subService.title}
            </Text>
            <Text size="sm" className="text-gray-600">
              {subService.description}
            </Text>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
)

const ServicesPageContent = () => (
  <>
    <div className="bg-[#EFF2F4] pt-32 pb-20 rounded-b-[40px]">
      <Container size="xl" className="relative">
        <div className="bg-white rounded-[30px] overflow-hidden shadow-lg">
          <div className="relative h-[300px] px-20 py-10">
            <img 
              src="/images/services/main-hero.jpg" 
              alt="Services Hero" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 h-full flex flex-col justify-center">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                >
                <h1 className="text-white text-7xl font-bold mb-4">
                  Our Services
                </h1>
                </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.category} service={service} index={index} />
            ))}
          </div>
        </motion.div>
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
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 opacity-90">
            Let's collaborate to bring your vision to life with our expertise.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
          >
            Start a Project
          </motion.button>
        </div>
      </Container>
    </motion.section>
  </>
)

export default ServicesPageContent
