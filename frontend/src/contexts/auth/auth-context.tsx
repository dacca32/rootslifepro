import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../../types';

export interface AuthContextType {
    isAuthenticated: boolean;
    loggedInUser: User | undefined,
    login: ({ token, user }: { token: string, user: User }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<User>()

    const login = (sessionData: { token: string, user: User }) => {
        localStorage.setItem('token', sessionData.token);
        localStorage.setItem('user', JSON.stringify(sessionData.user));
        setLoggedInUser(sessionData.user)
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
