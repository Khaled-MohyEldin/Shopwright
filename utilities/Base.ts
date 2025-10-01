import {test as base} from '@playwright/test'

import {BasePage, LoginPage, OrdersPage, PayPage, ProductsPage, ThnksPage} from '../POM'; 
// import * as POM from '../POM';
import { CartPage } from '../POM/CartPage';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

type pages = {
    loginPage: LoginPage;
    payPage: PayPage;
    prodPage: ProductsPage;
    basePage: BasePage;
    cartPage: CartPage; 
    orderPage: OrdersPage;
    thnksPage: ThnksPage;
}

export const test = base.extend<pages>({
    loginPage: async ({page},use)=>{
        await use(new LoginPage(page))
    },
    payPage: async ({page},use)=>{
        await use(new PayPage(page))
    },
    prodPage: async ({page},use)=>{
        await use(new ProductsPage(page))
    },
    basePage: async ({page},use)=>{
        await use(new BasePage(page))
    },
    cartPage: async ({page},use)=>{
        await use(new CartPage(page))
    },
    orderPage: async ({page},use)=>{
        await use(new OrdersPage(page))
    },
    thnksPage: async ({page},use)=>{
        await use(new ThnksPage(page))
    }

})

export function processJson() {
    dotenv.config({ path: path.resolve(".env") });
    let rawdata = fs.readFileSync(path.resolve("test-data", 'placeOrder.json'), 'utf-8');
    let testData = JSON.parse(rawdata);

    // Recursive function to inject env variables
    function injectEnv(value: any): any {
        if (typeof value === 'string') {
            return value.replace(/\$\{(\w+)\}/g, (_, key) => process.env[key] || '');
        } else if (Array.isArray(value)) {
            return value.map(injectEnv);
        } else if (typeof value === 'object' && value !== null) {
            const result: any = {};
            for (const [k, v] of Object.entries(value)) {
                result[k] = injectEnv(v);
            }
            return result;
        }
        return value;
    }

    return injectEnv(testData);    
}