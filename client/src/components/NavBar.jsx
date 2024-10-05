import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { Logo } from "../assets";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate hook

  const menuItems = ['Home', 'About', 'Gallery', 'Notice', 'Contact',];

  const handleNavigation = (item) => {
    handleClick(); // Close mobile menu
    if (item === 'Notice') {
      navigate('/notice'); // Navigate to notices page
      return;
    }

    const lowercaseItem = item.toLowerCase();
    if (location.pathname === '/') {
      // On home page, scroll to section
      const section = document.getElementById(lowercaseItem);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash
      window.location.href = `/#${lowercaseItem}`;
    }
  };

  useEffect(() => {
    // Handle initial load with hash
    if (location.hash) {
      const id = location.hash.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const isActive = (item) => {
    const lowercaseItem = item.toLowerCase();
    return location.pathname === '/' && (location.hash === `#${lowercaseItem}` || (!location.hash && lowercaseItem === 'home'));
  };

  const content = (
    <motion.div 
      className="lg:hidden absolute top-full right-8 w-64 bg-white/80 backdrop-blur-md rounded-bl-2xl shadow-lg"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <ul className="text-center text-xl uppercase">
        {menuItems.map((item) => (
          <li 
            key={item} 
            onClick={() => handleNavigation(item)}
            className={`py-4 hover:bg-cyan-400 hover:text-white transition-colors duration-300 cursor-pointer ${isActive(item) ? 'bg-blue-500 text-white' : ''}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-7xl px-4 py-4">
        <div className="mx-auto px-6 py-3 flex items-center justify-between bg-blue-300 backdrop-blur-md rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <img src={Logo} className="h-12 w-12 object-contain font-sans" alt="Logo" />
            <span className="text-3xl text-black font-extrabold">श्री सिता मा.वि.</span>
          </div>
          <div className="hidden lg:flex items-center">
            <ul className="flex gap-6 text-black text-xl uppercase">
              {menuItems.map((item) => (
                <li 
                  key={item} 
                  onClick={() => handleNavigation(item)}
                  className={`transition-all duration-300 cursor-pointer px-3 py-1 rounded ${isActive(item) ? 'bg-blue-500 text-white' : ''}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:hidden">
            <button className="" onClick={handleClick}>
              {click ? <FaTimes size={24} /> : <CiMenuFries size={24} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {click && content}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;
