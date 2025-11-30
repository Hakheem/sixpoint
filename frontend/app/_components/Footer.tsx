'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Handle newsletter subscription
    console.log('Subscribing:', email);
    setEmail('');
  };

  const galleryImages = [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/gallery-5.jpg',
    '/images/gallery-6.jpg',
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
    <footer className="bg-[#2A2A2A] text-gray-300">
      {/* Main Footer Content */}
      <div className="padded py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="title text-3xl text-gray-400 mb-2">SIXPOINT</h3>
              <h2 className="title text-4xl text-gray-300 mb-8">VICTORIA</h2>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">
                CONTACT INFO
              </h4>
              <div className="h-1 w-12 bg-[#FFD700] mb-6"></div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                  <a
                    href="tel:+254769403162"
                    className="hover:text-[#FFD700] transition-colors"
                  >
                    +254 769 403162
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
                  <a
                    href="mailto:hakheem67@gmail.com"
                    className="hover:text-[#FFD700] transition-colors"
                  >
                    hakheem67@gmail.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FFD700] mt-1 flex-shrink-0" />
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
          </motion.div>

          {/* Useful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">
              USEFUL LINKS
            </h4>
            <div className="h-1 w-12 bg-[#FFD700] mb-6"></div>

            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-[#FFD700] transition-colors hover:pl-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">
              GALLERY
            </h4>
            <div className="h-1 w-12 bg-[#FFD700] mb-6"></div>

            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-700 rounded overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 group-hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">
              NEWSLETTER
            </h4>
            <div className="h-1 w-12 bg-[#FFD700] mb-6"></div>

            <p className="text-gray-400 mb-6">Subscribe to our newsletter.</p>

            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#FFD700] transition-colors"
              />
              <button
                onClick={handleSubscribe}
                className="w-full bg-[#FFD700] text-[#2A2A2A] py-3 rounded font-semibold hover:bg-[#C8A903] transition-colors"
              >
                SUBSCRIBE NOW
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="padded py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025, Sixpoint Victoria. All Rights Reserved.</p>
            <p>
              Designed, developed and maintained by{' '}
              <a
                href="#"
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

