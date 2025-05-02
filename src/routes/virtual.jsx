import { createFileRoute } from '@tanstack/react-router'
import { Field, Label, Switch } from "@headlessui/react";
import { Fragment, Profiler, useState } from "react";
import { InfiniteLoad, InfiniteLoadVirtual } from "../components/InfiniteLoad.jsx";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { ClockIcon } from "@heroicons/react/24/outline/index.js";
export const Route = createFileRoute('/virtual')({
	component: RouteComponent,
})

// https://tanstack.com/virtual/latest/docs/framework/react/examples/infinite-scroll

function RouteComponent() {
	const [useVirtual, setUseVirtual] = useState(true);
	const [updateDuration, setUpdateDuration] = useState(0);

	function profilerCallback(id, phase, actualDuration) {
		if ( phase === 'update') setUpdateDuration(actualDuration);
	}

	return (<section>
		<h1>TanStack Virtual</h1>
		<article>
			<p><strong>TanStack Virtual</strong> is a utility for virtualizing long scrollable lists.
				It reuses rows, columns, or cells to display any amount of data in a viewport.
				This can have huge performance benefits with long lists.</p>

			<div className="flex flex-row gap-2 mt-4 items-end">
				<div>This example loads more rows as user scrolls to the bottom.
				Without virtualization the number of DOM nodes representing rows will grow as will the time to render them.
				With Virtual, the number of rows will stay the same, only their contents and position are affected.</div>

				<div className="p-4 rounded-md flex flex-col items-center bg-gray-200 dark:bg-gray-700 min-w-22">
					<ClockIcon className="w-8 h-8"/>
					<label className="text-center text-sm">Update<br/>
						{updateDuration.toPrecision(2)} ms
					</label>
				</div>
			</div>

			<h2 className="flex justify-between items-center">
				Infinite Loader
				<Field className="switch-field">
					<Label>Use virtual</Label>
					<Switch className="switch group"
					        onChange={setUseVirtual}
					        checked={useVirtual}>
						<span/>
					</Switch>
				</Field>
			</h2>

			<div className="outlet h-64">
				<Profiler id="virtual-profiler" onRender={profilerCallback}>
					{ useVirtual ? <InfiniteLoadVirtual /> : <InfiniteLoad/> }
				</Profiler>
			</div>
		</article>
	</section>);
}
