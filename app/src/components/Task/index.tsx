import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { formatDateTime } from "../../helpers/date";
import { checkDeadline, checkDeadlineBorder } from "../../helpers/deadline";
import Dialog from "../Dialog";
import DatePicker from "../DatePicker";
interface TaskProps {
	id: string;
	description: string;
	isDone?: boolean;
	deadline: string;
	setTasks: (e) => void;
}

function Task({ id, description, isDone, deadline, setTasks }: TaskProps) {
	const [editDescription, setEditDescription] = useState<string>(description);
	const [editDeadline, setEditDeadline] = useState<string>(deadline);
	const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
	const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);

	const handleDelete = () => {
		setTasks((prev) => {
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

	const handleToggleOpenDatePicker = () => {
		setIsOpenDatePicker(!isOpenDatePicker);
	};

	const handleUpdate = () => {
		event.preventDefault();
		setTasks((prev) => {
			const editTaskIndex = prev.findIndex((item) => item.id === id);
			if (editTaskIndex !== -1 && editDescription.trim()) {
				const updatedTasks = [...prev];
				updatedTasks[editTaskIndex].deadline = editDeadline;
				updatedTasks[editTaskIndex].description = editDescription;

				return updatedTasks;
			} else {
				setEditDescription(prev[editTaskIndex].description);
			}

			return prev;
		});
		setIsShowDialog(false);
	};

	const handleChange = ({ target }) => {
		const { value } = target;
		setEditDescription(value);
	};

	const handleCloseDialog = () => {
		handleToggleOpenDatePicker();
		setIsShowDialog(false);
	};

	const handleOpenDialog = () => {
		setIsShowDialog(true);
	};

	return (
		<div className='w-full rounded-xl h-20 bg-backgroundItem border-[1px] border-textColor flex relative rounded-se-none'>
			{isShowDialog && (
				<Dialog handleClose={handleCloseDialog}>
					<div className='w-[600px] h-[250px] flex'>
						<form
							onSubmit={handleUpdate}
							className='w-10/12 h-5/6 m-auto flex flex-col mx-auto'>
							<Input
								value={editDescription}
								onChange={handleChange}
								className='!h-14 focus:border-[1px] focus:border-textColor'
							/>
							<div className='text-xl text-textColor mt-6 flex'>
								<div className='flex items-center text-lg'>
									<span>Select deadline for your task:</span>
									<span className='underline ml-2 text-textInput !text-sm'>
										{formatDateTime(editDeadline) ===
										"Invalid Date"
											? "nothing selected"
											: formatDateTime(editDeadline)}
									</span>
								</div>
								<div className='w-fit h-fit relative ml-auto '>
									{isOpenDatePicker && (
										<DatePicker
											handleClose={
												handleToggleOpenDatePicker
											}
											deadline={deadline}
											setDeadline={setEditDeadline}
										/>
									)}
									<Button
										onClick={handleToggleOpenDatePicker}
										className='text-3xl !text-textColor border-0 outline-0'>
										<i className='fa-regular fa-calendar-days'></i>
									</Button>
								</div>
							</div>
							<div className='mt-auto flex justify-center gap-10 !text-2xl'>
								<Button
									className='w-fit !h-12 !px-4 !py-2 !border-accentColor duration-200 border-2 hover:bg-accentColor hover:text-black rounded-2xl !text-xl'
									onClick={handleCloseDialog}>
									Close
								</Button>
								<Button
									className='w-fit !h-12 !px-4 !py-2 !bg-accentColor !text-black hover:!bg-[#DD3E1C] duration-200 rounded-2xl !text-xl'
									type='submit'>
									Update
								</Button>
							</div>
						</form>
					</div>
				</Dialog>
			)}
			<div className='-right-[1px] flex absolute -top-8 overflow-hidden h-fit w-fit mr-0'>
				<div
					className={`w-0 h-0 border-b-[31px] border-l-[60px] border-l-transparent ${checkDeadlineBorder(
						deadline
					)}`}></div>
				<div
					className={`rounded-se-xl flex items-center border-[1px] border-y-textColor ${checkDeadline(
						deadline
					)} right-0 h-8 w-44 border-l-0`}>
					<span className='text-sm text-textColor font-light'>
						{deadline === "no deadline"
							? "No deadline"
							: formatDateTime(deadline)}
					</span>
				</div>
			</div>
			<div className='w-11/12 mx-auto flex items-center'>
				<Button
					onClick={handleToggle}
					className={`border-[1px] rounded-full ${
						isDone ? "!bg-green-600 " : "border-accentColor"
					}`}></Button>
				<div className='w-7/12'>
					<Input
						className={`text-textColor text-2xl ml-4 font-semibold tracking-wider ${
							isDone && "line-through"
						}`}
						value={editDescription}
						onChange={handleChange}
						readonly={true}
					/>
				</div>

				<div className='ml-auto flex mr-5 text-3xl'>
					<Button
						onClick={handleOpenDialog}
						className={
							!isDone && "hover:text-green-700 duration-200"
						}
						disabled={isDone}>
						<i className='fa-regular fa-pen-to-square'></i>
					</Button>

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
