import { Locator, Page } from "@playwright/test"


export class ShoppingCartPage{

    private readonly  product1AddButton: Locator
    private readonly  product2AddButton: Locator
    private readonly  product3AddButton: Locator
    private readonly  viewCartButton: Locator

    private readonly  product1Qty: Locator
    private readonly  product2Qty: Locator
    private readonly  product3Qty: Locator
    private readonly  product1Total: Locator
    private readonly  product2Total: Locator
    private readonly  product3Total: Locator
        
    page: Page

    constructor(page: Page) {
        this.page = page;
        this.product1AddButton = page.locator('button.add-to-cart[data-id="1"]')
        this.product2AddButton = page.locator('button.add-to-cart[data-id="2"]')
        this.product3AddButton = page.locator('button.add-to-cart[data-id="3"]')
        this.viewCartButton = page.locator("button#view-cart-btn")

        this.product1Qty = page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 1')]/ancestor::tr//td[3]")
        this.product2Qty = page.locator('#cart-items tr').filter({ hasText: 'Producto 2' }).locator('td').nth(2);
        this.product3Qty = page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 3')]/ancestor::tr//td[3]")

        this.product1Total = page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 1')]/ancestor::tr//td[4]")
        this.product2Total = page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 2')]/ancestor::tr//td[4]")
        this.product3Total = page.locator("//tbody[@id='cart-items']//td[contains(.,'Producto 3')]/ancestor::tr//td[4]")
                
    }

    async addProduct1ToCart() {
        await this.product1AddButton.click()
    }

    async addProduct2ToCart() {
        await this.product2AddButton.click()
    }

    async addProduct3ToCart() {
        await this.product3AddButton.click()
    }

    async openCart() {
        await this.viewCartButton.click()
    }

    async getProduct1Quantity() { 
        return await this.product1Qty.textContent(); 
    }

    async getProduct2Quantity() {
        return await this.product2Qty.textContent();
    }

    async getProduct3Quantity() {
        return await this.product3Qty.textContent(); 
    }
    
    async getProduct1Total() { 
        return await this.product1Total.textContent(); 
    }   

}