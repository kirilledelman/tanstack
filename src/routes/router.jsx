import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router"
import RouterExamples from "../components/RouterExamples.jsx"
import PageNotFound from "../components/PageNotFound.jsx"

export const Route = createFileRoute('/router')({
	component: RouteComponent,
	notFoundComponent: () => <PageNotFound small/>,
})

function RouteComponent() {
	const matchRoute = useMatchRoute();

	return (
		<section>
			<h1>TanStack Router</h1>
			<article>
				<p><strong>TanStack Router</strong> lets us use file or code-based routing.</p>
				<p>File and/or directory name determine how the path is matched. It provides convenient API for path and
					search params, loaders, authentication routes,
					built-in scroll restoration, and more. Honestly, I quite like it!</p>

				<h2>Some routes to try out</h2>

				<RouterExamples/>

				<div className={`outlet ${matchRoute({to: '/router'}) ? 'invisible' : ''}`}>
					<Outlet/>
				</div>
			</article>
		</section>)
}
