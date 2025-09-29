import {test as base} from '@playwright/test'

import {BasePage, LoginPage, OrdersPage, PayPage, ProductsPage, ThnksPage} from '../POM'; 
// import * as POM from '../POM';
import { CartPage } from '../POM/CartPage';


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