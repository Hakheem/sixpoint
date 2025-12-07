'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
    id: number;
    image: string;
    size: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'square';
    speed: number;
    title?: string;
    description?: string;
}

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop',
        size: 'wide',
        speed: 0.5,
        title: 'Luxury Suite',
        description: 'Premium accommodation with panoramic views'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w-800&h=1200&fit=crop',
        size: 'tall',
        speed: 0.8,
        title: 'Executive Room',
        description: 'Spacious room with modern amenities'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w-800&h=800&fit=crop',
        size: 'square',
        speed: 0.3,
        title: 'Pool View',
        description: 'Relaxing view of our infinity pool'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w-1000&h=600&fit=crop',
        size: 'medium',
        speed: 0.6,
        title: 'Garden Terrace',
        description: 'Private terrace overlooking our gardens'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w-600&h=900&fit=crop',
        size: 'tall',
        speed: 0.4,
        title: 'Spa Area',
        description: 'Our luxurious spa and wellness center'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w-1200&h=700&fit=crop',
        size: 'wide',
        speed: 0.7,
        title: 'Restaurant',
        description: 'Fine dining with exceptional cuisine'
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w-700&h=700&fit=crop',
        size: 'square',
        speed: 0.5,
        title: 'Lobby',
        description: 'Grand entrance with elegant decor'
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w-600&h=400&fit=crop',
        size: 'small',
        speed: 0.9,
        title: 'Bar Lounge',
        description: 'Sophisticated cocktails and ambiance'
    },
    {
        id: 9,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w-800&h=1200&fit=crop',
        size: 'tall',
        speed: 0.35,
        title: 'Presidential Suite',
        description: 'Ultimate luxury and privacy'
    },
    {
        id: 10,
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w-1200&h=800&fit=crop',
        size: 'wide',
        speed: 0.65,
        title: 'Conference Room',
        description: 'State-of-the-art meeting facilities'
    },
    {
        id: 11,
        image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w-800&h=800&fit=crop',
        size: 'square',
        speed: 0.45,
        title: 'Gym Facility',
        description: 'Modern fitness equipment and trainers'
    },
    {
        id: 12,
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w-900&h=600&fit=crop',
        size: 'medium',
        speed: 0.55,
        title: 'Pool Deck',
        description: 'Sunny relaxation area by the pool'
    }
];

const GalleryParallaxPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item, index) => {
                if (item) {
                    const speed = galleryItems[index].speed;

                    gsap.to(item, {
                        y: () => -100 * speed,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        }
                    });

                    gsap.fromTo(item,
                        { scale: 0.9, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top bottom-=100',
                                end: 'top center',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'small':
                return 'col-span-1 md:col-span-1 row-span-1 h-[180px] md:h-[220px]';
            case 'medium':
                return 'col-span-2 md:col-span-2 row-span-1 h-[200px] md:h-[250px]';
            case 'large':
                return 'col-span-2 md:col-span-2 row-span-2 h-[300px] md:h-[400px]';
            case 'wide':
                return 'col-span-2 md:col-span-3 row-span-1 h-[180px] md:h-[280px]';
            case 'tall':
                return 'col-span-1 md:col-span-1 row-span-2 h-[320px] md:h-[450px]';
            case 'square':
                return 'col-span-2 md:col-span-2 row-span-2 h-[280px] md:h-[380px]';
            default:
                return 'col-span-1 row-span-1 h-[200px]';
        }
    };

    const handleImageClick = (item: GalleryItem) => {
        setSelectedImage(item);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        if (!selectedImage) return;

        const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % galleryItems.length;
        } else {
            newIndex = currentIndex - 1 < 0 ? galleryItems.length - 1 : currentIndex - 1;
        }

        setSelectedImage(galleryItems[newIndex]);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigateImage('prev');
                    break;
                case 'ArrowRight':
                    navigateImage('next');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, selectedImage]);

    return (
        <div ref={containerRef} className="min-h-screen bg-black">
            {/* Header Section */}
            <div className="relative h-[50vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-10" />
                <div className="relative z-20 text-center px-4 pt-8">
                    <h1 className="text-4xl md:text-7xl title font-semibold text-white mb-4 tracking-tight">
                        Gallery
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xl md:max-w-4xl mx-auto px-4">
                        Immerse yourself in our visual journey through luxury and elegance
                    </p>
                </div>
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Gallery Grid with Parallax */}
            <div className="relative padded py-12 md:py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 auto-rows-auto">
                    {galleryItems.map((item, index) => (
                        <div
                            key={item.id}
                            ref={el => { itemsRef.current[index] = el; }}
                            className={`${getSizeClasses(item.size)} relative overflow-hidden rounded-lg group cursor-pointer transition-all duration-300 hover:scale-[1.02] `}
                            style={{
                                marginTop: index % 2 === 0 ? '0' : '40px',
                            }}
                            onClick={() => handleImageClick(item)}
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.title || `Gallery item ${item.id}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6">
                                    <div className="flex items-center justify-between mb-1 md:mb-2">
                                        <h3 className="text-white text-sm md:text-xl font-bold truncate">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-300 text-xs md:text-sm line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Quick View Indicator */}
                            <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Maximize2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Modal  */}
            {isModalOpen && selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto">
                    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
                        <div className="relative w-full max-w-6xl my-8">
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute cursor-pointer -top-12 right-0 md:right-0 z-10 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors duration-300"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            {/* Navigation Buttons */}
                            <button
                                onClick={() => navigateImage('prev')}
                                className="absolute cursor-pointer left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors duration-300"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>

                            <button
                                onClick={() => navigateImage('next')}
                                className="absolute cursor-pointer right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors duration-300"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>

                            {/* Image Container */}
                            <div className="bg-black/30 rounded p-5">
                                {/* Image */}
                                <div className="relative w-full h-[65vh]  flex items-center justify-center mb-4">
                                    <img
                                        src={selectedImage.image}
                                        alt={selectedImage.title || `Gallery image ${selectedImage.id}`}
                                        className="max-w-full max-h-full object-contain rounded"
                                    />
                                </div>

                                {/* Image Info - Centered and cleaner */}
                                <div className="text-center px-4">
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                                        {selectedImage.title}
                                    </h2>
                                    <p className="text-gray-300 text-base md:text-lg mb-2">
                                        {selectedImage.description}
                                    </p>
                                </div>
                            </div>

                            {/* Simple Image Counter  */}
                            <div className=" text-center">
                                <div className="inline-flex items-center space-x-2 bg-black/30 rounded-full px-4 py-2">
                                    {galleryItems.map((item, index) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedImage(item)}
                                            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${selectedImage.id === item.id
                                                    ? 'bg-white scale-125'
                                                    : 'bg-gray-600 hover:bg-gray-400'
                                                }`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default GalleryParallaxPage;

