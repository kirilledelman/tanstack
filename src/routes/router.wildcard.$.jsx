import { createFileRoute, useLocation } from "@tanstack/react-router"

export const Route = createFileRoute('/router/wildcard/$')({
	component: RouteComponent,
})

function RouteComponent() {
	// get actual location
	const loc = useLocation();

	// display page
	return (<>
		<p>This route would capture anything after <em>route/wildcard/</em>.</p>
		<p>The full URL is <strong>{loc.pathname}</strong></p>
	</>)
}
