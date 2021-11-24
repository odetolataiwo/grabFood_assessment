describe('API Testing and save as json data', () => {  

    var baseURL = "https://food.grab.com/ph/en/"
   
    before("go to the site and put in a location", () => {

        cy.visit("https://food.grab.com/ph/en/")
        cy.xpath("//input[@id='location-input']").clear().type("manila bay").type('{enter}')
        cy.xpath("//div[@class='searchContainer___3M35s']/button[@type='button']").click()
        cy.wait(20000)
        cy.xpath("//span[text()='Load More']").scrollIntoView().click({force: true})

        cy.intercept('POST', 'https://portal.grab.com/foodweb/v2/search').as("results")

    });
   
    it('Write to a json file', () => {
        cy.get('@results').then((response) => {
            var someArr = new Array();
            someArr = response.body;
            cy.writeFile('cypress/fixtures/testdata.json', someArr);
        })
    });
   
});




{ restuarantName: name, longitude: long, longitude: lat }