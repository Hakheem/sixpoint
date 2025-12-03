'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const VisitPlaces = () => {
  const places = [
    {
      id: 1,
      name: 'Ndere Island National Reserve',
      image: '/visit_place.png'
    },
    {
      id: 2,
      name: 'Ndere Island National Reserve',
      image: '/visit_place.png'
    },
    {
      id: 3,
      name: 'Ndere Island National Reserve',
      image: '/visit_place.png'
    },
    {
      id: 4,
      name: 'Ndere Island National Reserve',
      image: '/visit_place.png'

    }
  ]

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <p className="text-sm md:text-base uppercase tracking-wider text-yellow-600 font-medium">
            ATTRACTIONS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl title">
            Places You Can Visit
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {places.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden cursor-pointer shadow-lg"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <h3 className="text-white text-2xl md:text-3xl title font-medium transform transition-transform duration-500 group-hover:-translate-y-2">
                  {place.name}
                </h3>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-500 rounded-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VisitPlaces

