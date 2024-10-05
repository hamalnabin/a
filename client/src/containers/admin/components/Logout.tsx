import React from 'react';

import { FiLogOut } from 'react-icons/fi'; // Import the logout icon from react-icons
import { useAuth } from '../../../hooks/authContext';

const LogoutButton = () => {
    const { logout } = useAuth(); // Get the logout function from context

    return (
        <button
            onClick={logout}
            className="flex items-center p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
            <FiLogOut className="mr-2" size={20} /> {/* Add the logout icon here */}
            Logout
        </button>
    );
};

export default LogoutButton;
