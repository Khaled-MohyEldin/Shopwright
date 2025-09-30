import { expect } from '@playwright/test';
import { test } from '../utilities/Base';
import testData from '../test-data/placeOrder.json';

/*
this also end to end test but there are two main differences 
    1- pages are implemented through custom features from Base.ts in Utilities
    2- it's DataDriven but with much more control to test certain data only 
        or to skip others and the sky here is the limit 
*/

for (const dataSet of testData) { 

const runner = dataSet.email === "one@two.com"? test.only : test; //test only this data
// const runner = dataSet.email === "one@two.com"? test.skip : test; //test all data except this one 

runner(`end to end test for ${dataSet.email}`, 
    async ({loginPage, prodPage, payPage, basePage, orderPage, cartPage, thnksPage }) => {
    //=============== Test Data ===================
    const mail1: string = dataSet.email;
    const pass: string = dataSet.pass;
    const country: string = dataSet.country;
    let searchItems: string[] = dataSet.products;

    //=============== Login Page ===================
    //enter credentials and click login
    await loginPage.goTo();
    await loginPage.validLogin(mail1, pass);
    await loginPage.login();
    //================== Products Page ================
    await prodPage.waitToLoad();
    await prodPage.addItemstoCart(searchItems);
    await prodPage.goToCart();

    //================== Cart Page ================
    await cartPage.waitToLoad();
    //Validate that all items that we ordered are in cart 
    searchItems = await cartPage.validateList(searchItems);
    console.log("final list length =>", searchItems.length)
    expect(searchItems.length).toBe(0);
    await cartPage.checkout();

    //================== PayPage ================
    //check email is same as we enterd before
    const mail2 = await payPage.getMail();
    expect(mail2 === mail1).toBeTruthy();

    //Placing order without selecting country check
    await payPage.placeOrder();
    const toastmsg = await basePage.getToastMessage();
    //check toast msg #toast-container => "Please Enter Full Shipping Information"
    expect(toastmsg?.includes("Please Enter Full Shipping Information")).toBeTruthy();

    const country1 = await payPage.selectCountry(country);
    await payPage.placeOrder(); //Placing order

    //================== Thanks Page ================
    //wait for next page to load 
    const message = await thnksPage.waitToLoad();

    //Validating success msg
    expect(message?.includes("Thankyou for the order")).toBeTruthy();

    //get products ids into array 
    let newIds = await thnksPage.getIDs();
    //go to orders page
    await thnksPage.goToOrders();

    //================== orders Page ================
    //wait to load table inside page
    await orderPage.waitToLoad();
    const idsList = await orderPage.getOrdersIds();
 
    const filteredItems = newIds.filter(newid =>
        !idsList.some(s => s?.includes(newid))
    );
    //check orders are there in orders page 
    expect(filteredItems.length).toBe(0);

    await orderPage.prodView();
    const country2 = await orderPage.getCountry();
    //check country same as entered before
    expect(country1 === country2).toBeTruthy();
    console.log("Finish Line");
    /* */
});
}