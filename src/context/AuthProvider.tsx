import { jwtDecode } from 'jwt-decode';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const AuthProvider: FC<{ children: ReactNode; }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
      };

    useEffect(() => {
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout();
                }
            } catch (error) {
                console.error('Token decoding error:', error);
                logout();
            }
        }
    }, [token, navigate]);

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
