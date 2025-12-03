'use client'

import { MapPin } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

interface TopHeaderProps {
  isScrolled: boolean
}

const TopHeader = ({ isScrolled }: TopHeaderProps) => {
  return (
    <nav className='hidden lg:grid grid-cols-3 padded py-2 items-center'>
      <div className={`justify-start font-medium flex gap-2 items-center transition-colors ${isScrolled ? 'text-gray-700' : 'text-gray-200'
        }`}>
        <MapPin className='size-4 shrink-0' />
        <p className="text-sm">Kisumu, Kenya</p>
      </div>

      <div className={`text-center logo-text font-semibold tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'
        }`}>
        <h1 className="text-base">
          SIXPOINT
        </h1>
        <h2 className="text-2xl">
          VICTORIA
        </h2>
      </div>

      <div className="flex justify-end">
        <Button className="font-semibold shadow-md">
          Book Your Stay
        </Button>
      </div>
    </nav>
  )
}

export default TopHeader
