import { expect, test } from '@playwright/test';

test('verify the GET request', async ({ page }) => {
	await page.goto('/');
	await page.locator('button', { hasText: 'Request Data from GET endpoint' }).click();
	const logElement = await page.locator('ul');
	const logHtml = await logElement.innerHTML();
	// console.log('Log HTML', logHtml);
	expect(logHtml).toContain('[GET] data received:');
});

test('add a torrent', async ({ page }) => {
	// be aware this isn't reliable due to no proper error handling in the form action
	await page.goto('/');
	await page.click('button[type="submit"]');

	await page.waitForFunction(() => {
		const logElement = document.querySelector('ul');
		return logElement && logElement.innerHTML.includes('[FORM] repsonse:');
	});

	const logElement = await page.locator('ul');
	const logHtml = await logElement.innerHTML();
	// console.log('Log HTML', logHtml);
	expect(logHtml).toContain('[FORM] repsonse: {"success":true,"message":"Torrent added"}');
});
