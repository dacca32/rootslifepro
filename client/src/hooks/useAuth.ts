import { useState, useEffect } from 'react';
import { User, UserLogin, UserRole } from '../types';
import AuthService from '../services/users/auth-service';

type AuthInfo = {
    isAuthenticated: boolean,
    role: UserRole | null
}

export const useAuth = () => {
    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        isAuthenticated: false,
        role: null
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem("userInfo['role']") as UserRole | null;

        if (token && role) {
            setAuthInfo({
                isAuthenticated: true,
                role: role,
            });
        } else {
            setAuthInfo({
                isAuthenticated: false,
                role: null,
            });
        }
    }, []);

    const userInfo = (): Omit<User, 'id'> | null => {
        const userInfoString = localStorage.getItem('userInfo');
        if (!userInfoString) {
            return null;
        }
        try {
            const userObject: Omit<User, 'id'> = JSON.parse(userInfoString);
            return userObject;
        } catch (error) {
            console.error("Failed to parse user info:", error);
            return null;
        }
    }


    const login = async (user: UserLogin) => {
        await AuthService.loginUser(user)
    }

    const logout = async () => {
        await AuthService.logoutUser()
    }

    return { authInfo, login, logout, userInfo };
};

export type AuthContext = ReturnType<typeof useAuth>
