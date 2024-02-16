export interface InputProps {
	value: string;
	placeholder?: string;
	className?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	readonly?: boolean;
}

function Input({
	onChange,
	value,
	readonly = false,
	className = "",
}: InputProps) {
	return (
		<input
			type='text'
			onChange={onChange}
			value={value}
			className={`w-full h-full rounded-3xl px-5 py-1 border-none outline-none bg-backgroundItem text-textInput placeholder:text-textInput ${className}`}
			placeholder='write your next task'
			readOnly={readonly}
		/>
	);
}

export default Input;
