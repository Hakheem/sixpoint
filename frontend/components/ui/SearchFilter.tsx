'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface SearchFilterProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (date: Date | undefined) => void;
  guests: string;
  setGuests: (guests: string) => void;
  roomType: string;
  setRoomType: (roomType: string) => void;
  variant?: 'default' | 'compact';
  onSearch?: () => void;
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
  variant = 'default',
  onSearch,
}) => {
  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
    // any additional search logic here
  };

  return (
    <div className={cn(
      "bg-white rounded shadow-md",
      variant === 'compact' ? 'p-4' : 'p-6'
    )}>
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
                  !checkInDate && "text-gray-500",
                  variant === 'compact' && "h-9"
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
                  !checkOutDate && "text-gray-500",
                  variant === 'compact' && "h-9"
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
            <SelectTrigger className={cn(
              "w-full border-gray-300",
              variant === 'compact' && "h-9"
            )}>
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
            <SelectTrigger className={cn(
              "w-full border-gray-300",
              variant === 'compact' && "h-9"
            )}>
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

        {/* Search/Book Button */}
        <Button 
          className={cn(
            "w-full rounded-md text-[#555] text-lg font-semibold",
            variant === 'compact' ? "h-9" : "h-10"
          )}
          onClick={handleSearch}
        >
          {variant === 'compact' ? 'Find Room' : 'Find My Room'}
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;

