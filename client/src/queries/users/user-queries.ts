import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { User, PaginationParams, PaginatedResponse, ApiError } from '../../types';
import UserService from '../../services/users/user-service';
import { queryClient, queryKeys } from '../../api/query-client';

/**
 * Hook for fetching all users
 * @param params - Optional pagination parameters
 * @returns Query result with users data
 */
export const useUsers = (
    params?: PaginationParams
): UseQueryResult<PaginatedResponse<User>, ApiError> => {
    return useQuery({
        queryKey: [...queryKeys.users.all, params],
        queryFn: () => UserService.getAll(params),
        meta: {
            errorMessage: 'Failed to fetch users',
        },
    });
};

/**
 * Hook for fetching a single User
 * @param id - User ID
 * @returns Query result with User data
 */
export const useUser = (id: string): UseQueryResult<User, ApiError> => {
    return useQuery({
        queryKey: queryKeys.users.byId(id),
        queryFn: () => UserService.getById(id),
        meta: {
            errorMessage: 'Failed to fetch User details',
        },
    });
};

/**
 * Hook for creating a new User
 * @returns Mutation result for User creation
 */
export const useCreateUser = (): UseMutationResult<
    User,
    ApiError,
    Omit<User, 'id' | 'createdAt' | 'updatedAt'>
> => {
    return useMutation({
        mutationFn: (User) => UserService.create(User),
        meta: {
            successMessage: 'User created successfully',
            errorMessage: 'Failed to create User',
            invalidateQueries: queryKeys.users.all,
        },
        onSuccess: () => {
            // Invalidate users cache to refetch the updated list
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
    });
};

/**
 * Hook for updating an existing User
 * @returns Mutation result for User update
 */
export const useUpdateUser = (): UseMutationResult<
    User,
    ApiError,
    { id: string; data: Partial<User> }
> => {
    return useMutation({
        mutationFn: ({ id, data }) => UserService.update(id, data),
        meta: {
            successMessage: 'User updated successfully',
            errorMessage: 'Failed to update User',
        },
        onSuccess: (_, variables) => {
            // Invalidate specific User cache and users list
            queryClient.invalidateQueries({ queryKey: queryKeys.users.byId(variables.id) });
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
    });
};

/**
 * Hook for deleting a User
 * @returns Mutation result for User deletion
 */
export const useDeleteUser = (): UseMutationResult<void, ApiError, string> => {
    return useMutation({
        mutationFn: (id) => UserService.delete(id),
        meta: {
            successMessage: 'User deleted successfully',
            errorMessage: 'Failed to delete User',
        },
        onSuccess: () => {
            // Invalidate users cache to refetch the updated list
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
    });
};

