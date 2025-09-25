import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage.ts';
import { ThnksPage } from './ThnksPage.ts';

export class PayPage extends BasePage{
    
    private readonly countryField: Locator;
    private readonly countryBtn: Locator;
    private readonly mail: Locator;
    private readonly placeBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.mail = page.locator('input[type="text"]').nth(4);
        this.placeBtn = page.locator(".actions .btnn");
        this.countryBtn =  page.locator(".ng-star-inserted .fa-search").first();
        this.countryField = page.locator("[placeholder*='Select Country']");
    }

    async getMail() { return await this.mail.inputValue() }

    async placeOrder() { 
        await this.placeBtn.waitFor({state: 'visible'});
        await this.placeBtn.click();
        return new ThnksPage(this.page);
    }

    async selectCountry(country: string) {
        await this.countryField.pressSequentially(country);
        //select country from list
        await this.countryBtn.click();
        //get country after selecting it 
        return await this.countryField.inputValue();
    }

}
