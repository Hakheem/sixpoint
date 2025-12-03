import React from 'react'
import HeroSection from './_components/HeroSection'
import AboutSection from './_components/AboutSection'
import RoomsSnippet from './_components/RoomsSnippet'
import Services from './_components/Services'
import Testimonial from './_components/Testimonial'
import Amenities from './_components/Amenities'
import VisitPlaces from './_components/VisitPlaces'

const MainPage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <RoomsSnippet />
      <Services />
      <Testimonial />
      <Amenities />
      <VisitPlaces />

    </div>
  )
}

export default MainPage