import { StrictMode } from "react"
import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter, createHashHistory } from "@tanstack/react-router"
import AppContextProvider from "./components/AppContextProvider.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import PageError from "./components/PageError.jsx";
import { queryClient } from "./util/common.js";
import { routeTree } from "./routeTree.gen"
import "./index.css";

// create hash router
const router = createRouter({
	routeTree,
	history: createHashHistory(),
	scrollRestoration: true,
	defaultNotFoundComponent: PageNotFound,
	defaultErrorComponent: PageError,
})

// render the app
const rootElement = document.getElementById('root');
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
    <StrictMode>
		<AppContextProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}/>
			</QueryClientProvider>
		</AppContextProvider>
	</StrictMode>,)
}