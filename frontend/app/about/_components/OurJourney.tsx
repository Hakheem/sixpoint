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
      ease: "easeInOut" as const,
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
      ease: "easeInOut" as const,
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
      ease: "easeInOut" as const,
    },
  },
};

export default function OurJourney() {
  return (
    <section className="py-16 padded ">
      <div className="max-w-7xl mx-auto space-y-20">
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
            <div className="relative h-[500px] ">

              {/* Path Image  */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[70%] w-[50%] overflow-hidden">
                <Image
                  src="/path.png"
                  alt="Hotel pool with palm trees"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 65vw"
                  priority
                />
              </div>

              {/* Trees Image */}
              <div className="absolute right-0 top-0 h-full w-[65%] overflow-hidden">
                <Image
                  src="/trees.png"
                  alt="Poolside palm"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
            <p className="text-sm tracking-wide text-accent uppercase">
              Our Legacy & Heritage
            </p>
            <h2 className="text-4xl md:text-5xl title text-gray-700 font-semibold">Our Journey</h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Established in 1998, Sixpoint Victoria began as a vision to create an oasis
                of luxury amidst the natural beauty of Kisumu. Over two decades, we've evolved
                from a small boutique hotel into a premier destination, consistently setting
                new standards for hospitality excellence in Western Kenya.
              </p>
              <p>
                Our journey is marked by continuous innovation—from introducing the region's
                first infinity pool in 2005 to becoming the first carbon-neutral hotel in
                Kisumu in 2018. Through every milestone, we've remained committed to our
                founding principles: exceptional service, environmental stewardship, and
                creating unforgettable experiences for every guest who walks through our doors.
              </p>
              <p>
                Today, we stand as a testament to sustainable luxury, where traditional
                Kenyan warmth meets world-class amenities, creating a sanctuary that honors
                our rich heritage while embracing the future.
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
            <p className="text-sm tracking-wide text-accent uppercase">
              Beyond Accommodation
            </p>
            <h2 className="text-4xl md:text-5xl text-gray-700 font-semibold title leading-tight">
              A World of Choice and Endless Adventure Awaits
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                At Sixpoint Victoria, we believe luxury is defined by choice. Whether you seek
                tranquil relaxation by our palm-fringed pools, adventurous water sports on
                Lake Victoria, or cultural immersion in Kisumu's vibrant markets, every
                experience is crafted to your preferences.
              </p>
              <p>
                Our dedicated concierge team curates personalized itineraries—from sunrise
                birdwatching excursions in the Riat Hills to private sunset cruises on the
                lake. Indulge in culinary journeys that showcase the best of Kenyan and
                international cuisine, or rejuvenate with holistic wellness treatments
                inspired by local traditions.
              </p>
              <p>
                For those seeking adventure, we offer exclusive access to fishing expeditions,
                cultural village tours, and guided nature walks. For business travelers,
                our state-of-the-art facilities provide the perfect blend of productivity
                and relaxation. Whatever your journey brings you here for, we ensure every
                moment becomes a cherished memory.
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
            <div className="relative h-[500px]">
              {/* Top Right Image  */}
              <div className="absolute top-0 right-0 w-[70%] h-[70%] overflow-hidden">
                <Image
                  src="/volleyball.png"
                  alt="Pool volleyball game"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>

              {/* Bottom Left Image */}
              <div className="absolute bottom-0 left-0 w-[65%] h-[65%] overflow-hidden z-10">
                <Image
                  src="/cocktail_square.png"
                  alt="Poolside cocktail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

