import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductsPage } from './ProductsPage';

export class LoginPage extends BasePage{

    private readonly email: Locator;
    private readonly pass: Locator;
    private readonly loginBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.email = page.locator("#userEmail");
        this.pass = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
    }

    async validLogin(mail: string, pass: string) {
        await this.email.fill(mail);
        await this.pass.fill(pass);
    }

    async goTo() { this.page.goto("https://rahulshettyacademy.com/client/#/auth/login"); }

    async enterMail(mail: string) { await this.email.fill(mail); }

    async enterPass(pass: string) { await this.pass.fill(pass); }

    async login() { 
        await this.loginBtn.click();
        console.log(await this.getToastMessage());
        return new ProductsPage(this.page); 
    }

}

