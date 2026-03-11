import {Locator, Page} from '@playwright/test'

export class RegistrationPage{

    private readonly nameTextbox: Locator
    private readonly lastNameTextbox: Locator
    private readonly ageTextbox: Locator
    private readonly countrySelect: Locator
    private readonly emailTextbox: Locator
    private readonly dateCheck: Locator
    private readonly pictureSetInputFile: Locator
    private readonly page: Page
    private readonly saveButton: Locator

    constructor (page: Page){
        this.nameTextbox = page.locator('id=name')
        this.lastNameTextbox = page.locator('id=last-name')
        this.ageTextbox = page.locator("//label[contains(text(),'Edad')]/following-sibling::input")
        this.countrySelect = page.locator('id=country')
        this.emailTextbox = page.locator('id=email')
        this.dateCheck = page.locator('id=monday')
        this.pictureSetInputFile = page.locator('id=picture')
        this.page = page
        this.saveButton = page.locator('id=save-btn')
    }

    
    private async fillName(name: string){
        await this.nameTextbox.fill(name)
    }

    private async fillLastName(lastName: string){
        await this.lastNameTextbox.fill(lastName)
    }

    private async fillAge(age: string){
        await this.ageTextbox.fill(age)
    }

    private async fillCountry(country: string){
        await this.countrySelect.selectOption(country)
    }

    private async fillSexOption(sex: string){
        await this.page.locator(`input[value='${sex}']`).check();
    }

    private async fillEmail(email: string){
        await this.emailTextbox.fill(email)
    }

    private async fillDate(date: string) {
       await this.page.locator(`#${date}`).check();
}

    private async fillPicture(picture: string){
        await this.pictureSetInputFile.setInputFiles(picture)
    }

    private async clickOnSaveButton(){
       await this.saveButton.click()
    }
    
    async doRegistration(name: string, lastName: string, age: string, country: string, sex: string, email: string, date: string, picture: string): Promise<Page>{
        await this.fillName(name)
        await this.fillLastName(lastName)
        await this.fillAge(age)
        await this.fillCountry(country)
        await this.fillSexOption(sex)
        await this.fillEmail(email)
        await this.fillDate(date)
        await this.fillPicture(picture)
        
        const [summaryPage] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.saveButton.click()
        ])

        await summaryPage.waitForLoadState();
        return summaryPage;
    }

}