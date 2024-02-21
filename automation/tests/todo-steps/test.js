const { chromium } = require("playwright");

(async () => {
	// Встановіть шлях до виконуваного файлу Chromium у вашій системі
	const browser = await chromium.launch({ headless: false });

	const page = await browser.newPage();

	await page.goto("http://localhost:5173/");

	const buttonOpenPopup = await page.$("#open-create-dialog");
	await buttonOpenPopup.click();

	// // Очікуємо з'явлення порталу з ідентифікатором "portal-root"
	const popupSelector = "#popup";
	await page.waitForSelector(popupSelector);

	const inputNewTask = await page.$("#input-new-task");
	inputNewTask.fill("New task");

	const buttonToggleDatepicker = await page.$("#toggle-datepicker");
	buttonToggleDatepicker.click();

	const datepickerSelector = "#datepicker";
	await page.waitForSelector(datepickerSelector);

	const spanElementDatepicker = await page.$('span:has-text("22")');
	spanElementDatepicker.click();

	const buttonSaveDatepicker = await page.$("#save-datepicker");
	buttonSaveDatepicker.click();

	const buttonAddTask = await page.$("#add-task");
	buttonAddTask.click();

	//await browser.close();
})();
