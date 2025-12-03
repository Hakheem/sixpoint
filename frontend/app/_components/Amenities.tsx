'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Luggage, Coffee, Wifi, Waves, Users, Shirt } from 'lucide-react'
import Image from 'next/image'

const Amenities = () => {
  const services = [
    {
      icon: Luggage,
      title: 'Airport Pickup Services',
      description: 'Lorem ipsum proin gravida velit auctor sde re sit amet space.'
    },
    {
      icon: Coffee,
      title: 'Breakfast In Bed',
      description: 'Lorem ipsum proin gravida velit auctor sde re sit amet space.'
    },
    {
      icon: Wifi,
      title: 'Wifi & Internet',
      description: 'Lorem ipsum proin gravida velit auctor sde re sit amet space.'
    },
    {
      icon: Waves,
      title: 'Swimming Amenities',
      description: 'Lorem ipsum proin gravida velit auctor sde re sit amet space.'
    },
    {
      icon: Users,
      title: 'Housekeeping Services',
      description: 'Lorem ipsum proin gravida velit auctor sde re sit amet space.'
    },
    {
      icon: Shirt,
      title: 'Laundry Services',
      description: 'Lorem ipsum proin gravida velit auctor sde re sit amet space.'
    }
  ]

  return (
    <section className="w-full  py-16 md:pt-32 md:pb-24">
      <div className=" mx-auto padded">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[500px] md:h-[600px] rounded overflow-hidden shadow-md"
          >
            <Image
              src="/outdoor_palm.png"
              alt="Luxury hotel interior with palm trees"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-sm md:text-base uppercase tracking-wider text-accent font-medium">
                DISCOVER THE SERVICES WE OFFER
              </p>
              <h2 className="text-4xl md:text-5xl title font-semibold tracking-loose leading-tight">
                All the Essentials for a Cozy and <span className=''>Comfortable Stay </span>
              </h2>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex gap-4 group "
                  >
                    <div className="shrink-0">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-700 transition-all duration-300  ">
                        <Icon className="w-6 h-6 text-gray-700 transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg  font-medium transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Amenities
