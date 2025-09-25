import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  private readonly  toast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toast = page.locator('#toast-container');
  }

  async isToastVisible() {
    return await this.toast.isVisible();
  }

  async getToastMessage() {
    await this.toast.waitFor({state: 'visible'});
    return await this.toast.textContent();
  }


}
