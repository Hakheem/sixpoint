'use client'

import Link from 'next/link'
import { Phone, ChevronDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'

interface BottomHeaderProps {
  isScrolled: boolean
}

const BottomHeader = ({ isScrolled }: BottomHeaderProps) => {
  const pathname = usePathname()
  const [showBookButton, setShowBookButton] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNearTop, setIsNearTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const viewportHeight = window.innerHeight

      // Check if we're in the top 0-100vh area
      const isAtTopArea = currentScrollY <= viewportHeight

      // Only hide button when scrolling up AND in top area
      if (isAtTopArea) {
        if (currentScrollY < lastScrollY) {
          // Scrolling up in top area - hide button
          setShowBookButton(false)
        } else if (currentScrollY > lastScrollY && currentScrollY > 500) {
          // Scrolling down past 100px - show button
          setShowBookButton(true)
        }
      } else {
        // Below 100vh - always show button when scrolled
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setShowBookButton(true)
        }
      }

      setIsNearTop(isAtTopArea)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/about', label: 'About' },
  ]

  const pageLinks = [
    { href: '/gallery', label: 'Gallery' },
    { href: '/blogs', label: 'Blogs' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className={`hidden lg:block transition-all duration-300 ${isScrolled
        ? 'border-t border-black/40 py-4'
        : 'border-t border-white/40 py-3'
      }`}>
      <div className='grid grid-cols-3 padded items-center'>
        {/*  Phone Number  */}
        <div className="flex justify-start">
          <ul className={`flex flex-col gap-2 text-sm transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <a
                href="tel:+254769403162"
                className={`hover:text-primary transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
              >
                +254 769 403162
              </a>
            </li>
          </ul>
        </div>

        {/*  Navigation */}
        <nav className="text-center font-medium">
          <ul className='flex items-center justify-center gap-8'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors ${isActive(link.href)
                      ? 'text-accent'
                      : isScrolled
                        ? 'text-gray-700 hover:text-primary'
                        : 'text-white hover:text-primary'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex items-center gap-1 transition-colors outline-none focus:outline-none ${pathname === '/gallery' || pathname === '/blogs'
                      ? 'text-accent'
                      : isScrolled
                        ? 'text-gray-700 hover:text-accent'
                        : 'text-white hover:text-primary'
                    }`}
                >
                  Pages
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-40 mt-2 border border-gray-200 shadow-lg rounded-md"
                  style={{ position: 'fixed' }}
                >
                  {pageLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild className="focus:bg-gray-50">
                      <Link
                        href={link.href}
                        className={`w-full cursor-pointer px-3 py-2 text-sm ${isActive(link.href) ? 'text-accent font-medium' : 'text-gray-700'
                          }`}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>

            <li>
              <Link
                href='/contact'
                className={`transition-colors ${isActive('/contact')
                    ? 'text-primary'
                    : isScrolled
                      ? 'text-gray-700 hover:text-accent'
                      : 'text-white hover:text-primary'
                  }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Book Now Button  */}
        <div className="flex justify-end">
          <div className={`transition-all duration-500 ${showBookButton
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0 pointer-events-none'
            }`}>
            <Button className="font-semibold shadow-md">
             Find My Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomHeader

