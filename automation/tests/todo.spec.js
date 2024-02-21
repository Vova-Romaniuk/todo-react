// @ts-check
import {
	openTaskCreationPopup,
	openDatepicker,
	inputFill,
	clickItemDatepicker,
	saveDatePickerData,
	addTask,
	selectReminderType,
	toogleDropdowm,
	waitFetchRaces,
	selectRace,
} from "./todo-steps";

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("check that popup visible after open", async ({ page }) => {
	await openTaskCreationPopup(page);

	const popup = await page.waitForSelector("#popup");
	await expect(await popup.isVisible()).toBe(true);
});

test("check that datipicker visible after open", async ({ page }) => {
	await openTaskCreationPopup(page);
	await openDatepicker(page);

	const datepicker = await page.waitForSelector("#datepicker");
	await expect(await datepicker.isVisible()).toBe(true);
});

test("check that task created", async ({ page }) => {
	await openTaskCreationPopup(page);
	await openDatepicker(page);
	await page.waitForSelector("#datepicker");
	await clickItemDatepicker(page);
	await saveDatePickerData(page);
	await inputFill(page);
	await addTask(page);

	const task = await page.waitForSelector("#task0");

	await expect(await task.isVisible()).toBe(true);
});

test("check that reminder created", async ({ page }) => {
	await selectReminderType(page);
	await openTaskCreationPopup(page);
	await toogleDropdowm(page);
	await waitFetchRaces(page);
	await selectRace(page);
	await inputFill(page);
	await addTask(page);

	const task = await page.waitForSelector(
		'#tasks input[value="New task: Bahrain Grand Prix"]'
	);

	await expect(await task.isVisible()).toBe(true);
});
