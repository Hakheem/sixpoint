'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="h-screen flex">
      {/* Left Side - Hotel Image with Gradient Overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        {/* Hotel Image - Replace with your actual hotel image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
          }}
        />
        
        <div className="absolute inset-0 bg-linear-to-tr from-black via-black/50 to-transparent" />
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="title text-4xl md:text-5xl font-semibold">{title}</h1>
            <p className="text-xl text-white/90">{subtitle}</p>
            <div className="flex items-center gap-2 text-amber-400">
              <Building2 className="w-6 h-6" />
              <span className="font-semibold">Sixpoint Victoria</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10"
        >
          <Sparkles className="w-8 h-8 text-amber-400" />
        </motion.div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 lg:w-1/2 bg-linear-to-br from-[#f5f7fa] via-[#c3cfe2] to-transparent relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-amber-300 rounded-full blur-3xl" />
        </div>

        {/* Main content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
              {children}
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-center text-gray-500 text-xs md:text-sm"
            >
              <p>🔒 Secure authentication • Your privacy is protected</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

