import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../../api/query-client';

type User = {
    id: number;
    name: string;
    email: string;
    age: number | null;
};

type PaginatedResponse<T> = {
    data: T[];
    page: number;
    limit: number;
};

const fetchUsers = async (page: number, limit: number): Promise<PaginatedResponse<User>> => {
    const response = await axios.get('http://localhost:8080/api/users', {
        params: { page, limit },
    });

    console.log(response.data); // Inspect the response structure here
    return response.data;
};

const usersQueryOptions = (page: number, limit: number) => ({
    queryKey: ['users', page, limit],
    queryFn: () => fetchUsers(page, limit),
});

export const Route = createFileRoute('/users/')({
    loader: () => queryClient.ensureQueryData(usersQueryOptions(1, 10)),
    component: () => {
        const page = 1; // You can make this dynamic
        const limit = 10;
        const { data: paginatedData, isLoading, error } = useQuery(usersQueryOptions(page, limit));

        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        // Access the data property of PaginatedResponse
        const users = paginatedData?.data || [];

        console.log('paginatedData', paginatedData)
        console.log('users:', users)

        return (
            <div>
                <h1>Users</h1>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
                {/* Implement Pagination Controls */}
                <button disabled={page === 1}>Previous</button>
                <button>Next</button>
            </div>
        );
    },
});
