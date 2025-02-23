/**
 * Common interfaces and types used throughout the application
 */

/**
 * Base entity interface with common fields
 */
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * User entity interface
 */
export interface User extends BaseEntity {
    email: string;
    name: string;
    age: string;
    role: UserRole;
}

/**
 * User roles for authorization
 */
export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

/**
 * API error response interface
 */
export interface ApiError {
    message: string;
    code: string;
    status: number;
}

/**
 * Pagination parameters interface
 */
export interface PaginationParams {
    page: number;
    limit: number;
}

/**
 * Generic paginated response interface
 */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}