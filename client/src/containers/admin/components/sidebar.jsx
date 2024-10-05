import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 mt-24 h-full bg-gray-800 text-white flex flex-col">
          
            <ul className="flex flex-col p-4 space-y-2">
                <li>
                    <Link to="/create-notice" className="hover:bg-gray-700 p-2 rounded">
                        Create Notice
                    </Link>
                </li>
                <li>
                    <Link to="/messages" className="hover:bg-gray-700 p-2 rounded">
                        Messages
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
