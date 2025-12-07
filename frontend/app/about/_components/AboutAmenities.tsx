'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const amenities = [
  {
    title: 'Restaurant',
    subtitle: 'CULINARY EXPERIENCE',
    image: '/cocktail.png',
  },
  {
    title: 'Wellness Center',
    subtitle: 'SPA·SAUNA·MASSAGE',
    image: '/swimside.png',
  },
  {
    title: 'Fitness Center',
    subtitle: 'TRAINING AMENITIES',
    image: '/fitness.png',
  },
  {
    title: 'Celebrations',
    subtitle: 'MEETINGS & EVENTS',
    image: '/celebration.png',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    }, 
  },
};

export default function AboutAmenities() {
  return (
    <section className="py-16 padded">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-widest text-gray-600 mb-4">
            Luxury, comfort & tailor-made service
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium title mb-6">
            Amenities & Services
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            All you need to know to ensure your trip is perfect. State-of-the-art amenities include
            a dramatic double-story loft lounge, spectacular rooftop lounge, Technogym fitness
            center, media corner, and a gracious 24/7 resident services team.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-sm"
            >
              <div className="relative h-[450px] overflow-hidden rounded-sm">
                {/* Image with hover scale */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={amenity.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Overlay div  */}
                  <div className="absolute inset-0 m-2 pointer-events-none border-2 border-primary">
                   </div>

                </div>

                {/* Gradient Overlay - Fixed */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h3 className="text-3xl title text-primary mb-2">
                    {amenity.title}
                  </h3>
                  <p className="text-xs tracking-widest uppercase">
                    {amenity.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

