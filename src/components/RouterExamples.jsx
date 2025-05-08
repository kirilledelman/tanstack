import { Link, useLocation, useRouterState } from "@tanstack/react-router"
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid/index.js"
import { useEffect } from "react";

// Route examples for routes page
export default function RouterExamples() {
	const loc = useLocation();

	// used to display an arrow next to current route
	function isMatch(r) { return (loc.pathname + loc.searchStr) === r.route }

	const routes = [
		{ route: '/router', title: 'Root', filename: 'router.jsx' },
		{ route: '/router/sub-route', title: 'Sub page', filename: 'router.sub-route.jsx' },
		{ route: '/router/sub-route?p=5&r=10', title: 'Search params', filename: 'router.sub-route.jsx' },
		{ route: '/router/post/680fd125ba16592f3252f8f8', title: 'Route with loader', filename: 'router.post.$postId.jsx' },
		{ route: '/router/missing-page', title: 'Missing page', filename: '<PageNotFound/>' },
		{ route: '/router/lazy-load', title: 'Lazy loaded route', filename:  'router.lazy-load.lazy.jsx' },
		{ route: '/router/wildcard/any/thing', title: 'Catch all', filename: 'router.wildcard.$.jsx' },
		{ route: '/throw-error', title: 'Throw error', filename: 'throw-error.jsx' },
	];

	// scroll to bottom on load
	const { status } = useRouterState();
	useEffect(() => {
		let timeout;
		if ( status === 'idle') {
			timeout = setTimeout(() => {
				window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
			}, 250);
		}
		return () => clearTimeout(timeout);
	},[status]);

	// output
	return (
		<ul className="-ml-2 sm:-ml-5">
		{routes.map(r => {
			const matched = isMatch(r);
			return <li key={r.route} className="flex flex-row items-center gap-2 mt-2 w-full">
				{ matched ? <ArrowRightCircleIcon className="min-w-4 w-4 mt-1 sm:mt-0"/> : <span className="min-w-4 w-4"/>}
				<Link to={r.route} className="overflow-hidden overflow-ellipsis max-w-1/2">{r.route}</Link>
				{ matched ?
					<div className="flex-1 text-right font-bold">{ r.filename }</div> :
					<div className="flex-1 text-right opacity-75">{ r.title }</div>}
			</li>
		})}
	</ul>)
}