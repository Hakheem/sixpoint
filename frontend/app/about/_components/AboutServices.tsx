'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Wifi,
  Car,
  Dumbbell,
  Coffee,
  ConciergeBell,
  Wine,
  ShieldCheck,
  Sparkles,
  Umbrella,
  Users,
  Clock,
  Smartphone,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const services = [
  {
    id: 1,
    title: 'High-Speed WiFi',
    description: 'Complimentary high-speed internet access throughout the hotel',
    icon: Wifi,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 2,
    title: 'Valet Parking',
    description: '24/7 valet parking service with secure vehicle storage',
    icon: Car,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    id: 3,
    title: 'Fitness Center',
    description: 'State-of-the-art gym equipment and personal training sessions',
    icon: Dumbbell,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    id: 4,
    title: '24/7 Room Service',
    description: 'Round-the-clock dining with gourmet menu options',
    icon: Coffee,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    id: 5,
    title: 'Concierge Service',
    description: 'Personalized assistance with reservations and local experiences',
    icon: ConciergeBell,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 6,
    title: 'Bar & Lounge',
    description: 'Signature cocktails and premium spirits in elegant settings',
    icon: Wine,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
  },
  {
    id: 7,
    title: 'Security & Safety',
    description: '24-hour security surveillance and in-room safes',
    icon: ShieldCheck,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 8,
    title: 'Spa & Wellness',
    description: 'Luxurious spa treatments and relaxation therapies',
    icon: Sparkles,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 9,
    title: 'Pool Access',
    description: 'Infinity pool with panoramic views and poolside service',
    icon: Umbrella,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
  },
  {
    id: 10,
    title: 'Business Center',
    description: 'Fully equipped meeting rooms and business facilities',
    icon: Users,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function AboutServices() {
  return (
    <section className="py-16 padded">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=" mb-12"
        >
          <p className="text-sm tracking-wide text-gray-600 mb-4">
            Premium hospitality services
          </p>
          <h2 className="text-4xl md:text-5xl  title font-semibold mb-6">
            Why Choose Us
          </h2>
          <p className="text-gray-600 max-w-4xl ">
            Experience unparalleled luxury with our comprehensive suite of services designed to make 
            your stay exceptional. From personalized concierge to state-of-the-art facilities, we cater 
            to every need with precision and care.
          </p>
        </motion.div>

        {/* Mobile Slider  */}
        <div className="lg:hidden mb-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
              },
            }}
            className="pb-12"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <SwiperSlide key={service.id}>
                  <div className={`p-6 rounded-xl h-full  hover:shadow-md transition-shadow duration-300`}>
                    <div className="flex flex-col items-center text-center h-full">
                      <div className={`p-4 rounded-full bg-gray-50 mb-4`}>
                        <Icon className={`w-8 h-8 bg-gray-500`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm grow">{service.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Desktop Grid - Hidden on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={` p-6 rounded-md  transition-all duration-300  group`}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className={`p-4 rounded-full bg-gray-50 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm grow">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

