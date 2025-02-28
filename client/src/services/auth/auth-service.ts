import axiosClient from '../../api/axios-client';
import { AuthEndpoints } from '../../api/endpoints';
import { RegisterFormInputs } from '../../components/auth/register';
import { User, UserLogin } from '../../types';

/**
 * Service class for handling User-related API calls
 */
export default class AuthService {

    /**
  * Register function
  * @returns Promise
  */
    static async registerUser(User: RegisterFormInputs): Promise<{ firstName: string, lastName: string, email: string, password: string }> {
        const response = await axiosClient.post(AuthEndpoints.register(), User);
        return response.data;
    }

    /**
     * Login function
     * @returns Promise
     */
    static async loginUser(User: UserLogin): Promise<{ token: string, user: User }> {

        const response = await axiosClient.post(AuthEndpoints.login(), User);
        return response.data;
    }

    /**
     * Logout function
     * @returns void
     */

    static async logoutUser(): Promise<void> {
        const response = await axiosClient.post(AuthEndpoints.logout());
        return response.data;
    }

}