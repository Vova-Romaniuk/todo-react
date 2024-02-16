export const generateCalendar = (currentMonth) => {
	const firstDayOfMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth(),
		1
	);
	const lastDayOfMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth() + 1,
		0
	);
	const daysInMonth = lastDayOfMonth.getDate();
	const firstDayOfWeek = (firstDayOfMonth.getDay() - 1 + 7) % 7;
	const weeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

	let dayCounter = 1 - firstDayOfWeek;

	return Array.from({ length: weeks }, (_, i) => {
		return Array.from({ length: 7 }, (_, j) => {
			const day =
				dayCounter <= 0 || dayCounter > daysInMonth ? null : dayCounter;
			dayCounter++;
			return day;
		});
	});
};

export const getLocalizedMonthName = (date, locale) => {
	return date.toLocaleString(locale, { month: "long" });
};

export const getCurrentMonthName = (currentMonth) => {
	return getLocalizedMonthName(currentMonth, "en-US");
};

export const getPreviousMonthName = (currentMonth) => {
	const previousMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth() - 1,
		1
	);
	return getLocalizedMonthName(previousMonth, "en-US");
};

export const getNextMonthName = (currentMonth) => {
	const nextMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth() + 1,
		1
	);
	return getLocalizedMonthName(nextMonth, "en-US");
};

export const getCurrentYear = (currentMonth) => {
	return currentMonth.getFullYear();
};
