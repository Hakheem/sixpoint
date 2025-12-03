'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Bed, Maximize, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RoomData {
  id: number
  title: string
  roomType: string
  price: number
  guests: number
  beds: string
  size: number
  description: string
  image: string
}

const roomsData: RoomData[] = [
  {
    id: 1,
    title: 'Double Suite Rooms',
    roomType: 'LUXURY ROOM',
    price: 50,
    guests: 4,
    beds: '2 King beds',
    size: 80,
    description: 'A sanctuary of comfort and calm, designed for effortless relaxation. Sink into plush bedding, unwind with serene views, and wake up to a curated breakfast experience. Every detail is crafted to turn your stay into a peaceful escape.',
    image: '/api/placeholder/600/400'
  },
  {
    id: 2,
    title: 'Deluxe Family Room',
    roomType: 'LUXURY ROOM',
    price: 50,
    guests: 4,
    beds: '2 King beds',
    size: 80,
    description: 'A sanctuary of comfort and calm, designed for effortless relaxation. Sink into plush bedding, unwind with serene views, and wake up to a curated breakfast experience. Every detail is crafted to turn your stay into a peaceful escape.',
    image: '/family_room.png'
  },
  {
    id: 3,
    title: 'Triple Suite Rooms',
    roomType: 'LUXURY ROOM',
    price: 50,
    guests: 4,
    beds: '2 King beds',
    size: 80,
    description: 'A sanctuary of comfort and calm, designed for effortless relaxation. Sink into plush bedding, unwind with serene views, and wake up to a curated breakfast experience. Every detail is crafted to turn your stay into a peaceful escape.',
    image: '/api/placeholder/600/400'
  },
  {
    id: 4,
    title: 'Executive Suite',
    roomType: 'LUXURY ROOM',
    price: 50,
    guests: 4,
    beds: '2 King beds',
    size: 80,
    description: 'A sanctuary of comfort and calm, designed for effortless relaxation. Sink into plush bedding, unwind with serene views, and wake up to a curated breakfast experience. Every detail is crafted to turn your stay into a peaceful escape.',
    image: '/luxury_room.png'
  },
  {
    id: 5,
    title: 'Presidential Suite',
    roomType: 'LUXURY ROOM',
    price: 50,
    guests: 4,
    beds: '2 King beds',
    size: 80,
    description: 'A sanctuary of comfort and calm, designed for effortless relaxation. Sink into plush bedding, unwind with serene views, and wake up to a curated breakfast experience. Every detail is crafted to turn your stay into a peaceful escape.',
    image: '/api/placeholder/600/400'
  }
]

const RoomCard: React.FC<{ room: RoomData }> = ({ room }) => {
  return (
    <div className="bg-gray-50 rounded-md overflow-hidden flex flex-col h-full">
      <div className="relative h-64 md:h-80 bg-gray-800 overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-yellow-400 text-[#101010] px-4 rounded py-1.5 font-medium text-sm">
          ${room.price} / Night
        </div>
      </div>

      <div className="p-4 md:p-6 mb-3 flex flex-col grow">
        <p className="text-accent font-semibold text-xs tracking-wider mb-2">
          {room.roomType}
        </p>
        <h3 className="text-2xl md:text-3xl title mb-4">{room.title}</h3>

        <div className="flex items-center gap-6 mb-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{room.guests} Guests</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed size={18} />
            <span>{room.beds}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize size={18} />
            <span>{room.size} sq ft</span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-5 grow">
          {room.description}
        </p>

        <button className="cursor-pointer inline-flex text-accent items-center font-medium transition-colors group">
          Discover More
          <ChevronRight
            size={20}
            className="ml-1 group-hover:cursor-pointer"
          />
        </button>
        <div className="h-0.5 w-20 bg-primary mt-1"></div>
      </div>
    </div>
  )
}

const RoomsSnippet: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Calculate visible rooms based on screen size
  const getVisibleRooms = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 768) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const [visibleRooms, setVisibleRooms] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setVisibleRooms(getVisibleRooms())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-slide every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roomsData.length)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const getVisibleRoomIndices = () => {
    const indices = []
    for (let i = 0; i < visibleRooms; i++) {
      indices.push((currentIndex + i) % roomsData.length)
    }
    return indices
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const visibleIndices = getVisibleRoomIndices()

  return (
    <div className="padded lg:min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm tracking-wide font-medium capitalize text-gray-500 mb-3">
              ENJOY WORLD CLASS STAY EXPERIENCE
            </p>
            <h2 className="title font-semibold text-4xl md:text-5xl">
              The Accommodations
            </h2>
          </div>
          <Button className="font-medium px-8 py-6 mt-6 md:mt-0 self-start md:self-auto">
            Discover All Suites
          </Button>
        </div>

        {/* Slider  */}
        <div className="overflow-hidden">
          <motion.div
            key={currentIndex}
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {visibleIndices.map((index) => (
              <RoomCard key={`${roomsData[index].id}-${currentIndex}`} room={roomsData[index]} />
            ))}
          </motion.div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-12">
            {roomsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-gray-300 hover:bg-accent'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomsSnippet


