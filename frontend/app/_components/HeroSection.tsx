'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SearchFilter, { SearchFilterProps } from '@/components/ui/SearchFilter';

const HeroSection = () => {
  const [checkInDate, setCheckInDate] = React.useState<Date>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date>();
  const [guests, setGuests] = React.useState('2');
  const [roomType, setRoomType] = React.useState('all');

  const handleSearch = () => {
    // Implement search functionality for main page
    console.log('Searching rooms with:', { checkInDate, checkOutDate, guests, roomType });
  };

  return (
    <div className="relative h-screen w-full overflow-visible"> 
      
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
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-16"> 
        <div className="max-w-4xl mx-auto space-y-4"> 
          
          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-lg sm:text-xl font-light tracking-wider">
              Welcome to Sixpoint Victoria
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2"
          >
            <h1 className="title text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Where Every Moment
              <br />
              Feels Like Home
            </h1>
          </motion.div>

          {/* Description  */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              At Sixpoint, we invite you to experience a haven of serenity amidst the bustling city scape. 
              Our establishment stands as a beacon of refined elegance and unparalleled comfort.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Filter  */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[80%] mx-auto max-w-6xl px-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SearchFilter 
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            guests={guests}
            setGuests={setGuests}
            roomType={roomType}
            setRoomType={setRoomType}
            onSearch={handleSearch}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

