'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SearchFilter from '@/components/ui/SearchFilter';

const RoomsHeader = () => {
  const [checkInDate, setCheckInDate] = React.useState<Date>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date>();
  const [guests, setGuests] = React.useState('2');
  const [roomType, setRoomType] = React.useState('all');

  const handleSearch = () => {
    // Implement search functionality for rooms page
    console.log('Searching rooms with:', { checkInDate, checkOutDate, guests, roomType });
    // You can add navigation or filtering logic here
  };

  return (
    <div className="relative w-full overflow-visible" style={{ minHeight: '70vh', maxHeight: '75vh' }}>

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
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16" style={{ paddingTop: '175px' }}>
        <div className="max-w-4xl mx-auto space-y-4">

          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-lg sm:text-xl font tracking-wide">
              Discover Our Accommodations
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-1"
          >
            <h1 className="title text-4xl md:text-5xl font-bold text-white leading-tight">
              Rooms . Suites . Villas
            </h1>
          </motion.div>

          {/* Description  */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Spend an exceptional holiday in paradise when you stay at SixPoint Hotel
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Filter - Positioned like in AboutHeader but with search */}
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
            variant="default"
            onSearch={handleSearch}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RoomsHeader;

