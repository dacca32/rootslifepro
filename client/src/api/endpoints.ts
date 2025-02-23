/**
 * API endpoint configurations
 * Centralized endpoint management for the application
 */

/**
 * User-related endpoints
 */
export const UserEndpoints = {
    /** Get all users with optional filtering */
    getAll: (params?: string) => `/users${params ? `?${params}` : ''}`,

    /** Get a single user by ID */
    getById: (id: string) => `/users/${id}`,

    /** Create a new user */
    create: () => '/users',

    /** Update an existing user */
    update: (id: string) => `/users/${id}`,

    /** Delete a user */
    delete: (id: string) => `/users/${id}`,

    /** Get user profile */
    profile: () => '/users/profile',
} as const;

/**
 * Authentication-related endpoints
 */
export const AuthEndpoints = {
    /** Login endpoint */
    login: () => '/auth/login',

    /** Register endpoint */
    register: () => '/auth/register',

    /** Refresh token endpoint */
    refresh: () => '/auth/refresh',

    /** Logout endpoint */
    logout: () => '/auth/logout',
} as const;