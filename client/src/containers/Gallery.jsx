import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { L1, L2 } from "../assets";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const imagesPerPage = 12;

  useEffect(() => {
    const loadImages = async () => {
      const imageModules = import.meta.glob('../assets/images/*.(png|jpeg|svg|jpg|JPG)');
      const imagePromises = Object.values(imageModules).map(importImage => importImage());
      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages.map(module => module.default));
    };

    loadImages();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openFullscreen = (image) => setFullscreenImage(image);
  const closeFullscreen = () => setFullscreenImage(null);

  return (
    <section id="gallery" className=" px-4 py-8 mt-24">
      {/* Title with animation */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 25 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center space-x-2"
        style={{ maxWidth: '90%' }}
      >
        <img src={L1} className="w-6 h-auto object-contain" alt="" />
        <p className="text-black  font-bold uppercase text-xl font-serif tracking-widest" style={{ whiteSpace: 'nowrap' }}>Image Gallery</p>
        <img src={L2} className="w-6 h-auto object-contain" alt="" />
      </motion.div>
      
      {/* Bento Grid with hover effect */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {currentImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg cursor-pointer"
            whileHover={{ scale: 1.05 }} // Animation on hover
            onClick={() => openFullscreen(image)} // Open fullscreen on click
            layout
          >
            <motion.img
              src={image}
              alt={`Image ${indexOfFirstImage + index + 1}`}
              className="w-full h-full xs:w-[500px] object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(images.length / imagesPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Fullscreen Image with close button */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-5 right-5 bg-gray-600 text-5xl text-white rounded-full px-4 py-2"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Fullscreen Image */}
            <motion.img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
