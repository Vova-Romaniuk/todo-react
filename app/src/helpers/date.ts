import dayjs from "dayjs";

export function generateUniqueId() {
	const randomString = Math.random().toString(36).substring(2, 10);

	const timestamp = new Date().getTime();

	return randomString + timestamp;
}

export const formatDateTime = (dateString) =>
	dayjs(dateString).format("D MMMM, YYYY [in] HH:mm");
