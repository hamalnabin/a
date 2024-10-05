import React from 'react';

const Footer = () => {
    const menuItems = ['Home', 'About', 'Gallery', 'Notice', 'Contact', 'Login'];

    return (
        <footer className="w-full mt-12 bg-blue-500 text-white text-center py-4">
            <div className="flex flex-col items-center gap-2 mb-4">
                <p className='font-bold text-black uppercase'>Contact Us:</p>
                <p className='text-black font-semibold'>Email: <span className='text-white'>sitamavi@gmail.com</span></p>
                <p className='text-black font-semibold'>Phone: <span className='text-white'>984832589</span></p>
                <p className='text-black font-semibold'>Address: <span className='text-white'>Chhipra,Kharpunath-04,Humla</span></p>
              
            </div>
            <div className="mb-4">
              
                <ul className="flex justify-center space-x-4">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a href={`#${item.toLowerCase()}`} className="hover:underline">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} Sita Mavi. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
