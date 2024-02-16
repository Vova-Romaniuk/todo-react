import dayjs from "dayjs";

export const checkDeadline = (deadline) => {
	if (deadline !== "no deadline") {
		const deadlineDate = dayjs(deadline);
		const now = dayjs();

		const hoursDiff = deadlineDate.diff(now, "hour");

		if (hoursDiff >= 24) {
			return "bg-green-700";
		} else if (hoursDiff >= 6) {
			return "bg-orange-600";
		} else if (hoursDiff >= 2) {
			return "bg-red-700";
		} else {
			return "bg-red-900";
		}
	}
	return "bg-green-700";
};

export const checkDeadlineBorder = (deadline) => {
	if (deadline !== "no deadline") {
		const deadlineDate = dayjs(deadline);
		const now = dayjs();

		const hoursDiff = deadlineDate.diff(now, "hour");

		if (hoursDiff >= 24) {
			return "border-b-green-700";
		} else if (hoursDiff >= 6) {
			return "border-b-orange-600";
		} else if (hoursDiff >= 2) {
			return "border-b-red-700";
		} else {
			return "border-b-red-900";
		}
	}
	return "border-b-green-700";
};
