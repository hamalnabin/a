import React, { useState, useEffect } from 'react'
import ImageSlider from './ImageSlider'
import { a,b,d} from '../assets';
const images = [
  '/assets/1.jpg',
  '/assets/2.jpg',
  '/assets/4.jpeg'
]

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      id="home" 
      
    >
      
      <div className="relative z-10 w-full  px-4">
        <ImageSlider />
      </div>
    </section>
  )
}

export default Home
