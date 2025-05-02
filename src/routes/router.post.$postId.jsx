import { createFileRoute } from '@tanstack/react-router'
import { fetchPostLoader } from "../util/common.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import PageNotFound from "../components/PageNotFound.jsx";
import PostItem from "../components/PostItem.jsx";

export const Route = createFileRoute('/router/post/$postId')({
  component: RouteComponent,
	staleTime: 5000, gcTime: 5000, // expires after 5s
	pendingMs: 250, // time before displaying pending component
	pendingComponent: LoadingSpinner,
	loader: fetchPostLoader
})

function RouteComponent() {
	const post = Route.useLoaderData();

	// bad id - show error
	if (!post) return <PageNotFound small message="Post with this ID was not found" />

	// show post
	return (<PostItem post={post}/>);
}
