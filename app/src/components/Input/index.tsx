export interface InputProps {
	value: string;
	placeholder?: string;
	className?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	readonly?: boolean;
	type?: string;
	min?: string;
	max?: string;
}

function Input({
	onChange,
	value,
	readonly = false,
	className = "",
	type = "text",
	...props
}: InputProps) {
	return (
		<input
			type={type}
			onChange={onChange}
			value={value}
			className={`w-full h-full rounded-3xl px-5 py-1 border-0 outline-0 bg-backgroundItem text-textInput placeholder:text-textInput ${className}`}
			placeholder='write your next task'
			readOnly={readonly}
			{...props}
		/>
	);
}

export default Input;
