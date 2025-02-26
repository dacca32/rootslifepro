import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import LeftPanelMain from '../components/layout/left-panel-main';
import { AuthContextType, useAuth } from '../contexts/auth/auth-context';
import HeaderComponent from '../components/layout/header';

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
                        @todo image
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

                        <main className="lg:pl-72 h-screen">
                            <div>
                                <div>
                                    <HeaderComponent></HeaderComponent>
                                    <div className='p-12'>
                                        <Outlet />
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>
                </>

            )}

            <ReactQueryDevtools buttonPosition="top-right" />
            <TanStackRouterDevtools position='bottom-right' />
        </>


    )
}
