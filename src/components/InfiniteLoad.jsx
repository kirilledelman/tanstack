import { useInfiniteQuery } from "@tanstack/react-query"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useEffect, useRef } from "react"
import LoadingSpinner from "./LoadingSpinner.jsx"
import PageError from "./PageError.jsx"
import { backendUrl } from "../util/common.js"


// Query function fetching page based on queryKey
async function fetchPage({queryKey, pageParam, signal}){
	const res = await fetch(`${backendUrl}/${queryKey.join('/')}/${pageParam}`, { signal });
	if ( !res.ok ) return null;
	const ret = await res.json();
	return { data: ret.rows, nextPage: ret.hasMore ? pageParam + 1 : null };
}

// row displayed in both versions of this example
function ExampleRow({row, odd, className='', ...rest}) {
	return (
		<li className={`${odd ? 'bg-gray-50 dark:bg-gray-900' : ''} h-10 flex items-center p-4 w-full ${className}`} {...rest} >
			{row ? row.value : <em>Loading...</em>}
		</li>
	)
}

// non-virtualized version of infinite load example
export function InfiniteLoad() {
	const {
		data,
		error,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['virtual'],
		queryFn: fetchPage,
		getNextPageParam: (lastData) => lastData.nextPage,
		initialPageParam: 0,
	});

	// flatten rows from data.pages array
	const allRows = data ? data.pages.flatMap((d) => d.data) : []

	// when user scrolls near the bottom, load more pages
	function maybeLoadMore(e) {
		if ( isFetching || isFetchingNextPage || !hasNextPage ) return;
		const ul = e.target, distToBottom = ul.scrollHeight - (ul.scrollTop + ul.offsetHeight);
		if ( distToBottom < 4 ) fetchNextPage();
	}

	// output all loaded rows
	return <ul className="overflow-y-auto h-full" onScrollCapture={maybeLoadMore}>
		{ allRows.map((row,i) => (<ExampleRow key={i} row={row} odd={i % 2}/>))}
		{ isFetching && <LoadingSpinner/> }
		{ error && <PageError small error={error} /> }
	</ul>
}

// virtualized version of infinite load example
export function InfiniteLoadVirtual() {
	const parentRef = useRef();
	const {
		data,
		error,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ['virtual'],
		queryFn: fetchPage,
		getNextPageParam: (lastData) => lastData.nextPage,
		initialPageParam: 0,
	});

	// flatten rows from data.pages array
	const allRows = data ? data.pages.flatMap((d) => d.data) : [];

	// create virtualizer
	const rowVirtualizer = useVirtualizer({
		count: hasNextPage ? allRows.length + 1 : allRows.length, // show extra row, if there are more pages to load
		overscan: 2,
		estimateSize: () => 40, // height of an element in px
		getScrollElement: () => parentRef.current,
	})

	// when last displayed row is "loader" row (index > total loaded items), trigger loading next page
	useEffect(() => {
		const lastItem = rowVirtualizer.getVirtualItems().at(-1);
		if ( lastItem && lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [ hasNextPage, fetchNextPage, isFetchingNextPage, allRows.length, rowVirtualizer, rowVirtualizer.getVirtualItems() ])

	// output virtual rows
	return (<ul ref={parentRef} className="overflow-y-auto h-full">
			<div className="relative w-full" style={{height:`${rowVirtualizer.getTotalSize()}px`}}>
				{ rowVirtualizer.getVirtualItems().map((virtualRow) => {
					const item = allRows[virtualRow.index];
					return (<ExampleRow key={virtualRow.index} row={item} odd={virtualRow.index % 2}
						            className="absolute top-0 left-0"
						            style={{transform: `translateY(${virtualRow.start}px)`}}/>);
				})}
				{ isFetching && !data && <LoadingSpinner/> }
				{ error && <PageError small error={error} /> }
			</div>
		</ul>);
}