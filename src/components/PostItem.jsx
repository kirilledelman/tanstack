import LoadingSpinner from "./LoadingSpinner.jsx";

export default function PostItem({ post, onEdit=null, isMutating=false }) {
	return <li className={`rounded-md list-none bg-gray-50 dark:bg-gray-700 p-2 relative ${isMutating ? 'opacity-75' : ''}`}>
		{ isMutating && (<LoadingSpinner className="absolute top-1 right-16" text="Saving.."/>)}
		<h3 className="text-xl font-bold m-0 mb">{post.title}</h3>
		<time className="text-sm mb-4 text-gray-500">{new Date(post.created).toTimeString()}</time>
		<p>{post.body}</p>
		{ onEdit && (<button className="absolute top-1 right-1 small" onClick={()=>onEdit(post)}>Edit</button>) }
	</li>;
}