'use client'

import React, { useEffect, useState } from 'react'
import TopHeader from './TopHeader'
import BottomHeader from './BottomHeader'
import MobileMenu from './MobileMenu'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [blurIntensity, setBlurIntensity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      // Change header style when scrolled past 95-100vh
      if (scrollPosition >= viewportHeight * 0.95) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Calculate blur intensity based on scroll (0-100vh)
      const blurProgress = Math.min(scrollPosition / viewportHeight, 1)
      setBlurIntensity(blurProgress * 10) // 0 to 10px blur

      setLastScrollY(scrollPosition)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white shadow-sm'
          : 'bg-linear-to-b from-black/80 via-black/60 to-transparent'
        }`}
      style={{
        backdropFilter: isScrolled ? 'none' : `blur(${blurIntensity}px)`,
        WebkitBackdropFilter: isScrolled ? 'none' : `blur(${blurIntensity}px)`,
      }}
    >
      <div className={`transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'
        }`}>
        <TopHeader isScrolled={isScrolled} />
      </div>
      <BottomHeader isScrolled={isScrolled} />
      <MobileMenu isScrolled={isScrolled} />
    </header>
  )
}

export default Header

