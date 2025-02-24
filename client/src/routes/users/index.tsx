import { createFileRoute } from '@tanstack/react-router';
import { queryClient } from '../../api/query-client';
import UserService from '../../services/users/user-service';
import UsersList from '../../components/users/users-list';


export const usersQueryOptions = (page: number, limit: number) => ({
    queryKey: ['users', page, limit],
    queryFn: () => UserService.getAll({ page, limit }),
});

export const Route = createFileRoute('/users/')({
    loader: () => queryClient.ensureQueryData(usersQueryOptions(1, 10)),
    component: UsersList
});
