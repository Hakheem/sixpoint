'use client'

import React, { useState } from 'react';
import { Bath, ChevronLeft, ChevronRight, Wifi, Tv, Coffee, Wind, Droplets, Utensils, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Booking Card Component
const BookingCard = ({
    selectedDates
}: {
    selectedDates: { start: Date | null; end: Date | null }
}) => {
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(1);
    const [rooms, setRooms] = useState(2);

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <Card className="sticky top-28 bg-yellow-100 rounded-none border-none shadow-md">
            <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded">
                        <label className="text-sm text-gray-600 mb-1 block">Check In</label>
                        <div className="w-full font-medium">
                            {selectedDates.start ? formatDate(selectedDates.start) : 'Select date'}
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded">
                        <label className="text-sm text-gray-600 mb-1 block">Check Out</label>
                        <div className="w-full font-medium">
                            {selectedDates.end ? formatDate(selectedDates.end) : 'Select date'}
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded">
                        <label className="text-sm text-gray-600 mb-1 block">Adults</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                            >
                                -
                            </button>
                            <span className="font-medium flex-1 text-center">{adults}</span>
                            <button
                                onClick={() => setAdults(adults + 1)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded">
                        <label className="text-sm text-gray-600 mb-1 block">Children</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                            >
                                -
                            </button>
                            <span className="font-medium flex-1 text-center">{children}</span>
                            <button
                                onClick={() => setChildren(children + 1)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded">
                        <label className="text-sm text-gray-600 mb-1 block">Rooms</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setRooms(Math.max(1, rooms - 1))}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                            >
                                -
                            </button>
                            <span className="font-medium flex-1 text-center">{rooms}</span>
                            <button
                                onClick={() => setRooms(rooms + 1)}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <Link href="/checkout">
                    <Button className="w-full py-6 text-lg">
                        Book Now
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

// Date Picker Component
const DatePicker = ({
    onDateChange
}: {
    onDateChange: (dates: { start: Date | null; end: Date | null }) => void
}) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({
        start: null,
        end: null
    });
    const [selectingEnd, setSelectingEnd] = useState(false);

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const handleDateClick = (day: number, monthOffset: number) => {
        const date = new Date(currentMonth);
        date.setMonth(date.getMonth() + monthOffset);
        date.setDate(day);
        date.setHours(0, 0, 0, 0);

        // Don't allow selecting past dates
        if (date < today) return;

        if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
            // Start new selection
            const newRange = { start: date, end: null };
            setSelectedRange(newRange);
            setSelectingEnd(true);
            onDateChange(newRange);
        } else if (selectingEnd) {
            // Complete the range
            let newRange;
            if (date >= selectedRange.start) {
                newRange = { ...selectedRange, end: date };
            } else {
                newRange = { start: date, end: selectedRange.start };
            }
            setSelectedRange(newRange);
            setSelectingEnd(false);
            onDateChange(newRange);
        }
    };

    const isDateInRange = (day: number, monthOffset: number) => {
        if (!selectedRange.start) return false;

        const date = new Date(currentMonth);
        date.setMonth(date.getMonth() + monthOffset);
        date.setDate(day);
        date.setHours(0, 0, 0, 0);

        if (selectedRange.end) {
            return date >= selectedRange.start && date <= selectedRange.end;
        } else {
            return date.getTime() === selectedRange.start.getTime();
        }
    };

    const isStartDate = (day: number, monthOffset: number) => {
        if (!selectedRange.start) return false;
        const date = new Date(currentMonth);
        date.setMonth(date.getMonth() + monthOffset);
        date.setDate(day);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === selectedRange.start.getTime();
    };

    const isEndDate = (day: number, monthOffset: number) => {
        if (!selectedRange.end) return false;
        const date = new Date(currentMonth);
        date.setMonth(date.getMonth() + monthOffset);
        date.setDate(day);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === selectedRange.end.getTime();
    };

    const isPastDate = (day: number, monthOffset: number) => {
        const date = new Date(currentMonth);
        date.setMonth(date.getMonth() + monthOffset);
        date.setDate(day);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };

    const renderCalendar = (monthOffset: number) => {
        const date = new Date(currentMonth);
        date.setMonth(date.getMonth() + monthOffset);
        const { firstDay, daysInMonth } = getDaysInMonth(date);
        const days = [];

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10" />);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const inRange = isDateInRange(day, monthOffset);
            const isStart = isStartDate(day, monthOffset);
            const isEnd = isEndDate(day, monthOffset);
            const isPast = isPastDate(day, monthOffset);

            days.push(
                <div
                    key={day}
                    onClick={() => !isPast && handleDateClick(day, monthOffset)}
                    className={`h-10 flex items-center justify-center rounded transition-colors ${isPast
                            ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                            : isStart || isEnd
                                ? 'bg-primary font-bold text-black cursor-pointer'
                                : inRange
                                    ? 'bg-yellow-100 cursor-pointer'
                                    : 'hover:bg-gray-100 cursor-pointer'
                        }`}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const goToPrevMonth = () => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentMonth(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentMonth(newDate);
    };

    return (
        <div className="border-t border-b py-8 my-8">
            <h2 className="text-3xl title mb-6">Availability</h2>
            <div className="flex gap-4 items-start">
                <button
                    onClick={goToPrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors mt-8"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                    {[0, 1].map((offset) => {
                        const date = new Date(currentMonth);
                        date.setMonth(date.getMonth() + offset);
                        return (
                            <div key={offset}>
                                <div className="text-center font-semibold mb-4">
                                    {months[date.getMonth()]} {date.getFullYear()}
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                        <div key={day} className="font-semibold text-gray-600 h-10 flex items-center justify-center">
                                            {day}
                                        </div>
                                    ))}
                                    {renderCalendar(offset)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors mt-8"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

// Main Room Page Component
const RoomSlugPage = () => {
    const [selectedDates, setSelectedDates] = useState<{ start: Date | null; end: Date | null }>({
        start: null,
        end: null
    });

    const [images, setImages] = useState([
        { id: 0, url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&h=600&fit=crop' },
        { id: 1, url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop' },
        { id: 2, url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop' },
        { id: 3, url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop' },
        { id: 4, url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop' }
    ]);

    const roomFacilities = [
        { icon: Wifi, name: 'Free WiFi' },
        { icon: Tv, name: 'Smart TV' },
        { icon: Coffee, name: 'Coffee Maker' },
        { icon: Wind, name: 'Air Conditioning' },
        { icon: Bath, name: 'Private Bathroom' },
        { icon: Droplets, name: 'Hot Water' },
        { icon: Utensils, name: 'Mini Bar' },
        { icon: Sparkles, name: 'Daily Housekeeping' },
    ];

    const handleImageClick = (clickedIndex: number) => {
        const newImages = [...images];
        const temp = newImages[0];
        newImages[0] = newImages[clickedIndex];
        newImages[clickedIndex] = temp;
        setImages(newImages);
    };

    return (
        <div className="padded mt-32">
            {/* Full Width Image Gallery */}
            <div className="w-full">
                <div className="grid grid-cols-4 gap-3" style={{ height: '500px' }}>
                    {/* Main Large Image */}
                    <div
                        className="col-span-2 bg-gray-200 rounded-lg overflow-hidden cursor-pointer h-full"
                    >
                        <img
                            src={images[0].url}
                            alt="Main room view"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Grid - All same height as main */}
                    <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-3 h-full">
                        {images.slice(1, 5).map((img, idx) => (
                            <div
                                key={img.id}
                                onClick={() => handleImageClick(idx + 1)}
                                className="bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-all h-full"
                            >
                                <img
                                    src={img.url}
                                    alt={`Room view ${img.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section with 3 Column Grid */}
            <div className="mx-auto py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Spans 2 columns */}
                    <div className="lg:col-span-2">
                        <div className="mb-2">
                            <span className="text-accent text-sm font-semibold uppercase">$174 PER NIGHT</span>
                        </div>
                        <h1 className="text-4xl title mb-6">Family Suite</h1>

                        {/* Bathroom Icons */}
                        <div className="flex gap-8 mb-8">
                            <div className="flex items-center gap-2">
                                <Bath className="w-5 h-5" />
                                <span className="text-sm">2 bathrooms</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath className="w-5 h-5" />
                                <span className="text-sm">2 bathrooms</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath className="w-5 h-5" />
                                <span className="text-sm">2 bathrooms</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8 text-gray-700 leading-relaxed">
                            <p className="mb-4">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                            </p>
                            <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable of your business.
                            </p>
                        </div>

                        {/* Room Facilities */}
                        <div className="mb-8">
                            <h2 className="text-3xl title mb-6">Room Facilities</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {roomFacilities.map((facility, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <facility.icon className="w-5 h-5" />
                                        <span className="text-sm">{facility.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Date Picker */}
                        <DatePicker onDateChange={setSelectedDates} />

                        {/* Room Rules */}
                        <div className="mb-8">
                            <h2 className="text-3xl title mb-6">Room Rules</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li>-Check-in: After 2.00 PM</li>
                                <li>-Check-out: 11 AM</li>
                                <li>-Self check-in with lockbox</li>
                                <li>-Pets are allowed</li>
                                <li>-No smoking</li>
                            </ul>
                        </div>

                        {/* Additional Services */}
                        <div>
                            <h2 className="text-3xl title mb-6">Additional Services</h2>
                            <div className="space-y-4">
                                {[1, 2].map((item) => (
                                    <div key={item} className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-300 rounded shrink-0" />
                                        <div>
                                            <div className="font-semibold">Airport Pickup</div>
                                            <div className="text-yellow-600 font-semibold">$12 / Package</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Card - Spans 1 column and is sticky */}
                    <div className="lg:col-span-1">
                        <BookingCard selectedDates={selectedDates} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomSlugPage;

