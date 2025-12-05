'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [checkInDate, setCheckInDate] = React.useState<Date>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date>();
  const [guests, setGuests] = React.useState('2');
  const [roomType, setRoomType] = React.useState('all');

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
          />
        </motion.div>
      </div>
    </div>
  );
};

// Search and Filter Component
interface SearchFilterProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (date: Date | undefined) => void;
  guests: string;
  setGuests: (guests: string) => void;
  roomType: string;
  setRoomType: (roomType: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  roomType,
  setRoomType,
}) => {
  return (
    <div className="bg-white rounded shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-300",
                  !checkInDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? format(checkInDate, "MMM dd") : "Check in"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-300",
                  !checkOutDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, "MMM dd") : "Check out"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Guests" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5 Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Room Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Room Type</label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Room type" />
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rooms</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Book Button */}
        <Button className="w-full rounded-md h-9 text-[#555] text-lg font-semibold">
          Find My Room
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;

