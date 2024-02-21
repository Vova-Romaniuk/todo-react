export const openTaskCreationPopup = async (page) => {
	const buttonOpenPopup = await page.$("#open-create-dialog");
	await buttonOpenPopup.click();
};

export const inputFill = async (page) => {
	const inputNewTask = await page.waitForSelector("#input-new-task");
	inputNewTask.fill("New task");
};

export const openDatepicker = async (page) => {
	const buttonToggleDatepicker = await page.$("#toggle-datepicker");
	buttonToggleDatepicker.click();
};

export const clickItemDatepicker = async (page) => {
	const spanElementDatepicker = await page.$('span:has-text("25")');
	spanElementDatepicker.click();
};

export const saveDatePickerData = async (page) => {
	const buttonSaveDatepicker = await page.waitForSelector("#save-datepicker");
	buttonSaveDatepicker.click();
};

export const addTask = async (page) => {
	const buttonAddTask = await page.$("#add-task");
	buttonAddTask.click();
};

export const selectReminderType = async (page) => {
	const buttonTypeReminder = await page.waitForSelector(
		"#select-type-reminder"
	);
	buttonTypeReminder.click();
};

export const toogleDropdowm = async (page) => {
	const buttonToggleDropdown = await page.$("#toggle-dropdown");
	buttonToggleDropdown.click();
};

export const waitFetchRaces = async (page) => {
	await page.waitForSelector("#races-wrapper");
};

export const selectRace = async (page) => {
	const raceWrapper = await page.$(
		'#races-wrapper > div:has-text("Bahrain Grand Prix")'
	);
	raceWrapper.click();
};
