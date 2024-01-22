import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
    const [url, setUrl] = useState(localStorage.getItem('url') || '');
    const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo') || null);
    
    useEffect(() => {
        setUrl("https://devvoitures5backend-production.up.railway.app/");
    }, []);
    
    const InitializeToken = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const DestructToken = () => {
        localStorage.removeItem('authToken');
        setAuthToken('');
    };

    const login = (token, userInfo) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setAuthToken(token);
        setUserInfo(userInfo);
    };
    
    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken('');
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    };

    const InitializeUserInfo = (userInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUserInfo(userInfo);
    };
    
    const DestructUserInfo = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, url, userInfo, InitializeUserInfo, DestructUserInfo, login, logout, InitializeToken, DestructToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
