import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import LeftPanelMain from '../components/layout/left-panel-main';
import { AuthContextType, useAuth } from '../contexts/auth/auth-context';

type RouterContext = {
    authentication: AuthContextType
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent
});

function RootComponent() {

    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();

    return (
        <>

            {!isAuthenticated && (
                <div className="flex flex-wrap w-full min-h-screen">
                    <div className="w-full md:w-7/10 p-4">
                        IMAGE WHETHER LOGIN OR SIGNUP
                    </div>
                    <div className="w-full md:w-[30%] bg-gray-900 p-4">
                        <Outlet />
                    </div>
                </div>
            )}

            {isAuthenticated && (
                <>
                    <LeftPanelMain></LeftPanelMain>

                    <div>

                        <main className="lg:pl-72">
                            <div>
                                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                                    <div className="ml-auto">
                                        <button onClick={async () => {
                                            logout();
                                            navigate({ to: '/home' });
                                        }}>Logout
                                        </button>
                                    </div>
                                    <Outlet />
                                </div>
                            </div>
                        </main>
                        <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:d-none">
                            SECONDARY AREA
                        </aside>
                    </div>
                </>

            )}

            <ReactQueryDevtools buttonPosition="top-right" />
            <TanStackRouterDevtools position='bottom-right' />
        </>


    )
}
