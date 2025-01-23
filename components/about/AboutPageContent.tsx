'use client'

import { motion } from 'framer-motion'
import { Container, Text } from '@mantine/core'

interface TeamMember {
  name: string
  role: string
  description: string
  image: string
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
    className="group relative overflow-hidden rounded-2xl bg-white"
  >
    <div className="aspect-[4/5] overflow-hidden">
      <motion.img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    <motion.div
      className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-white/90 font-medium mb-2">{member.role}</p>
        <p className="text-white/80 text-sm transform opacity-0 group-hover:opacity-100 transition-all duration-300">
          {member.description}
        </p>
      </div>
    </motion.div>

    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      whileHover={{ scale: 1.05 }}
    />
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
          <div className="py-20">
            <Container size="xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {team.map((member, index) => (
                  <TeamMemberCard key={member.name} member={member} index={index} />
                ))}
              </motion.div>
            </Container>
          </div>
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
