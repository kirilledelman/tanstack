import { useCallback, useContext, useState } from "react"
import { Field, Input, Label } from "@headlessui/react"
import { AppContext } from "./AppContextProvider.jsx"

// dialog for editing a post
// calls onSave callback with post object when user clicks Save
export default function EditPost({post, onSave=null}) {
	const context = useContext(AppContext);
	const [data, setData] = useState({...post});
	const [validation, setValidation] = useState({});

	// form action handler
	const handleSubmit = useCallback((formData)=>{
		// validate
		const _validation = {};
		const _post = {
			...post,
			title: formData.get('title').trim(),
			body: formData.get('body').trim()
		}
		if ( !_post.title.length ) _validation.title = true;
		if ( !_post.body.length ) _validation.body = true;
		setValidation(_validation);
		setData(_post);

		// no errors? callback, then close modal
		if ( !Object.keys(_validation).length ) {
			if (onSave) onSave(_post);
			context.showModal(false);
		}
	}, [context, onSave, post]);

	// cancel handler
	function onCancel(e){
		e.preventDefault();
		e.stopPropagation();
		context.showModal(false);
	}

	// display modal contents
	return (<>
		<form action={handleSubmit}>
			<Field className="flex flex-col sm:flex-row mb-3 gap-2 items-start sm:items-center">
				<Label className="min-w-1/4 text-left sm:text-right py-2">Title</Label>
				<Input name="title" className="input-text" defaultValue={data.title} invalid={validation.title} tabIndex="1"/>
			</Field>
			<Field className="flex flex-col sm:flex-row mb-3 gap-2 items-start sm:items-top">
				<Label className="min-w-1/4 text-left sm:text-right py-2">Body</Label>
				<Input name="body" as="textarea" className="input-text min-h-48" defaultValue={data.body} invalid={validation.body} tabIndex="2"/>
			</Field>

			<div className="flex justify-between flex-row-reverse">
				<button className="medium" type="submit" tabIndex="3">
					Save
				</button>
				<button className="medium" onClick={onCancel} tabIndex="4">
					Cancel
				</button>
			</div>
		</form>
	</>);
};