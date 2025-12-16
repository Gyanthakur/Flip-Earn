import React from 'react'
import Hero from '../components/Hero'
import LatestListing from '../components/LatestListing'
import Plans from '../components/Plans'
import CTA from '../components/CTA'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestListing/>
      <Plans/>
      <CTA/>
    </div>
  )
}

export default Home
