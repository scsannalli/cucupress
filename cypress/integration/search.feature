Feature: The Spree Search
I search for spree products and get product results
  
  @focus
  Scenario: Search spree products
    Given I open spree page
    When I enter "product" in the search field
    Then I see product search results 
    
