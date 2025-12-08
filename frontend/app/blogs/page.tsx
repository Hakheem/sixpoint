'use client'

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Discover the Serene Beauty of Riat Hills: Your Gateway to Tranquility",
    excerpt: "Nestled at the foot of the majestic Riat Hills, SixPoint Victoria Hotel offers more than just accommodation—it's an experience. Explore why our unique location makes us the perfect retreat for travelers seeking peace and natural beauty.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
    date: "December 5, 2024",
    readTime: "5 min read",
    category: "Location"
  },
  {
    id: 2,
    title: "Maya Restaurant: A Culinary Journey Through Kenya's Flavors",
    excerpt: "At SixPoint Victoria's residential Maya Restaurant, we believe dining is an art form. From traditional Kenyan dishes to international cuisine, discover how our chefs create unforgettable culinary experiences that keep guests coming back.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
    date: "November 28, 2024",
    readTime: "4 min read",
    category: "Dining"
  },
  {
    id: 3,
    title: "Why SixPoint Victoria is the Perfect Choice for Airport Travelers",
    excerpt: "Just 3.4km from Kisumu International Airport, we're the closest tourist-class accommodation to the airport. Learn why business travelers and tourists alike choose SixPoint Victoria for convenience, comfort, and exceptional service.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&h=800&fit=crop",
    date: "November 20, 2024",
    readTime: "6 min read",
    category: "Travel Tips"
  }
];

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.id}`}>
        <div className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl title mb-3 group-hover:text-yellow-600 transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-700 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-yellow-600 font-semibold group-hover:gap-4 transition-all">
              <span>Read More</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogMainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-gray-900 to-gray-700 text-white py-20 mt-16">
        <div className="padded mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl title mb-4"
          >
            Our Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Stories, tips, and insights from SixPoint Victoria Hotel—your luxury retreat in Kisumu
          </motion.p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="padded mx-auto py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-50 py-16 mb-16">
        <div className="padded mx-auto text-center">
          <h2 className="text-3xl title mb-4">Ready to Experience SixPoint Victoria?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Book your stay at Kisumu's premier luxury hotel, conveniently located near the airport with world-class amenities.
          </p>
          <Link href="/rooms">
            <button className="bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
              Explore Our Rooms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogMainPage;

