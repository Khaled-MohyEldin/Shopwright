import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPage } from './CartPage';

export class ProductsPage extends BasePage {
    private readonly productsList: Locator;
    private readonly cartBtn: Locator;
    

    constructor(page: Page) {
        super(page);
        this.productsList = page.locator(".card-body");
        this.cartBtn = page.locator("[routerlink*='cart']");
    }

    async waitToLoad() {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('.container').waitFor({ state: 'visible' });
    }

    async addItemstoCart(items: string[]) {
        for (let i = 0; i < await this.productsList.count(); i++) {
            const element = this.productsList.nth(i);
            const name = await element.locator('b').textContent();
            for (const item of items) {
                if (name?.includes(item)) {
                    await element.locator('button.btn').last().waitFor({ state: 'visible' });
                    await element.locator('button.btn').last().click();
                    const msg = await this.getToastMessage(); 
                    expect(msg?.includes("Product Added To Cart")).toBeTruthy();
                    break; // break inner loop once clicked
                }
            }
        }
    }

    async goToCart() {
        await Promise.all([
            this.cartBtn.click(),
            this.page.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/cart')
        ]);
        return new CartPage(this.page);
    }

}
