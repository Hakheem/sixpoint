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

const AboutSection = () => {
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
      <div className="pt-32 mx-auto w-full">
        <div className="max-w-5xl text-center mx-auto">
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

          {/* Learn More Button */}
          <div className="mb-20 md:mb-24 group">
            <Button className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-[#C8A903] text-[#C8A903] hover:bg-[#C8A903] hover:text-white font-medium transition-all duration-300 rounded-none text-sm sm:text-base">
              Learn More
            </Button>
          </div>
        </div>

        {/* Image Grid */}
        <div
          ref={scrollContainerRef}
          className="md:grid md:grid-cols-3 gap-5 mt-12 padded w-full overflow-hidden"
        >
          {/* Mobile: Horizontal scroll container */}
          <div className="md:hidden flex gap-5 overflow-x-auto scrollbar-hide pb-4">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative h-72 w-[85vw] shrink-0 overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Hotel image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="85vw"
                />
              </div>
            ))}
          </div>

          {/* Desktop: Normal grid */}
          {images.map((src, index) => (
            <div
              key={index}
              className="hidden md:block relative h-72 md:h-80 lg:h-96 overflow-hidden"
            >
              <Image
                src={src}
                alt={`Hotel image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

