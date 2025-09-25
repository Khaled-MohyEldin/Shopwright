import { test } from '@playwright/test';

test('authenticate', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("one@two.com");
    await page.locator('#userPassword').fill("1&twoThree");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle'); //wait dynamically 
    //2- capture store info in .json
    await page.context().storageState({ path: './state2.json' });
});