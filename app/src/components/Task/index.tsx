import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { TaskModel } from "@/models/task";

interface TaskProps {
	id: string;
	description: string;
	isDone?: boolean;
	setTasks: (e) => void;
}

function Task({ id, description, isDone, setTasks }: TaskProps) {
	const [isEditInput, setIsEditInput] = useState<boolean>(false);
	const [editDescription, setEditDescription] = useState<string>(description);

	const handleDelete = () => {
		setTasks((prev) => {
			console.log(prev);
			return prev.filter((task) => task.id !== id);
		});
	};

	const handleToggle = () => {
		setTasks((prev) => {
			const toggleTaskIndex = prev.findIndex((item) => item.id === id);

			if (toggleTaskIndex !== -1) {
				const updatedTasks = [...prev];
				updatedTasks[toggleTaskIndex] = {
					...updatedTasks[toggleTaskIndex],
					isDone: !updatedTasks[toggleTaskIndex].isDone,
				};

				return updatedTasks;
			}

			return prev;
		});
	};

	const activateEditMode = () => {
		setIsEditInput(true);
	};

	const handleEdit = () => {
		setTasks((prev) => {
			const editTaskIndex = prev.findIndex((item) => item.id === id);
			if (editTaskIndex !== -1) {
				const updatedTasks = [...prev];
				updatedTasks[editTaskIndex] = {
					...updatedTasks[editTaskIndex],
					description: editDescription.trim()
						? editDescription
						: description,
				};

				return updatedTasks;
			}

			return prev;
		});
		setIsEditInput(false);
	};

	const handleChange = ({ target }) => {
		const { value } = target;
		setEditDescription(value);
	};

	return (
		<div className='w-full rounded-xl h-20 bg-backgroundItem border-[1px] border-textColor flex'>
			<div className='w-11/12 mx-auto flex items-center'>
				<Button
					onClick={handleToggle}
					disabled={isEditInput}
					className={` border-[1px] rounded-full ${
						isDone ? "!bg-green-600 " : "border-accentColor"
					}`}></Button>
				<div className='w-7/12'>
					<Input
						className={`text-textColor text-2xl ml-4 font-semibold tracking-wider ${
							isDone && "line-through"
						}`}
						value={editDescription}
						onChange={handleChange}
						readonly={isDone || !isEditInput}
					/>
				</div>

				<div className='ml-auto mr-5 text-3xl'>
					{isEditInput ? (
						<Button
							onClick={handleEdit}
							className='hover:text-green-700 duration-200'>
							<i className='fa-solid fa-check'></i>
						</Button>
					) : (
						<Button
							onClick={activateEditMode}
							className={
								!isDone && "hover:text-green-700 duration-200"
							}
							disabled={isDone}>
							<i className='fa-regular fa-pen-to-square'></i>
						</Button>
					)}

					<Button
						onClick={handleDelete}
						className='hover:text-red-900 duration-200'>
						<i className='fa-solid fa-trash'></i>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Task;
