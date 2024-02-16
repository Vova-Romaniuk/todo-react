import { useState, useEffect } from "react";
import Input from "../Input";
import Task from "../Task";
import { TaskModel } from "@/models/task";
import Button from "../Button";
import { generateUniqueId } from "../../helpers/date";
import Dialog from "../Dialog";
import DatePicker from "../DatePicker";
import { formatDateTime } from "../../helpers/date";

function TodoPage() {
	const [tasks, setTasks] = useState<TaskModel[]>([]);
	const [description, setDescription] = useState<string>("");
	const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
	const [isOpenDatePicker, setIsOpenDatePicker] = useState<boolean>(false);
	const [deadline, setDeadline] = useState<string>("");

	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, []);

	const handleAdd = (event) => {
		event.preventDefault();
		const trimmedDescription = description.trim();
		trimmedDescription &&
			setTasks([
				...tasks,
				{
					id: generateUniqueId(),
					description: trimmedDescription,
					isDone: false,
					deadline: deadline ? deadline : "no deadline",
				},
			]);
		handleCloseDialog();
		setDeadline("");
		setDescription("");
	};

	const handleOpenDialog = () => {
		setIsOpenDatePicker(false);
		setIsShowDialog(true);
	};

	const handleToggleOpenDatePicker = () => {
		setIsOpenDatePicker(!isOpenDatePicker);
	};

	const handleChange = ({ target }) => {
		const { value } = target;

		setDescription(value);
	};

	const handleCloseDialog = () => {
		handleToggleOpenDatePicker();
		setIsShowDialog(false);
	};

	const getCompletedTaskCount = () => {
		return tasks.filter((task) => task.isDone).length;
	};

	useEffect(() => {
		if (tasks.length > 0) {
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
	}, [tasks]);

	return (
		<div className='w-full h-screen bg-[#0d0d0d] flex flex-col'>
			{isShowDialog && (
				<Dialog handleClose={handleCloseDialog}>
					<div className='w-[600px] h-[250px] flex'>
						<form
							onSubmit={handleAdd}
							className='w-10/12 h-5/6 m-auto flex flex-col mx-auto'>
							<Input
								value={description}
								onChange={handleChange}
								className='!h-14 focus:border-[1px] focus:border-textColor'
							/>
							<div className='text-xl text-textColor mt-6 flex'>
								<div className='flex items-center text-lg'>
									<span>Select deadline for your task:</span>
									<span className='underline ml-2 text-textInput text-lg'>
										{formatDateTime(deadline) ===
										"Invalid Date"
											? "nothing selected"
											: formatDateTime(deadline)}
									</span>
								</div>
								<div className='w-fit h-fit relative ml-auto '>
									{isOpenDatePicker && (
										<DatePicker
											handleClose={
												handleToggleOpenDatePicker
											}
											setDeadline={setDeadline}
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
									className=' w-fit !h-12 !px-4 !py-1 !bg-accentColor !text-black hover:!bg-[#DD3E1C] duration-200 rounded-2xl !text-xl'
									type='submit'>
									Add
								</Button>
							</div>
						</form>
					</div>
				</Dialog>
			)}
			<div className='w-6/12 mx-auto h-full flex flex-col'>
				<div className='h-2/6 w-full flex rounded-[40px] border-[1px] mt-5 border-[#7e7466]'>
					<div className='w-9/12 m-auto h-4/6 flex justify-between'>
						<div className='m-auto w-7/12'>
							<p className='text-3xl text-textColor font-semibold'>
								Todo Done By Vovan
							</p>
							<p className='text-lg text-textColor font-extralight tracking-[0.3em] mt-1'>
								keep it up
							</p>
						</div>
						<div className='w-5/12 h-full m-auto flex'>
							<div className='h-40 w-40  flex rounded-full mr-0 my-auto ml-auto bg-accentColor'>
								<span className='text-4xl font-semibold m-auto'>
									{getCompletedTaskCount()} / {tasks.length}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className='h-1/6 w-full flex justify-center'>
					<div className='h-12 w-full m-auto flex'>
						<Button
							onClick={handleOpenDialog}
							className='!h-12 !w-12 flex !rounded-full mr-0 my-auto ml-auto !bg-accentColor text-3xl !text-black items-center justify-center hover:!bg-[#DD3E1C]'>
							<span className='mb-1'>+</span>
						</Button>
					</div>
				</div>

				<div className='h-3/6 w-full flex flex-col overflow-y-auto'>
					<div className='h-fit flex flex-col gap-10 pt-10'>
						{tasks.map((item) => (
							<Task
								description={item.description}
								key={item.id}
								id={item.id}
								isDone={item.isDone}
								deadline={item.deadline}
								setTasks={setTasks}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TodoPage;
