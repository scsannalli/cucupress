@BDDSTORY-TST2CP-3
Feature: Test Feature

	@BDDTEST-TST2CP-5
	Scenario: Test Invalid Login
	
		Given I open home page
		When Click Login link
		Then I see UserName Field

	@BDDTEST-TST2CP-4
	Scenario: Test Valid Login
	
		Given I open home page
		When Click Login link
		Then I see UserName Field

