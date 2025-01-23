'use client'

import { motion } from 'framer-motion'
import { Container, Text } from '@mantine/core'

interface TeamMember {
  name: string
  role: string
  description: string
  image: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

const team: TeamMember[] = [
  {
    name: "Abubakar",
    role: "CEO & Founder",
    description: "Content Manager & Strategist with expertise in driving digital initiatives",
    image: "/images/team/abubakar.jpg"
  },
  {
    name: "Zaryab Ahmed",
    role: "CSO & CMO",
    description: "SEO Expert & Content Writer specializing in strategic growth",
    image: "/images/team/zaryab.jpg"
  },
  {
    name: "Umar Javed",
    role: "COO & CTO",
    description: "Web Developer & AI Application Engineer leading technical innovation",
    image: "/images/team/umar.jpg"
  },
  {
    name: "Umair Abid",
    role: "CIO",
    description: "Chief Researcher & Data Scientist driving data-driven solutions",
    image: "/images/team/umair.jpg"
  },
  {
    name: "Usama Nazir",
    role: "SEO Expert",
    description: "Digital Marketing Specialist focused on maximizing online presence",
    image: "/images/team/usama.jpg"
  },
  {
    name: "Hammid",
    role: "DevOps Engineer",
    description: "Cloud Infrastructure Engineer ensuring robust system architecture",
    image: "/images/team/hammid.jpg"
  }
]

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
  >
    <div className="aspect-[4/5] relative overflow-hidden">
      {/* Image Container */}
      <div className="absolute inset-0">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-[calc(100%-130px)] group-hover:translate-y-0 transition-transform duration-500">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
            <Text className="text-primary-100 font-semibold mb-4">{member.role}</Text>
            <Text className="text-gray-100 text-sm transform opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {member.description}
            </Text>

            {/* Social Links */}
            <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
)

const AboutPageContent = () => {
  return (
    <>
      <div className="bg-[#EFF2F4] pt-32 pb-20 rounded-b-[40px]">
        <Container size="xl" className="relative">
          <div className="bg-white rounded-[30px] overflow-hidden shadow-lg">
            <div className="relative h-[300px] px-20 py-10">
              <img 
                src="/images/services/main-hero.jpg" 
                alt="About Hero" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 h-full flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-white text-7xl font-bold mb-4">
                    Our Team
                  </h1>
                </motion.div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20 bg-white rounded-2xl p-10"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Innovating Digital Solutions</h2>
              <Text className="text-xl text-gray-600 leading-relaxed">
                At Devnex, we combine creativity with technical expertise to deliver cutting-edge digital solutions. 
                Our diverse team of experts brings together years of experience in web development, AI engineering, 
                digital marketing, and business strategy to help businesses thrive in the digital age.
              </Text>
            </div>
          </motion.div>

          {/* Team Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <TeamMemberCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-primary text-white"
      >
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-8 opacity-90">
              To empower businesses with innovative digital solutions that drive growth, 
              enhance efficiency, and create lasting impact in the digital landscape.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
            >
              Join Our Team
            </motion.button>
          </div>
        </Container>
      </motion.section>
    </>
  )
}

export default AboutPageContent
