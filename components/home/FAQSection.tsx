'use client'

import { motion } from 'framer-motion'
import { Accordion } from '@mantine/core'

const faqs = [
  {
    question: "What are the major services Devnex delivers?",
    answer: "Devnex specializes in AI Automation, Branding, Web Design, and Digital Marketing. We offer comprehensive solutions including custom AI implementations, brand identity development, responsive website design, and strategic digital marketing campaigns."
  },
  {
    question: "How is Devnex different from other companies?",
    answer: "We stand out through our innovative AI-first approach, combined with deep expertise in digital solutions. Our team brings together cutting-edge technology and creative excellence, delivering tailored solutions that drive real business growth."
  },
  {
    question: "How many industries does Devnex cater to?",
    answer: "Devnex works across multiple industries including technology, e-commerce, healthcare, finance, and education. Our versatile approach allows us to adapt our solutions to any industry's specific needs and challenges."
  },
  {
    question: "What steps does Devnex take to ensure a brand's success?",
    answer: "We follow a comprehensive approach: First, we conduct thorough market research and analysis. Then, we develop customized strategies aligned with your goals. Throughout implementation, we maintain constant communication and provide detailed analytics to measure success."
  },
  {
    question: "How does Devnex manage communication with clients?",
    answer: "We maintain transparent and regular communication through dedicated project managers, regular progress updates, and scheduled review meetings. Clients have access to real-time project tracking and direct channels to our team."
  },
  {
    question: "How can I get started with your services?",
    answer: "Getting started is easy! Simply click the 'Get in Touch' button or visit our contact page. Our team will schedule a consultation to understand your needs and develop a tailored solution for your business."
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const FAQSection = () => {
  return (
    <section className="py-20">
      <div className="container max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="section-title"
          >
            Got Questions? We've Got Answers
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Find answers to commonly asked questions about our services and processes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Accordion>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Accordion.Item value={`item-${index}`}>
                  <Accordion.Control>
                    <span className="text-lg font-medium">{faq.question}</span>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <p className="text-gray-600">{faq.answer}</p>
                  </Accordion.Panel>
                </Accordion.Item>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection
