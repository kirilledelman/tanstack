
// common backend URL based on window.location
import { QueryClient } from "@tanstack/react-query";

export const backendUrl = `${window.location.protocol}//${window.location.hostname}:10001`;

// query client used in this app
// in configuration, we're providing a general fetch function that uses key as fetch URL
export const queryClient = new QueryClient({
	defaultOptions: {
		retry: 1,
		queries: { queryFn: fetchData }
	},
});

// general fetch function that concatenates query keys and fetches JSON from backend
export async function fetchData({queryKey, signal}) {
	const res = await fetch(`${backendUrl}/${queryKey.join('/')}`, { signal });
	if ( !res.ok ) return null;
	return res.json();
}

// using TanStack Query inside loader
export async function fetchPostLoader({params}) {
	return await queryClient.fetchQuery({
		queryKey: ['post', params.postId ],
		queryFn: fetchData
	});
}