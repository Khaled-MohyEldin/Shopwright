import { Locator, Page, expect } from '@playwright/test';
import { PayPage } from './PayPage';

export class CartPage {
    private page: Page;
    private readonly chckoutList: Locator;
    private readonly deleteBtn: Locator;
    private readonly checkBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deleteBtn = page.locator(".btn-danger");
        this.checkBtn = page.locator(".subtotal .btn-primary");
        this.chckoutList = page.locator('.cart .items h3');
    }

    async waitToLoad() {
        await this.deleteBtn.first().waitFor({ state: 'visible' });
    }

    async validateList(items: string[]) {
        //check count of items in cart 
        await expect(this.deleteBtn).toHaveCount(items.length);
        //check names of items in cart
        const list = await this.chckoutList.allTextContents();
        //getting list of items 
        // for (const product of list) {
        //     for (const srch of items) {
        //         if (product?.includes(srch)) {
        //             items = items.filter(s => !s.includes(srch));
        //             console.log("Items => ", items);
        //             break;
        //         }
        //     }
        // }
        const filteredItems = items.filter(srch =>
            !list.some(product => product?.includes(srch))
        );
        return filteredItems;
    }

    async checkout() {
        this.checkBtn.click();
        return new PayPage(this.page);
    }


}

/*
    await page.locator(".btn-danger").first().waitFor({ state: 'visible' });
    await expect(page.locator(".btn-danger")).toHaveCount(3);

    const chckoutList = await page.locator('.cart .items h3').allTextContents();
    //getting list of items 
    for (const product of chckoutList) {
        for (const srch of searchItems) {
            if (product?.includes(srch)) {
                searchItems = searchItems.filter(s => !s.includes(srch));
                console.log("Items => ", searchItems);
                break;
            }
        }
    }
    // all items that we ordered are in cart 
    console.log("final list length =>", searchItems.length)
    expect(searchItems.length).toBe(0);
    
    await page.locator(".subtotal .btn-primary").click();

    await page.locator(".subtotal .btn-primary").click();
*/