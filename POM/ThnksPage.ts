import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { OrdersPage } from './OrdersPage';

export class ThnksPage extends BasePage{
    private readonly msg: Locator;
    private readonly ids: Locator;
    private readonly ordersBtn: Locator;
    // private readonly placeBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.msg = page.locator(".hero-primary");
        this.ids = page.locator('.em-spacer-1 .ng-star-inserted');
        this.ordersBtn =  page.locator("button[routerlink*='order']");
        // this.countryField = page.locator("[placeholder*='Select Country']");
    }

    async waitToLoad() {
        await this.msg.waitFor({ state: 'visible' });
        return await this.msg.textContent();
    }

    async getIDs() {
        const ids = await this.ids.allTextContents();
        let newIds: string[] = [];
        for (const id of ids) {
            newIds.push(id.replaceAll("|", "").trim());}
        return newIds; 
    }

    async goToOrders(){
        this.ordersBtn.click();
        return new OrdersPage(this.page);
    }


}

