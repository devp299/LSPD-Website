// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);

    const loginUser = (userData) => {
        setUser(userData);
        setAdmin(userData.role === 'admin');
    };

    const logoutUser = () => {
        setUser(null);
        setAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, admin, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
