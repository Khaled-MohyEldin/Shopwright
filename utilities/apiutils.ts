import { test, expect, Locator, request, APIRequestContext } from '@playwright/test';
const order_payload = { "orders": [{ "country": "Egypt", "productOrderedId": "68a961719320a140fe1ca57c" }] };

export class APIUtils {

    private context: APIRequestContext;
    private login_payload: object;
    private base_url = "https://rahulshettyacademy.com/api/ecom";

    constructor(context: APIRequestContext, payload: object) {
        this.context = context;
        this.login_payload = payload;
    }

    async getToken() {
        const login_payload = { "userEmail": "one@two.com", "userPassword": "1&twoThree" };
        // const api_context = await request.newContext();
        const login_res = await this.context.post(`${this.base_url}/auth/login`,
            { data: this.login_payload });
        const res = await login_res.json();
        return res.token;
    }


    async createOrder(payload: object) {
        const order_payload = { "orders": [{ "country": "Egypt", "productOrderedId": "68a961719320a140fe1ca57c" }] };
        const order_res = await this.context.post(`${this.base_url}/order/create-order`,
            { headers: { "Authorization": await this.getToken() }, data: payload }
        )
        const res_order = await order_res.json();
        return res_order.orders[0]; //order ID 
    }

    async safeClick(loc: Locator) {
        await loc.waitFor({ state: 'visible' });
        await loc.click();
    }

    checkSorting(items: string[]){
        
    }

}
