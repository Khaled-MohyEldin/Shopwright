import { test, request,expect } from '@playwright/test';
import { APIUtils } from '../utilities/apiutils';
/*
Mocking Network Response 
this allows us more freedom while testing API/GUI

    Ex1: this user already has previuos orders   
        but we can intercept network with fakeResponse 
        to make him with no previous orders at all 

    Ex2: Security Check this user is somehow 
        accessing other users orders should get unauthorized msg 
*/
const fakePayload = {"data":[],"message":"No Orders"}
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

test('Mocking Network 1 => Replace Response with fake one', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await api_utils.getToken());
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    //intercepting response 
    //API response->| hijack| fakeRes-> browser-> render data on FrontEnd
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/68adf00ff669d6cb0a9de236',
        async route => {
            const response = await page.request.fetch(route.request());
            route.fulfill({
                response: response,
                body: JSON.stringify(fakePayload)
            });
        }
    );
    await page.locator("button[routerlink*='order']").click();
     // Wait for the request to be handled, or any other necessary step
    const msg = await page.locator(".mt-4").textContent();
    //You have No Orders to show at this time. Please Visit Back Us
    await expect(page.locator(".mt-4")).toContainText("You have No Orders to show at this time");
    // Clean up routes at the end of the test to prevent errors
    await page.unrouteAll({ behavior: 'ignoreErrors' });
});

test('Mocking Network 2 => Replacing Request', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await api_utils.getToken());

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    await page.locator("button[routerlink*='order']").click();

    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68c83659f669d6cb0acf1a4a", 
        async route =>{
            await route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68cff2abf669d6cb0ade15e0"});
        }
    )
    //altering request not response (before clicking button)
    await page.locator(".btn-primary").first().click();

    // Clean up routes at the end of the test to prevent errors
    await page.unrouteAll({ behavior: 'ignoreErrors' });
});
