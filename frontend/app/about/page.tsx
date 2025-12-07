import React from 'react'
import AboutAmenities from './_components/AboutAmenities';
import OurJourney from './_components/OurJourney';
import AboutHeader from './_components/AboutHeader';
import AboutServices from './_components/AboutServices';
import AboutAbout from './_components/AboutTexts';
import AboutNumbers from './_components/AboutNumbers';

const AboutPage = () => {
  return (
    <div>
  <AboutHeader />
  <AboutAbout/>
<OurJourney />
  <AboutServices />
  <AboutNumbers/>
  <AboutAmenities />
      </div>
  )
}

export default AboutPage