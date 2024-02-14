import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DialogState {
	className?: string;
	handleClose: (event: React.MouseEvent<HTMLElement>) => void;
	children: ReactNode;
}

const portalRoot = document.getElementById("portal-root") || document.body;

export default function Dialog({
	children,
	className = "",
	handleClose,
}: DialogState) {
	const elRef = useRef(document.createElement("div"));

	useEffect(() => {
		// Append the created element to the portal root on mount
		portalRoot.appendChild(elRef.current);

		// Clean up the created element on unmount
		return () => {
			portalRoot.removeChild(elRef.current);
		};
	}, []);

	return createPortal(
		<div
			onClick={handleClose}
			className='w-screen bg-black/50 z-50 h-screen fixed top-0 left-0 flex'>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`rounded-md relative m-auto z-50 border-[1px] border-textColor bg-[#0d0d0d] bg- p-5 w-fit h-fit flex ${className}`}>
				{children}
			</div>
		</div>,
		elRef.current
	);
}
