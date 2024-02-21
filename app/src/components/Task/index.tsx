import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import { formatDateTime } from "../../helpers/date";
import { checkDeadline, checkDeadlineBorder } from "../../helpers/deadline";
import Dialog from "../Dialog";
import DatePicker from "../DatePicker";
import { TaskType } from "../../models/task";
import Dropdown from "../Dropdown";
import { RaceState } from "@/models/race";

interface TaskProps {
	id: string;
	description: string;
	isDone?: boolean;
	deadline: string;
	setTasks: (e) => void;
	type: TaskType;
	raceId: string;
}

function Task({
	id,
	description,
	isDone,
	deadline,
	setTasks,
	type,
	raceId,
}: TaskProps) {
	const [editDescription, setEditDescription] = useState<string>(
		type === "task"
			? description
			: type === "reminder" && description.split(":")[0]
	);
	const [editDeadline, setEditDeadline] = useState<string>(deadline);
	const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
	const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);
	const [editRace, setEditRace] = useState<RaceState>({
		raceName: description.split(":")[1],
		date: deadline,
		raceId: raceId,
	});

	const [raceYear, setRaceYear] = useState<string>(
		new Date(deadline).getFullYear().toString()
	);

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
				if (editRace && type === TaskType.Reminder) {
					updatedTasks[editTaskIndex].deadline = editRace.date;
					updatedTasks[editTaskIndex].raceId = editRace.raceId;
					updatedTasks[
						editTaskIndex
					].description = `${editDescription.trim()}: ${
						editRace.raceName
					}`;
				}
				if (editRace && type === TaskType.Task) {
					updatedTasks[editTaskIndex].deadline = editDeadline;
					updatedTasks[editTaskIndex].description = editDescription;
				}

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

	const hangleChangeRaceYear = ({ target }) => {
		const year = +target.value;
		if (year >= 1950 && year <= 2023) setRaceYear(target.value);
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
							{type === "task" ? (
								<div className='text-xl text-textColor mt-6 flex'>
									<div className='flex items-center text-lg'>
										<span>
											Select deadline for your task:
										</span>
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
							) : (
								type === "reminder" && (
									<div className='mt-5'>
										<div className='flex h-fit justify-between w-full'>
											<Dropdown
												name='Select your favorite race'
												setRace={setEditRace}
												year={raceYear}
												raceId={editRace.raceId}
											/>
											<Input
												onChange={hangleChangeRaceYear}
												value={raceYear}
												className='!w-32 !h-[46px] !text-textColor rounded-md  !border-textColor !border-[1px]'
												type='number'
												min='1950'
												max='2023'
											/>
										</div>
										<div className='text-textColor mt-2 mb-6 underline'>
											<span className='mr-2'>
												{editRace.raceName}
											</span>
											<span>
												{formatDateTime(editDeadline)}
											</span>
										</div>
									</div>
								)
							)}

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
				<div className='w-9/12'>
					<Input
						className={`text-textColor text-xl ml-4 font-semibold tracking-wider ${
							isDone && "line-through"
						}`}
						value={
							type === "task"
								? editDescription
								: type === "reminder" && description
						}
						onChange={handleChange}
						readonly={true}
					/>
				</div>

				<div className='ml-auto flex mr-0 text-3xl'>
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
