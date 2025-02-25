import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Navigate, Outlet, useNavigate } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AuthContext } from '../hooks/useAuth';
import LeftPanelMain from '../components/layout/left-panel-main';

type RouterContext = {
    authentication: AuthContext
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent
});

function RootComponent() {

    return (
        <>
            <div>

                <LeftPanelMain></LeftPanelMain>

                <main className="lg:pl-72">
                    <div>
                        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6"><Outlet /></div>
                    </div>
                </main>
                <aside className="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:d-none">
                    {/* Secondary column (hidden on smaller screens) */}SECONDARY AREA
                </aside>
            </div>

            <ReactQueryDevtools buttonPosition="top-right" />
            <TanStackRouterDevtools position='bottom-right' />
        </>


    )
}
