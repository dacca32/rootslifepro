import axiosClient from '../../api/axios-client';
import { AuthEndpoints } from '../../api/endpoints';
import { User, UserLogin } from '../../types';

/**
 * Service class for handling User-related API calls
 */
export default class AuthService {

    /**
     * Login function
     * @returns Promise with an access token
     */
    static async loginUser(User: UserLogin): Promise<User> {
        const response = await axiosClient.post(AuthEndpoints.login(), User);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'User')
        return response.data;
    }

    /**
     * Logout function
     * @returns void {removes token from local storage}
     */

    static async logoutUser(): Promise<void> {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        const response = await axiosClient.post(AuthEndpoints.logout());
        return response.data;
    }

}