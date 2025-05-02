import { ExclamationTriangleIcon as OutlineIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon as SolidIcon } from '@heroicons/react/24/solid';

export default function PageNotFound({small=false, message="Page not found"}) {
	// in-page 404
	if (small) return (<div className="alert">
		<OutlineIcon className="w-8 h-8 min-w-8 inline"/> 404 - {message}
	</div>);

	// page sized
	return <section>
		<h1 className="flex flex-row gap-4 items-center"><SolidIcon className="w-16 h-16 min-w-16"/> 404</h1>
		<article>
			{message}
			<div className="mt-2 pt-2 border-t border-gray-500 text-sm">
				<a onClick={()=>history.back()}>Click here</a> to return to the previous page or press <strong>Back</strong> in your browser.
			</div>
		</article>
	</section>
}