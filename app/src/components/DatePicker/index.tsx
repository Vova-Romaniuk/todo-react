import { useState, useEffect } from "react";
import "./style.css";
import Button from "../Button";
import {
	generateCalendar,
	getCurrentMonthName,
	getPreviousMonthName,
	getNextMonthName,
	getCurrentYear,
} from "../../helpers/datePicker";

interface SelectedTimeModel {
	hours?: string;
	minutes?: string;
}
interface DatePickerProps {
	setDeadline: (e) => void;
	handleClose: (e) => void;
	deadline?: string;
}

function DatePicker({
	setDeadline,
	handleClose,
	deadline = "",
}: DatePickerProps) {
	const today = new Date();

	const [selectedDate, setSelectedDate] = useState<string>(
		today.toISOString().split("T")[0]
	);

	const [selectedTime, setSelectedTime] = useState<SelectedTimeModel>({
		hours: today.getHours().toString(),
		minutes: today.getMinutes().toString(),
	});

	const [calendar, setCalendar] = useState<number[][]>([]);
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
	const [activeDate, setActiveDate] = useState<number>(
		new Date(deadline).getDate()
	);

	const isDateDisabled = (day: number): boolean => {
		const todayZero = new Date();
		todayZero.setHours(0, 0, 0, 0);
		const currentDate = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			day
		);

		return currentDate < todayZero;
	};

	const handleDateClick = (day: number) => {
		if (day) {
			const selectedDate = new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth(),
				day + 1
			);
			const formattedDate = selectedDate.toISOString().split("T")[0];

			setSelectedDate(formattedDate);
			setActiveDate(day);
		}
	};

	const handleTimeChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: keyof SelectedTimeModel
	) => {
		const value = e.target.value;
		setSelectedTime((prevTime) => ({
			...prevTime,
			[type]: value,
		}));
	};

	const handleMonthChange = (change: number) => {
		setCurrentMonth(
			new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth() + change,
				1
			)
		);
	};

	const handleSave = (e) => {
		if (selectedDate && selectedTime?.hours && selectedTime?.minutes)
			setDeadline(
				`${selectedDate}T${selectedTime.hours}:${selectedTime.minutes}:00`
			);
		handleClose(e);
	};

	useEffect(() => {
		setCalendar(generateCalendar(currentMonth));
	}, [currentMonth]);

	return (
		<div className='custom-datepicker w-96 absolute top-0 h-fit left-[68px] -translate-y-1/2 !text-textColor bg-backgroundItem'>
			<div className='-left-[30px] border-r-[30px] border-b-[15px]  border-t-[15px]  absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-transparent border-b-transparent border-r-backgroundItem'></div>
			<div className='flex justify-evenly'>
				<Button
					className='!text-textInput text-sm hover:!text-textColor'
					onClick={() => handleMonthChange(-1)}>
					{getPreviousMonthName(currentMonth)}
				</Button>
				<h3>
					{getCurrentMonthName(currentMonth)}{" "}
					{getCurrentYear(currentMonth)}
				</h3>
				<Button
					className='!text-textInput text-sm hover:!text-textColor'
					onClick={() => handleMonthChange(1)}>
					{getNextMonthName(currentMonth)}
				</Button>
			</div>
			<div className='calendar'>
				<div className='grid w-full grid-cols-7 border-y-[1px] border-textColor mt-3'>
					{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
						(day) => (
							<span
								className=' border-textColor p-2 border-l-[1px] last:border-r-[1px] !font-medium'
								key={day}>
								{day}
							</span>
						)
					)}
				</div>
				<div className='flex flex-col'>
					{calendar.map((week, weekIndex) => (
						<div
							className='grid grid-cols-7 border-b-[1px] border-textColor !font-medium'
							key={weekIndex}>
							{week.map((day, dayIndex) => (
								<span
									key={dayIndex}
									onClick={() =>
										isDateDisabled(day)
											? null
											: handleDateClick(day)
									}
									className={`flex cursor-pointer justify-center items-center border-l-[1px] last:border-r-[1px] p-2 ${
										day
											? day <= 0 ||
											  day > 31 ||
											  (!isDateDisabled(day) &&
													"bg-[#0c0c0c] hover:bg-accentColor hover:text-black duration-200")
											: "bg-transparent"
									} ${
										activeDate &&
										activeDate === day &&
										"!bg-accentColor text-black"
									}`}>
									{day > 0 && day <= 31 ? day : ""}
								</span>
							))}
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col mt-2 gap-3'>
				<div className='flex'>
					<div className='flex'>
						<span className='h-full flex items-center'>Hours:</span>
						<input
							type='number'
							min='0'
							name='hours'
							max='23'
							className='ml-3 bg-transparent outline-0 text-textColor border-[1px] border-textColor pl-1 w-12'
							value={selectedTime?.hours || ""}
							onChange={(e) => handleTimeChange(e, "hours")}
						/>
					</div>
					<div className='flex ml-2'>
						<span className='h-full flex items-center'>
							Minutes:
						</span>

						<input
							type='number'
							className='ml-3 bg-transparent outline-0 text-textColor border-[1px] border-textColor w-12 pl-1'
							min='0'
							name='minutes'
							max='59'
							value={selectedTime?.minutes || ""}
							onChange={(e) => handleTimeChange(e, "minutes")}
						/>
					</div>
				</div>
				<div className='w-full flex font-medium'>
					<Button
						className='border-[1px] m-auto mr-1 !text-lg !text-textColor px-4 hover:!bg-textColor duration-200 hover:!text-black w-fit h-12 ml-auto'
						onClick={handleClose}>
						Cancel
					</Button>
					<Button
						className='border-[1px] px-4 !bg-textColor duration-200 !text-black hover:!bg-[#867a65] hover:text-white w-fit h-12 mr-0'
						onClick={handleSave}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DatePicker;
