import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Navigate, Outlet, useNavigate } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AuthContext, useAuth } from '../hooks/useAuth';
import AuthService from '../services/users/auth-service';

type RouterContext = {
    authentication: AuthContext
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent
});

function RootComponent() {
    const navigate = useNavigate();
    return (
        <>
            <ul>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <button onClick={async () => {
                        await AuthService.logoutUser();
                        navigate({ to: '/login' });
                    }}>Logout</button>
                </li>
            </ul>
            <Outlet />
            <ReactQueryDevtools buttonPosition="top-right" />
            <TanStackRouterDevtools position='bottom-right' />
        </>
    )
}