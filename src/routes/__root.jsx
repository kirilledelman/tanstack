import { createRootRoute, Outlet } from "@tanstack/react-router"
import Header from "../components/Header.jsx"

export const Route = createRootRoute({
    component: () => (
        <main>
            <Header/>
            <Outlet />
        </main>
    ),
})