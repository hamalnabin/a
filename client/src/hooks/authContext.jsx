import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();

    useEffect(() => {
        const session = sessionStorage.getItem('authSession');
        if (session) {
            const { expiry } = JSON.parse(session);
            const now = new Date();

            // Check if the session is still valid
            if (now.getTime() > expiry) {
                sessionStorage.removeItem('authSession');
                setIsAuthenticated(false);
                navigate('/adminlogin');
            } else {
                setIsAuthenticated(true);
            }
        }

        setLoading(false); // Session check is done, remove loading state
    }, [navigate]);

    const login = () => {
        const now = new Date();
        const expiryTime = now.getTime() + 20 * 60 * 1000; // 20 minutes

        const sessionData = {
            expiry: expiryTime,
        };

        sessionStorage.setItem('authSession', JSON.stringify(sessionData));
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('authSession');
        setIsAuthenticated(false);
        navigate('/adminlogin');
    };

    if (loading) {
        return <div>Loading...</div>; // You can customize this loading component
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
