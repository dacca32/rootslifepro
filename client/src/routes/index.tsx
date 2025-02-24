import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    beforeLoad: ({ context }) => {
        const { authInfo } = context.authentication;
        console.log(authInfo)
        if (!authInfo.isAuthenticated) {
            throw redirect({
                to: '/login'
            })
        }
    },
    component: Home
});

function Home() {
    return (
        <div>
            <h3>Welcome to the Rootslife home page. You have succesfully logged in</h3>
        </div>
    )
}