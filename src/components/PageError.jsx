import { ExclamationCircleIcon as SolidIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon as OutlineIcon } from '@heroicons/react/24/outline';

export default function PageError({error, small=false}) {
	// in-page error
	if (small) return (<div className="alert">
		<OutlineIcon className="w-8 h-8 min-w-8 inline"/> { error?.message || "An error occured" }
	</div>);

	// page sized
	return <section>
		<h1 className="flex flex-row gap-4 items-center"><SolidIcon className="w-16 max-w-16"/> Error</h1>
		<article className="text-lg">
			{ error?.message || "An error occured." }
			<div className="mt-2 pt-2 border-t border-gray-500 text-sm">
				<a onClick={()=>history.back()}>Click here</a> to return to the previous page or press <strong>Back</strong> in your browser.
			</div>
		</article>
	</section>
}