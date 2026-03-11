import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'
import { ShoppingCartPage } from '../../pageobjects/shopping-cart/ShoppingCartPage';

test('buying new products', async({page}) => {

    
    const shoppingCart = new ShoppingCartPage(page);
    
    await page.goto('http://127.0.0.1:5500')
    await page.waitForLoadState('load');

    for(let i=0; i<4; i++){
        await page.waitForLoadState('load');
        await shoppingCart.addProduct1ToCart();
        await shoppingCart.addProduct2ToCart();
        await shoppingCart.addProduct3ToCart();
    }
        
    await shoppingCart.openCart();

    const p1Qty = await shoppingCart.getProduct1Quantity();
    const p2Qty = await shoppingCart.getProduct2Quantity();
    const p3Qty = await shoppingCart.getProduct3Quantity();
    const p1Total = await shoppingCart.getProduct1Total();

    expect(p1Qty).toBe('4');
    expect(p2Qty).toBe('4');
    expect(p3Qty).toBe('4');

    expect(p1Total).toBe('$40.00');    
    
    await page.locator("id=checkout-btn").click()

    await page.locator("id=name").fill(faker.person.fullName())
    await page.locator("id=email").fill(faker.internet.email())
    await page.locator("id=address").fill(faker.location.streetAddress())

    await page.getByRole('link', { name: 'Información de Pago' }).click();
    const cardNumberInput = page.locator("id=card-number");
    await cardNumberInput.waitFor({ state: 'visible' });
    await page.locator("id=card-number").fill(faker.finance.creditCardNumber())
    await page.locator("id=card-expiry").fill('12-2027')
    await page.locator("id=card-cvc").fill(faker.finance.creditCardCVV())

    await page.locator("id=place-order-btn").click()
    await expect(page.locator("//h4[contains(.,'¡Tu compra fue exitosa!')]")).toBeVisible()

    }
)
