import { test, expect } from '@playwright/test';
import { LoginPage, BasePage } from '../POM';
import { processJson } from '../utilities/Base';



//process JSON Data + .env Variables
let resolvedData = processJson();

//Standard Fleunt POM , full DataDriven 

for (const dataSet of resolvedData) {

test(`end to end test for ${dataSet.email}`, async ({ page }) => {
    //=============== Test Data ===================
    const mail1: string = dataSet.email;
    const pass: string = dataSet.pass;
    const country: string = dataSet.country;
    let searchItems: string[] = dataSet.products;
    
    //=============== Login Page ===================
    //enter credentials and click login
    const BaseP = new BasePage(page);
    const loginP = new LoginPage(page);
    await loginP.goTo();
    await loginP.validLogin(mail1, pass);
    const prodP = await loginP.login();
    
    //================== Products Page ================
    await prodP.waitToLoad();
    await prodP.addItemstoCart(searchItems);
    const cartP = await prodP.goToCart();

    //================== Cart Page ================
    await cartP.waitToLoad();
    //Validate that all items that we ordered are in cart 
    searchItems = await cartP.validateList(searchItems);
    console.log("final list length =>", searchItems.length)
    expect(searchItems.length).toBe(0);

    const payP = await cartP.checkout();

    //================== PayPage ================
    //check email is same as we enterd before
    const mail2 = await payP.getMail();
    expect(mail2 === mail1).toBeTruthy();

    //Placing order without selecting country check
    await payP.placeOrder();
    const toastmsg = await BaseP.getToastMessage();
    //check toast msg #toast-container => "Please Enter Full Shipping Information"
    expect(toastmsg?.includes("Please Enter Full Shipping Information")).toBeTruthy();

    const country1 = await payP.selectCountry(country);
    const thnkP = await payP.placeOrder(); //Placing order

    //================== Thanks Page ================
    //wait for next page to load 
    const message = await thnkP.waitToLoad();

    //Validating success msg
    expect(message?.includes("Thankyou for the order")).toBeTruthy();

    //get products ids into array 
    let newIds = await thnkP.getIDs();
    //go to orders page
    const ordersP = await thnkP.goToOrders();

    //================== orders Page ================
    //wait to load table inside page
    await ordersP.waitToLoad();
    const idsList = await ordersP.getOrdersIds();
 
    const filteredItems = newIds.filter(newid =>
        !idsList.some(s => s?.includes(newid))
    );
    //check orders are there in orders page 
    expect(filteredItems.length).toBe(0);

    await ordersP.prodView();
    const country2 = await ordersP.getCountry();
    //check country same as entered before
    expect(country1 === country2).toBeTruthy();
    /* */
});

}