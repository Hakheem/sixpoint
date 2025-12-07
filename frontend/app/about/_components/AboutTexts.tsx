"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import gsap from 'gsap';

const images = [
    '/swim_side.png',
    '/night_time.png',
    '/buffet.png',
];

const AboutAbout = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const handleWheel = (e: WheelEvent) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    container.scrollLeft += e.deltaY;
                }
            };

            container.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                container.removeEventListener('wheel', handleWheel);
            };
        }
    }, []);

    return (
        <section className="flex items-center justify-center py-16">
            <div className="pt-16 mx-auto w-full max-w-7xl padded">
                <div className=" text-center mx-auto">
                    {/* Heading */}
                    <div className="logo-text text-accent text-center font-semibold tracking-tight">
                        <h1 className="text-base sm:text-lg md:text-[1.2rem]">
                            SIXPOINT
                        </h1>
                        <h2 className="text-2xl sm:text-3xl md:text-[2rem]">
                            VICTORIA
                        </h2>
                    </div>

                    {/* Subtitle */}
                    <div className="my-5 title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-700 text-center font-semibold">
                        <p>
                            Amidst the Beauty of Riat Hills,
                            a Luxurious Escape Awaits
                        </p>
                    </div>

                    {/* Main Description */}
                    <div className="mb-12">
                        <div className="text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                            <p>
                                Nestled at the foot of the scenic Riat Hills, along the Kisumu Airport–Lake
                                Basin Mall Road, this luxurious retreat stands as the premier tourist-class
                                accommodation nearest to Kisumu International Airport, offering unmatched
                                accessibility for travelers. Surrounded by serenity and tranquility, it provides guests with an oasis
                                of calm, ensuring a truly restful and rejuvenating stay.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Image Container */}
                <div className="mt-12 w-full">
                    <div className="relative w-full h-[400px] overflow-hidden">
                        <Image
                            src={'/about.png'}
                            alt="Hotel room"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutAbout;
