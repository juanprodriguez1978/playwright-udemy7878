SIEMPRE COMMAND PROMPT

Ejecutar todos los test
npx playwright test

Ejecutar solo un test
npx playwright test registration.spec.ts --grep "registrati"

Ejecutar los test de un archivo
npx playwright test registration.spec.ts

Ejecutar un test pasandole la linea en la que esta
npx playwright test registration.spec.ts:3

npx playwright test registration.spec.ts --grep "registration failure" --headed --project chromium
npx playwright test shopping-cart.spec.ts --headed

Mostrar el reporte
npx playwright show-report


npx playwright codegen http://127.0.0.1:5500/login.html

await page.pause();

await page.waitForLoadState('load');