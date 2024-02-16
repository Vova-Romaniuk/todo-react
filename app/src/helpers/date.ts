export function generateUniqueId() {
	const randomString = Math.random().toString(36).substring(2, 10);

	const timestamp = new Date().getTime();

	return randomString + timestamp;
}
