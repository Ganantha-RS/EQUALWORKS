import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/About'
import AccessibilitySection from '../components/Accessibility'
import SmartJobMatching from '../components/SmartJob'
import RealImpact from '../components/RealImpact'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div className=''>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AccessibilitySection />
      <SmartJobMatching />
      <RealImpact />
      <Footer />
    </div>
  )
}

export default LandingPage
