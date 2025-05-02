import { Link, useLocation } from '@tanstack/react-router'
import { ArrowRightIcon } from "@heroicons/react/24/solid/index.js";

/*
examples of routes:
https://tanstack.com/router/latest

explanations:
https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts

 */

export default function RouterExamples() {
	const loc = useLocation();
	function isMatch(r) {
		return (loc.pathname + loc.searchStr) === r.route;
	}
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
	return <ul className="-ml-2 sm:-ml-5">
		{routes.map(r => (
			<li key={r.route} className="flex flex-row items-start sm:items-center gap-2 mt-2">
				{ isMatch(r) ? <ArrowRightIcon className="max-w-4 mt-1 sm:mt-0"/> : <span className="min-w-4"/> }
				<Link to={r.route} className="overflow-hidden overflow-ellipsis">{r.route}</Link>
				<div className="flex flex-col flex-1 items-end sm:flex-row gap-2">
					<span className="flex-1 text-sm text-nowrap">{r.title}</span>
					<em className="text-gray-500 dark:text-gray-400 text-sm text-nowrap">{r.filename}</em>
				</div>
			</li>
		))}
	</ul>
}