import { createFileRoute } from '@tanstack/react-router'
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import PageError from "../components/PageError.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import PostItem from "../components/PostItem.jsx";
import { InformationCircleIcon } from "@heroicons/react/24/solid/index.js";
import { useContext, useState } from "react";
import { AppContext } from "../components/AppContextProvider.jsx";
import EditPost from "../components/EditPost.jsx";
import { backendUrl, queryClient } from "../util/common.js";

export const Route = createFileRoute('/query')({
	component: RouteComponent,
})

function RouteComponent() {
	const [page, setPage] = useState(0);
	const { isError, error, data, isPending } =
		useQuery({ queryKey:['posts', page ], placeholderData: keepPreviousData });
	const context = useContext(AppContext);
	const { mutate: savePost, isPending: isMutationPending, variables: mutationData } = useMutation({
		// post
		mutationFn: async (post) => fetch(`${backendUrl}/post`, {
				method: "PATCH", headers: { "Content-type": "application/json"},
				body: JSON.stringify(post)
			}),

		// When mutate is called:
		onMutate: async (_post) => {
			await queryClient.cancelQueries({ queryKey: ['posts'] })
			// snapshot
			const prevData = queryClient.getQueryData(['posts', page]);

			// Optimistically update to the new value
			queryClient.setQueryData(['posts', page], (old) => {
				// replace post with postId
				const newData = { pages: old.pages, posts: [...old.posts] };
				const index = old.posts.findIndex(post => post._id === _post._id);
				if (index >= 0) newData.posts[index] = _post;
				return newData;
			});

			// Return context object with the snapshot
			return { prevData }
		},

		// If the mutation fails,
		// use the context returned from onMutate to roll back
		onError: (err, _, context) => {
			console.error(err);
			queryClient.setQueryData(['posts', page], context.prevData);
		},
		// Always refetch after error or success:
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts', page] }),
	});

	function goPage(dir){ setPage(page + dir); }

	function editPost(post) {
		context.showModal({
			title: "Edit Post",
			content: <EditPost onSave={savePost} post={post} />,
		})
	}

	return (<section>
		<h1>TanStack Query</h1>
		<article>
			<p><strong>TanStack Query</strong> is a fantastic library for caching and controlling requests to the server. It helps reduces unnecessary
				network traffic, helps with optimistic updates and more.</p>
			<p>In this example, we retrieve and display most recent posts from the database. When post is edited, changes are displayed optimistically,
				while the request completes in the background.</p>
			<p>If server update fails, data will revert to previous values. To see it in action, edit a post and save.
				The list will update with your changes. To see what happens if the server rejects your changes, simply
				include the word <strong>goat</strong> anywhere in the title or body.</p>

			<p className="info-box">
				<InformationCircleIcon/> For the sake of simplicity and purposes of this demo, there's no authentication or user control.
			</p>

			<h2 className="flex flex-row items-center">
				Data from Server
				<div className="text-sm font-normal flex-1 justify-end self-end items-center gap-2 flex flex-row">
					<button className="small" onClick={()=>goPage(-1)} disabled={page === 0}>Prev</button>
					Page {page+1}
					<button className="small" onClick={()=>goPage(1)} disabled={!data || page >= data.pages - 1}>Next</button>
				</div>
			</h2>
			{ isPending && <LoadingSpinner /> }
			{ isError && <PageError error={error} small/> }
			{ data &&
			<div className="outlet gap-2">
				{ data.posts.map((item)=><PostItem post={item} key={item._id} onEdit={editPost} isMutating={isMutationPending && mutationData?._id === item._id} />)}
			</div>}

		</article>
	</section>)
}
