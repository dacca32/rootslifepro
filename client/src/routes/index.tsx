import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Home
});

function Home() {
    return (
        <div>
            <h3>Welcome to the Rootslife home page</h3>
        </div>
    )
}