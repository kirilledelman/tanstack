import { useEffect, useRef } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid/index.js"

// basic modal using <dialog> HTML element
export default function ModalDialog({ open, header, closeFn, children }) {
	const dialogRef = useRef(null);

	// watches .open propert and shows/hides html dialog
	useEffect(() => {
		if ( dialogRef.current && open !== dialogRef.current.open ) {
			if ( open ) {
				dialogRef.current.showModal();
			} else {
				dialogRef.current.close();
			}
		}
	}, [open, closeFn]);

	// dialog itself
	return (
	<dialog ref={dialogRef} onClose={closeFn}>
		<div className="frame">
			<XMarkIcon className="btn-close" onClick={closeFn} />
			<header>{header}</header>
			<div className="content">{children}</div>
		</div>
	</dialog>);

}