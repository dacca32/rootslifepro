import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    context: {
        authentication: undefined!,
        queryClient
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => <div>Global app not found 404!</div>
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {

    const authentication = useAuth();

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ authentication, queryClient }} />
        </QueryClientProvider>
    )
}

export default App;