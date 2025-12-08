'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Tv, Coffee, Wind, Bath, Sparkles } from 'lucide-react';
import Link from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import RoomsHeader from './_components/RoomHeader';

interface Amenity {
  icon: React.ReactNode;
  name: string;
  description: string;
}

interface Room {
  id: number;
  name: string;
  price: number;
  image: string;
  amenities: Amenity[];
}

const amenitiesMap = {
  wifi: {
    icon: <Wifi className="w-5 h-5" />,
    name: 'WiFi',
    description: 'High-speed wireless internet access'
  },
  tv: {
    icon: <Tv className="w-5 h-5" />,
    name: 'Smart TV',
    description: 'Premium entertainment with streaming services'
  },
  coffee: {
    icon: <Coffee className="w-5 h-5" />,
    name: 'Coffee Maker',
    description: 'Fresh coffee anytime you need it'
  },
  ac: {
    icon: <Wind className="w-5 h-5" />,
    name: 'Air Conditioning',
    description: 'Climate control for your comfort'
  },
  bath: {
    icon: <Bath className="w-5 h-5" />,
    name: 'Premium Bath',
    description: 'Luxury bathroom with premium amenities'
  },
  cleaning: {
    icon: <Sparkles className="w-5 h-5" />,
    name: 'Daily Cleaning',
    description: 'Professional housekeeping service'
  }
};

const rooms: Room[] = [
  {
    id: 1,
    name: 'Deluxe Suite',
    price: 299,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=1200&fit=crop',
    amenities: [amenitiesMap.wifi, amenitiesMap.tv, amenitiesMap.coffee]
  },
  {
    id: 2,
    name: 'Ocean View',
    price: 450,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&h=1200&fit=crop',
    amenities: [amenitiesMap.wifi, amenitiesMap.ac, amenitiesMap.bath]
  },
  {
    id: 3,
    name: 'Garden Suite',
    price: 199,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=1200&fit=crop',
    amenities: [amenitiesMap.coffee, amenitiesMap.tv, amenitiesMap.cleaning]
  },
  {
    id: 4,
    name: 'Presidential Suite',
    price: 799,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&h=1200&fit=crop',
    amenities: [amenitiesMap.wifi, amenitiesMap.bath, amenitiesMap.cleaning]
  },
  {
    id: 5,
    name: 'Mountain View',
    price: 349,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&h=1200&fit=crop',
    amenities: [amenitiesMap.ac, amenitiesMap.tv, amenitiesMap.coffee]
  }
];

const RoomCard = ({ room }: { room: Room }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/rooms/${room.id}`}>
      <motion.div
        className="relative overflow-hidden rounded cursor-pointer group h-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full h-full min-h-[400px]">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Always visible: Name and Price */}
            <div className="text-white mb-4">
              <h3 className="text-2xl font-bold mb-1">{room.name}</h3>
              <p className="text-lg font-semibold">${room.price} <span className="text-sm font-normal text-gray-300">per night</span></p>
            </div>

            {/* Hover content */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Divider */}
                  <div className="border-t border-white/20 mb-4" />

                  {/* Button and Amenities inline */}
                  <div className="flex items-center justify-between">
                    {/* View Details Button */}
                    <Button className="bg-white text-black hover:bg-gray-100">
                      View Details
                    </Button>

                    {/* Amenities */}
                    <div className="flex items-center gap-4">
                      {room.amenities.map((amenity, index) => (
                        <HoverCard key={index} openDelay={100}>
                          <HoverCardTrigger>
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="text-white hover:text-gray-300 transition-colors cursor-help"
                            >
                              {amenity.icon}
                            </motion.div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-auto">
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">{amenity.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {amenity.description}
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const RoomsGrid = () => {
  return (
    <div className="w-full">
      <RoomsHeader />

      <div className="padded mx-auto py-16 lg:mt-12">
        {/* First Row: 1-2-1 Grid */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-1">
            <RoomCard room={rooms[0]} />
          </div>
          <div className="col-span-2">
            <RoomCard room={rooms[1]} />
          </div>
          <div className="col-span-1">
            <RoomCard room={rooms[2]} />
          </div>
        </div>

        {/* Second Row: 50-50 Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <RoomCard room={rooms[3]} />
          </div>
          <div>
            <RoomCard room={rooms[4]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsGrid;

