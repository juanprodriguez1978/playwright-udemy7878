import {test, expect} from '@playwright/test'
import {faker} from '@faker-js/faker'

test('create transactions', async({page}) => {

    await page.goto('http://127.0.0.1:5500/login.html')
    await page.waitForLoadState('load');


    await page.locator('input#username').fill('user')
    await page.locator('input#password').fill('pass')

    await page.locator('//button[@type=\'submit\']').click()

    for(let i=0; i<=3; i++){
        await page.waitForLoadState('load');
        await page.locator('//button[contains(text(), \'Añadir transacción\')]').click()
        await page.locator('id=date').fill('2023-12-31')
        await page.locator('id=amount').fill(faker.number.int({min: 100, max: 200}).toString())
        await page.locator('id=description').fill(faker.person.firstName())
        await page.locator("//button[contains(text(), 'Guardar')]").click()

    }

    //await page.pause()
    
})


test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');
  
  await page.getByLabel('Nombre de usuario:').fill('user');
  await page.getByLabel('Contraseña:').fill('pass');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.getByLabel('Fecha:').fill('2023-10-20');
  await page.getByLabel('Monto:').fill('400');
  await page.getByLabel('Descripción:').fill('foo');
  await page.getByRole('button', { name: 'Guardar' }).click();

  await page.getByRole('button', { name: 'Editar' }).click()
  
});