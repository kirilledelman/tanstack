import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid/index.js";

export default function ModalDialog({ open, header="Modal", closeFn, children }) {
	const dialogRef = useRef(null);

	useEffect(() => {
		if ( dialogRef.current && open !== dialogRef.current.open ) {
			if ( open ) {
				dialogRef.current.showModal();
			} else {
				dialogRef.current.close();
			}
		}
	}, [open, closeFn]);

	return (
	<dialog ref={dialogRef} onClose={closeFn}>
		<div className="frame">
			<XMarkIcon className="btn-close" onClick={closeFn} />
			<header>{header}</header>
			<div className="content">{children}</div>
		</div>
	</dialog>);

}