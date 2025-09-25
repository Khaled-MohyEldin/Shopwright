import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utilities/apiutils';

const login_payload = { "userEmail": "one@two.com", "userPassword": "1&twoThree" };
const order_payload = { "orders": [{ "country": "Egypt", "productOrderedId": "68a961719320a140fe1ca57c" }] };
let order_id: string;
let api_utils: APIUtils;

test.beforeAll(async () => {
    //login API
    const api_context = await request.newContext();
    api_utils = new APIUtils(api_context, login_payload); 
    order_id = await api_utils.createOrder(order_payload);
});

test('WebUI + API test', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await api_utils.getToken());

    //no need to login in UI, goto dashboard Page directly
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await page.locator("button[routerlink*='order']").click();
    //wait for table to load
    await page.locator("th").first().waitFor({ state: 'visible' });
    //get first ID 
    const shown_id = await page.locator("tbody th").first().textContent();
    console.log(`createdID = ${order_id} \nshownID = ${shown_id}`);
    expect(shown_id === order_id).toBeTruthy();

});