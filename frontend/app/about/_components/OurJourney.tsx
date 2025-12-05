'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function OurJourney() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* First Section - Our Journey */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images Side */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px]">
              {/* Background dark rectangle */}
              <div className="absolute -left-8 -top-8 w-48 h-48 bg-gray-900 -z-10" />
              
              {/* Main Image - Large */}
              <div className="relative h-[70%] w-full overflow-hidden rounded-sm mb-4">
                <Image
                  src="/swim_side.png"
                  alt="Hotel pool with palm trees"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Secondary Image - Smaller */}
              <div className="relative h-[calc(30%-1rem)] w-full overflow-hidden rounded-sm">
                <Image
                  src="/cocktail_square.png"
                  alt="Poolside view"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            <p className="text-sm tracking-widest text-gray-600 uppercase">
              A short history of the hotel
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">Our Journey</h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Second Section - World of Choice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6 lg:order-1"
          >
            <p className="text-sm tracking-widest text-gray-600 uppercase">
              A short history of the hotel
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              A World of Choice and Endless Adventure Awaits
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </motion.div>

          {/* Images Side */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative lg:order-2"
          >
            <div className="grid grid-rows-2 gap-4 h-[600px]">
              {/* Top Image - Pool volleyball */}
              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src="/volleyball.png"
                  alt="Pool volleyball game"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Bottom Image - Poolside drink */}
              <div className="relative overflow-hidden rounded-sm">
                <Image
                  src="/cocktail_square.png"
                  alt="Poolside cocktail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
