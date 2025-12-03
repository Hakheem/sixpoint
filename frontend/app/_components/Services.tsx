'use client'

import React from "react";
import { motion } from "framer-motion";

// Card Data
const cardsData = [
  {
    id: 1,
    title: "Gastronomic Dine",
    description: "Our restaurants use fresh, organic ingredients that are locally produced and sourced. Delicious flavors and a warm atmosphere are the perfect way to unwind.",
    image: "/dine.png",
    link: "#dining"
  },
  {
    id: 2,
    title: "Infinity Pool & Spa",
    description: "Immerse yourself in luxury with our temperature-controlled infinity pool overlooking Lake Victoria. Our spa offers rejuvenating treatments inspired by local traditions.",
    image: "/swimo.png",
    link: "#pool"
  },
  {
    id: 3,
    title: "Lake Victoria Cruises",
    description: "Experience the majesty of Lake Victoria with our private sunset cruises. Discover the rich biodiversity and stunning vistas of Africa's largest lake.",
    image: "/boat.png",
    link: "#cruises"
  }
];

const Services = () => {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/bg_parallax.png"
            alt="Sixpoint Victoria"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 0.1, 0.36, 1] }}
          className="relative z-10 text-gray-100 padded"
        >

          <h2 className="title title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold max-w-5xl mx-auto  mb-6">
            One of East Africa's Most Desirable Locations
          </h2>
          <p className="text-base md:text-lg  tracking-wide mt-6">
            Kisumu's jewel on Lake Victoria.
          </p>
        </motion.div>
      </div>

      {/* Cards Section with Overlap */}
      <div className="relative -mt-32 pb-32 padded">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-start">

            {cardsData.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.15,
                  ease: [0.22, 0.1, 0.36, 1]
                }}
                className={`lg:col-span-4 bg-white  overflow-hidden group ${index === 1 ? 'lg:mt-20' : ''
                  }`}
              >
                <div className="relative h-[500px] border-6 border-white overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl  mb-4 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {card.description}
                  </p>

                  <div className="flex items-center flex-col justify-between group">

                    <button className="cursor-pointer inline-flex text-gray-500 items-center font-medium hover:text-accent transition-colors group">
                      Discover More
                    </button>
                    <div className=" h-0.5 w-20 bg-accent mt-1  group-hover:cursor-pointer"></div>
                  </div>

                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
