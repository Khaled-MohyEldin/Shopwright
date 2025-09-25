import { Locator, Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class OrdersPage extends BasePage{
    private readonly table: Locator;
    private readonly ids: Locator;
    private readonly viewBtn: Locator;
    private readonly loader: Locator;
    private readonly country: Locator;

    constructor(page: Page) {
        super(page);
        this.table = page.locator(".table").first();
        this.ids = page.locator("tbody th");
        this.viewBtn = page.locator("td .btn-primary").first();
        this.loader = page.locator(".tagline");
        this.country = page.locator(".address .text").last();
    }

    async waitToLoad(){
        //wait for table to load 
        await this.table.waitFor({ state: 'visible' });    
    }

    async getOrdersIds(){
        await this.table.waitFor({ state: 'visible' });
        return await this.ids.allTextContents();
    }

    async prodView(){
        await this.viewBtn.click();
        //wait to load
        await this.loader.textContent();
    }

    async getCountry(){
        const msg = await this.country.textContent();
        return msg?.split("-")[1].trim();
    }

}
