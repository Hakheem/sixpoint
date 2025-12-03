'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, MapPin, Phone, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface MobileMenuProps {
  isScrolled: boolean
}

const MobileMenu = ({ isScrolled }: MobileMenuProps) => {
  const [open, setOpen] = useState(false)
  const [pagesOpen, setPagesOpen] = useState(false)
  const pathname = usePathname()

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

  const handleLinkClick = () => {
    setOpen(false)
    setPagesOpen(false)
  }

  return (
    <div className='lg:hidden flex items-center justify-between px-6 py-4'>
      {/* Logo */}
      <div className={`text-center font-semibold tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'
        }`}>
        <h1 className="text-sm">SIXPOINT</h1>
        <h2 className="text-lg">VICTORIA</h2>
      </div>

      {/* Mobile Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`h-10 w-10 rounded-md ${isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[75%] sm:w-[75%] max-w-sm p-0 border-l border-gray-200"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="text-center font-semibold tracking-tight text-gray-900">
                  <h1 className="text-base">SIXPOINT</h1>
                  <h2 className="text-xl">VICTORIA</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Contact Info - At the top */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href="tel:+254769403162"
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    +254 769 403162
                  </a>
                </div>

                {/* Location - Below phone number */}
                <div className="flex gap-3 items-center text-gray-600 p-3 bg-gray-50 rounded-lg">
                  <MapPin className='size-4 text-primary' />
                  <p className="text-sm font-medium">Kisumu, Kenya</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1 mb-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`py-3 px-4 rounded-lg text-base font-medium transition-all ${isActive(link.href)
                        ? 'text-primary bg-primary/5'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Pages Collapsible */}
                <Collapsible open={pagesOpen} onOpenChange={setPagesOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all">
                    Pages
                    <ChevronDown className={`w-4 h-4 transition-transform ${pagesOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col gap-1 mt-1 ml-2">
                    {pageLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`py-2.5 px-6 rounded-lg text-sm transition-all ${isActive(link.href)
                            ? 'text-primary font-medium bg-primary/5'
                            : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                          }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                <Link
                  href='/contact'
                  onClick={handleLinkClick}
                  className={`py-3 px-4 rounded-lg text-base font-medium transition-all ${isActive('/contact')
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Footer with Book Button */}
            <div className="p-6 border-t border-gray-100">
              <Button className="w-full font-semibold shadow-md h-12 text-base">
                Book Your Stay
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileMenu
