'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    console.log('Subscribing:', email);
    setEmail('');
  };

  const galleryImages = [
    '/swim_side.png',
    '/night_time.png',
    '/buffet.png',
    '/swim_side.png',
    '/night_time.png',
    '/buffet.png',
  ];

  const usefulLinks = [
    { name: 'About Hotel', href: '/about' },
    { name: 'Rooms & Suites', href: '/rooms' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'News & Blogs', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Phone, href: 'tel:+254769403162', label: 'Phone' },
  ];

  return (
    <footer className="bg-accent text-gray-300 relative">
      {/* Main Footer Content with accent background */}
      <div className="px-4 md:px-8 lg:px-16 pb-0">
        {/* This creates the accent bg area with space for the absolute contact card */}
        <div className="h-32"></div>
      </div>

      {/* Dark section with grids */}
      <div className="bg-[#333] relative">
        <div className="px-4 md:px-8 lg:px-16 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-8 gap-12 relative">
            {/* Contact Info Section - Absolute position */}
            <div
              className="bg-[#1f1f1f] p-8 absolute md:left-4 md:-top-28.5
                         left-0 top-0 w-full 
                         md:w-fit-content lg:w-[calc(25%)]"
            >
              <div className='mb-6'>
                <h3 className="text-3xl text-gray-300 mb-2 font-serif">SIXPOINT</h3>
                <h2 className="text-4xl text-gray-300 mb-8 font-serif">VICTORIA</h2>
              </div>

              <div>
                <h4 className="text-lg font-serif font-semibold text-white mb-2 tracking-wide">
                  CONTACT INFO
                </h4>
                <div className="h-1 w-12 bg-[#FFD700] mb-6"></div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#FFD700] mt-1 shrink-0" />
                    <a
                      href="tel:+254769403162"
                      className="hover:text-[#FFD700] transition-colors"
                    >
                      +254 769 403162
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#FFD700] mt-1 shrink-0" />
                    <a
                      href="mailto:hakheem67@gmail.com"
                      className="hover:text-[#FFD700] transition-colors"
                    >
                      hakheem67@gmail.com
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FFD700] mt-1 shrink-0" />
                    <span>123 Street, East Africa</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 mt-8">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Empty first grid column to maintain layout  */}
            <div className="mt-8 invisible md:visible lg:invisible">
              {/* This maintains the grid structure but pushed right */}
            </div>

            {/* Useful Links  */}
            <div className="mt-8 lg:ml-[15%] md:mx-auto">
              <h4 className="text-lg font-serif font-semibold text-white mb-2 tracking-wide">
                USEFUL LINKS
              </h4>
              <div className="h-1 w-12 bg-[#FFD700] mb-6"></div>

              <ul className="space-y-3">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="hover:text-[#FFD700] transition-colors hover:pl-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery  */}
            <div className="mt-8">
              <h4 className="text-lg font-serif font-semibold text-white mb-2 tracking-wide">
                GALLERY
              </h4>
              <div className="h-1 w-12 bg-[#FFD700] mb-6"></div>

              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-700 rounded overflow-hidden group cursor-pointer"
                  >
                    <div
                      className="w-full h-full bg-linear-to-br from-gray-600 to-gray-800 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter - MOVED TO THE RIGHT */}
            <div className="mt-8 lg:ml-[5%]">
              <h4 className="text-lg font-serif font-semibold text-white mb-2 tracking-wide">
                NEWSLETTER
              </h4>
              <div className="h-1 w-12 bg-[#FFD700] mb-6"></div>

              <p className="text-gray-400 mb-3">Subscribe to our newsletter.</p>

              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded text-gray-300 placeholder-gray-400 focus:outline-none focus:border-[#FFD700] transition-colors"
                />
                <Button
                  onClick={handleSubscribe}
                  className="w-full py-3 rounded font-semibold transition-colors"
                >
                  Sign me up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-[#101010]">
        <div className="px-[6%] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025, Sixpoint Victoria. All Rights Reserved.</p>
            <p>
              Designed, developed and maintained by{' '}
              <a
                href="https://hector-john.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD700] hover:text-[#C8A903] transition-colors"
              >
                Hakheem
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

