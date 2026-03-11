import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test('buying new products', async({page}) => {

    await page.goto('http://127.0.0.1:5500')
    await page.waitForLoadState('load');

    for(let i=0; i<=5; i++){
        await page.locator("//h5[text()='Producto 1']/following-sibling::button[contains(text(),'Añadir al carrito')]").click()
    }
    
    await page.locator("//h5[text()='Producto 2']/following-sibling::button[contains(text(),'Añadir al carrito')]").click()
    await page.locator("//h5[text()='Producto 3']/following-sibling::button[contains(text(),'Añadir al carrito')]").click()
    
    const product1PreTotal = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 1')]/ancestor::tr//td[4]").textContent()
    const product2PreTotal = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 2')]/ancestor::tr//td[4]").textContent()
    const product3PreTotal = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 3')]/ancestor::tr//td[4]").textContent()

    await page.locator("button#view-cart-btn").click()
 
    const product1Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 1')]/ancestor::tr//td[3]").textContent()
    const product2Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 2')]/ancestor::tr//td[3]").textContent()
    const product3Quantity = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 3')]/ancestor::tr//td[3]").textContent()
    const product1Total = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 1')]/ancestor::tr//td[4]").textContent()
    const product2Total = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 2')]/ancestor::tr//td[4]").textContent()
    const product3Total = await page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 3')]/ancestor::tr//td[4]").textContent()

    expect (product1Quantity).toEqual('6')
    expect (product2Quantity).toEqual('1')
    expect (product3Quantity).toEqual('1')

    expect (product1PreTotal).toEqual(product1Total)
    expect (product2PreTotal).toEqual(product2Total)
    expect (product3PreTotal).toEqual(product3Total)

    await page.locator("id=checkout-btn").click()

    await page.locator("id=name").fill(faker.person.fullName())
    await page.locator("id=email").fill(faker.internet.email())
    await page.locator("id=address").fill(faker.location.streetAddress())

    await page.locator('//a[@href="#paymentInfo"]').click()
    await page.locator("id=card-number").fill(faker.finance.creditCardNumber())
    await page.locator("id=card-expiry").fill('12-2027')
    await page.locator("id=card-cvc").fill(faker.finance.creditCardCVV())

    await page.locator("id=place-order-btn").click()

    expect(page.locator("//h4[contains(.,'¡Tu compra fue exitosa!')]")).toBeVisible()

    }
)
