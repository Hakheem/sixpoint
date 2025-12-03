"use client";

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Testimonials
const testimonials = [
  {
    id: 1,
    quote: "Sixpont Victoria exceeded every expectation. From the breathtaking views of Lake Victoria to the impeccable service, every moment felt like a dream. The rooms were luxurious yet cozy, and the attention to detail, from the gourmet breakfast to the serene poolside ambiance, made our stay unforgettable. This isn't just a getaway; it's a slice of paradise. We'll be back!",
    author: "Sarah K - Nairobi",
    rating: 5,
  },
  {
    id: 2,
    quote: "An absolutely magical experience. The sunset views over Lake Victoria were breathtaking, and the staff went above and beyond to make our anniversary special. The attention to detail in every aspect of our stay was remarkable. We've traveled all over Africa, and this is truly a hidden gem.",
    author: "Michael T - Kisumu",
    rating: 4.5,
  },
  {
    id: 3,
    quote: "As a frequent traveler for business, I've stayed in many hotels across East Africa. Sixpoint Victoria stands out for its perfect blend of luxury and authentic Kenyan hospitality. The facilities are world-class, and the location provides both tranquility and easy access to Kisumu's attractions. Highly recommended",
    author: "Dr. James M - Kampala",
    rating: 4.7,
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 210000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const goToTestimonial = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-5 h-5 md:w-6 md:h-6 fill-current text-primary" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative w-5 h-5 md:w-6 md:h-6">
          <Star className="absolute w-5 h-5 md:w-6 md:h-6 text-primary" />
          <div className="absolute overflow-hidden w-1/2">
            <Star className="w-5 h-5 md:w-6 md:h-6 fill-current text-primary" />
          </div>
        </div>
      );
    }

    // Fill remaining stars as empty
    const totalStars = 5;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 md:w-6 md:h-6 text-primary" />
      );
    }

    return stars;
  };

  return (
    <div className='relative w-full flex items-center justify-center py-20 md:py-28'>
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 w-full h-full bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"
          style={{
            backgroundImage: `url('/testimonial_bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 w-full h-full bg-black/60" />
      </div>

      {/* Main content container - Fixed height wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto padded">
        <div className="w-full max-w-4xl mx-auto min-h-[500px] md:min-h-[550px] flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Subtitle */}
            <div>
              <div className="logo-text text-gray-400 text-center font-semibold tracking-tight">
                <h1 className="text-base sm:text-lg md:text-[1.2rem]">
                  SIXPOINT
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-[2rem]">
                  VICTORIA
                </h2>
              </div>
              <h3 className="text-accent text-xl font-medium tracking-wide mt-8">
                VOICES FROM OUR GUESTS
              </h3>
              <div className="h-0.5 w-16 bg-accent mx-auto mt-2" />
            </div>
          </div>

          {/* Testimonial  */}
          <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'} flex-1 flex flex-col justify-between`}>

            {/* Testimonial quote  */}
            <div className="flex-1 flex items-center justify-center mb-6 md:mb-8">
              <blockquote className="text-gray-200 text-lg leading-loose text-center max-w-3xl mx-auto padded overflow-y-auto max-h-[300px] md:max-h-[400px]">
                {currentTestimonial.quote}
              </blockquote>
            </div>

            {/* Reviewer info */}
            <div className="text-center space-y-3">
              {/* Star rating */}
              <div className="flex justify-center items-center gap-1">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Reviewer name */}
              <div>
                <p className="text-gray-200 font-medium text-base">
                  {currentTestimonial.author}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center gap-4 pt-8 md:pt-10">
            {/* Previous button */}
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-200 group cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white" />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex
                      ? 'bg-accent w-8'
                      : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-200 group cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

