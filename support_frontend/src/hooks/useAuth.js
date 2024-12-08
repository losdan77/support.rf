import React, { createContext, useContext, useState } from "react";

// Создаем контекст
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [profileId, setProfileId] = useState(''); //

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, profileId, setProfileId }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста
export const useAuth = () => {
    return useContext(AuthContext);
};