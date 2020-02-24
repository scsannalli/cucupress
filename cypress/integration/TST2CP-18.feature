@BDDSTORY-TST2CP-18
Feature: Test Login
Login Story for Client Connect


	@BDDTEST-TST2CP-20
	Scenario: Test Login With Invalid Credentials
	
		Given I open home page
		When Click Login link
		Then I see UserName Field

	@BDDTEST-TST2CP-19
	Scenario: Test Login With Valid Credentials
	
		Given I open home page
		When Click Login link
		Then I see UserName Field

