'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const VisitPlaces = () => {
  const places = [
    {
      id: 1,
      name: 'Kakamega Rainforest',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'
    },
    {
      id: 2,
      name: 'Lake Victoria',
      image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80'
    },
    {
      id: 3,
      name: 'Ruma National Park',
      image: 'https://images.unsplash.com/photo-1547970810-dc1e684757a2?w=800&q=80'
    },
    {
      id: 4,
      name: 'Ndere Island National Park',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80'
    },
    {
      id: 5,
      name: 'Kisumu Impala Sanctuary',
      image: 'https://images.unsplash.com/photo-1535338454770-6c4f6d65d7b8?w=800&q=80'
    },
    {
      id: 6,
      name: 'Kit Mikayi Rock Shrine',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
    }
  ]

  const paginationRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<any>(null)

  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto padded">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <p className="text-sm md:text-base uppercase tracking-wider text-accent font-medium">
            ATTRACTIONS
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold title">
            Places You Can Visit
          </h2>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gray-500 !w-3 !h-3 !rounded-full !transition-all !duration-300',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-accent !w-10 !h-3 !rounded-full'
            }}
            autoplay={{
              delay: 180000,
              disableOnInteraction: false,
            }}
            loop={true}
            onSwiper={(swiper: any) => {
              swiperRef.current = swiper
            }}
            onBeforeInit={(swiper: any) => {
              if (typeof swiper.params.pagination !== 'boolean' && swiper.params.pagination) {
                swiper.params.pagination.el = paginationRef.current
              }
            }}
            className="!pb-8"
          >
            {places.map((place) => (
              <SwiperSlide key={place.id}>
                <div className="group relative h-[300px] md:h-[350px] lg:h-[400px] rounded overflow-hidden cursor-pointer shadow-sm">
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Overlay  */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                    style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.7) 25%, transparent 50%)' }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-end p-4">
                    <h3 className="text-white group-hover:text-primary text-xl font-medium transform transition-all duration-500 group-hover:-translate-y-2">
                      {place.name}
                    </h3>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 transition-all duration-500 " />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Container */}
          <div
            ref={paginationRef}
            className="swiper-pagination !relative !bottom-0 !mt-3 flex justify-center gap-2"
          />
        </div>
      </div>
    </section>
  )
}

export default VisitPlaces

