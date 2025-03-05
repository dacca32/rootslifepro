import axiosClient from '../../api/axios-client';
import { UserEndpoints } from '../../api/endpoints';
import { User, PaginationParams, PaginatedResponse } from '../../types';

/**
 * Service class for handling User-related API calls
 */
export default class UserService {

    /**
     * Fetch all Users with optional pagination and filtering
     * @param params - Pagination parameters
     * @returns Promise with paginated User data
     */
    static async getAll(params?: PaginationParams): Promise<PaginatedResponse<User>> {
        const queryParams = params
            ? new URLSearchParams({
                page: params.page.toString(),
                limit: params.limit.toString(),
            }).toString()
            : '';

        const response = await axiosClient.get(UserEndpoints.getAll(queryParams));
        return response.data;
    }

    /**
     * Fetch a single User by ID
     * @param id - User ID
     * @returns Promise with User data
     */
    static async getById(id: string): Promise<User> {
        const response = await axiosClient.get(UserEndpoints.getById(id));
        return response.data;
    }

    /**
     * Create a new User
     * @param User - User data
     * @returns Promise with created User
     */
    static async create(User: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const response = await axiosClient.post(UserEndpoints.create(), User);
        return response.data;
    }

    /**
     * Update an existing User
     * @param id - User ID
     * @param User - Updated User data
     * @returns Promise with updated User
     */
    static async update(id: string, User: Partial<User>): Promise<User> {
        const response = await axiosClient.put(UserEndpoints.update(id), User);
        return response.data;
    }

    /**
     * Delete a User
     * @param id - User ID
     * @returns Promise with deletion status
     */
    static async delete(id: string): Promise<void> {
        await axiosClient.delete(UserEndpoints.delete(id));
    }


}