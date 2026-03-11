import {test, expect} from '@playwright/test'
import { RegistrationPage } from '../../pageobjects/registration/RegistrationPage';


test('registration', async({page}) =>{
    const registrationPage = new RegistrationPage(page);
    await page.goto('http://127.0.0.1:5500/register.html')

    const name = 'JP';
    const lastName = 'R';
    const age = '47';
    const country = 'Argentina';
    const email = 'jp@gmail.com';
    const sex = 'M';
    const date = 'monday'; // O el valor que corresponda
    const picture = 'images/minion.jpg';

    const summaryPage = await registrationPage.doRegistration(
        name, lastName, age, country, sex, email, date, picture
    );
    
    const currentName = await summaryPage.locator("//strong[contains(.,'Nombre')]/ancestor::p").textContent()
    const currentLastName = await summaryPage.locator("//strong[contains(.,'Apellido')]/ancestor::p").textContent()
    const currentAge = await summaryPage.locator("//strong[contains(.,'Edad')]/ancestor::p").textContent()
    
    expect(currentName).toContain(name)
    expect(currentLastName).toContain(lastName)
    expect(currentAge).toContain(age)

})
