Feature: The Spree Login
  I want to open network page
  
  @focus
  Scenario: Opening Spree Login
    Given I open spree page
    When Click Login link
    Then I see UserName Field