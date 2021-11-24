/// <reference types="Cypress" />
/// <reference types="cypress-xpath" /> 

describe('Auth', () => {
    it("try", () =>{
        cy.visit("https://food.grab.com/ph/en/")
        cy.xpath("//input[@id='location-input']").clear().type("manila bay").type('{enter}')
        cy.xpath("//div[@class='searchContainer___3M35s']/button[@type='button']").click()
        

        
        for (let j =0; j < 12; j++) {
            cy.wait(10000)
            cy.xpath("//span[text()='Load More']").scrollIntoView().click({force: true})
        
            cy.intercept('POST', '/foodweb/v2/search').as("searchResults")
        
            cy.wait('@searchResults').its('response.statusCode').should('eq', 200)
        

            cy.get("@searchResults").should(resp =>{
                cy.log(resp)

                for (let i = 0; i < 8; i++) {
                    let arr = resp.response.body.searchResult.searchMerchants[i].chainName
                    let arr1 = resp.response.body.searchResult.searchMerchants[i].latlng
                    cy.writeFile('cypress/fixtures/restuarants.json', { name: arr, coordinates: arr1 }, { flag: 'a+' })
                }  
            })  
            
        }
            
    })
})