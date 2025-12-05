'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutHeader = () => {
  return (
    <div className="relative w-full overflow-visible" style={{ minHeight: '65vh', maxHeight: '65vh' }}> 
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/hero_image.png")'
        }}
      />
      
      {/* Gradient Overlay from top to bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"> 
        <div className="max-w-4xl mx-auto space-y-4"> 
          
          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-lg sm:text-xl font-light tracking-wider">
              An Iconic Hotel Since 1998
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2"
          >
            <h1 className="title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              About Sixpoint Victoria
            </h1>
          </motion.div>

          {/* Description  */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              The seaside haven of warmth, tranquility and restoration.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
