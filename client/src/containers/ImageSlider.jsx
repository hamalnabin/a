import React, { useState } from 'react';
import { HeroTypeWritter } from '../components';
import { Video, a, f } from '../assets'; 

const Carousel = () => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  return (
    <div>
      <div className="container mt-12 xs:-mt-12 mx-auto px-4 py-4 lg:py-8">
        <div className="flex flex-col xs:mt-12 lg:flex-row items-center justify-between">
          {/* Typewriter Section */}
          <div className="w-full lg:w-[600px] text-center mb-8 lg:mb-0 lg:pr-8">
            <h2 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-white h-24 sm:h-32 flex items-center justify-center">
              <HeroTypeWritter
                speed={100}
                words={[
                  'गुणस्तरीय र सुरक्षित शिक्षण संस्था, आजको आवश्यकता',
                ]}
              />
            </h2>
          </div>

          {/* Video Player Section */}
          <div className="w-[600px] xs:w-[350px] sm:w-[550px] relative">
            <div className="aspect-w-16 aspect-h-9">
              {!playing ? (
                <>
                  <img
                    src={a}
                    alt="Thumbnail"
                    className="w-full  h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                    onClick={handlePlay}
                  >
                    <span className="text-sm sm:text-base">Play</span>
                  </button>
                </>
              ) : (
                <video
                  controls
                  autoPlay
                  loop
                  muted
                  src={Video}
                  className="w-full h-full object-cover rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="mt-8 text-center lg:text-left">
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <a href="gallery" className="text-black font-semibold text-sm sm:text-base">
              Browse Gallery
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
