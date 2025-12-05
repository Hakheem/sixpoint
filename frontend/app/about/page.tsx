import React from 'react'
import AboutAmenities from './_components/AboutAmenities';
import OurJourney from './_components/OurJourney';
import AboutHeader from './_components/AboutHeader';
import AboutServices from './_components/AboutServices';

const AboutPage = () => {
  return (
    <div>
  <AboutHeader />
<OurJourney />
  <AboutServices />
  <AboutAmenities />
      </div>
  )
}

export default AboutPage