'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { number: '72', label: 'Premium Rooms', description: 'Luxury accommodations with stunning views' },
  { number: '24/7', label: 'Concierge Service', description: 'Round-the-clock personalized assistance' },
  { number: '4', label: 'Star Rating', description: 'Consistent excellence in hospitality' },
  { number: '98%', label: 'Guest Satisfaction', description: 'Exceptional experience guarantee' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const AboutNumbers = () => {
  return (
    <section className="relative py-24 padded overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/nice_bedroom.png")'
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-gray-400 mb-4">
            ENJOY YOUR STAY IN OUR HOTEL
          </h2>
          <p className="text-4xl title font-semibold text-white max-w-3xl mx-auto leading-relaxed ">
            Spend your comfortable holiday in the heart of the beautiful South Region
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-5xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              {/* Number */}
              <div className="mb-4">
                <span className="text-4xl font-medium text-primary leading-none">
                  {stat.number}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

export default AboutNumbers;

