import { ReactNode } from "react";

export interface ButtonProps {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	children?: ReactNode;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	id?: string;
}

function Button({
	children,
	className,
	onClick,
	disabled = false,
	type = "button",
	id = "",
}: ButtonProps) {
	return (
		<button
			className={`bg-transparent text-textInput cursor-pointer mx-2 h-8 w-8 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
			disabled={disabled}
			type={type}
			id={id}
			onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
