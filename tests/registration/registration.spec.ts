import {test, expect} from '@playwright/test'

test('registration', async({page}, testInfo) =>{
    await page.goto('http://127.0.0.1:5500/register.html')

    const name = 'JP'
    const lastName = 'R'
    const age = '47'
    const country = 'Argentina'
    const email = 'jp@gmail.com'
    const sex = 'M'

    await page.locator("id=name").fill(name)
    await page.locator("id=last-name").fill(lastName)
    await page.locator("xpath=//label[contains(text(),'Edad')]/following-sibling::input").fill(age)
    await page.locator("id=country").selectOption(country)
    await page.locator(`input[value='${sex}']`).check()
    await page.locator("id=email").fill(email)
    await page.locator("id=monday").check()
    await page.locator("id=picture").setInputFiles('images/minion.jpg')

    const [summaryPage] = await Promise.all(
        [
            page.waitForEvent('popup'),
            page.locator("id=save-btn").click()
        ]
    )
    
    await summaryPage.waitForLoadState()
    await expect(summaryPage).toHaveTitle('Summary')
    
    const currentName = await summaryPage.locator("//strong[contains(.,'Nombre')]/ancestor::p").textContent()
    const currentLastName = await summaryPage.locator("//strong[contains(.,'Apellido')]/ancestor::p").textContent()
    const currentAge = await summaryPage.locator("//strong[contains(.,'Edad')]/ancestor::p").textContent()
    
    expect(currentName).toContain(name)
    expect(currentLastName).toContain(lastName)
    expect(currentAge).toContain(age)

    /*await testInfo.attach('register2',{
        body: await summaryPage.screenshot(),
        contentType: 'imagen/png'
    })*/
    //await summaryPage.screenshot({path: 'screenshots/register2.png', fullPage: true})
    
    //await page.pause()


})

test('registration failure', async({page}, testInfo) =>{
    await page.goto('http://127.0.0.1:5500/register.html')

    const name = 'JP'
    const lastName = 'R'
    const age = '47'
    const country = 'Argentina'
    const email = 'jp@gmail.com'
    const sex = 'M'

    await page.locator("id=name").fill(name)
    
expect(true).toEqual(false)

})
