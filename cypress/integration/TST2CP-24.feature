@BDDSTORY-TST2CP-24
Feature: Test Client Connect Login
As an IB Customer User, I need to login to Client Connect Application so that I Can access Client Connect Dashboard.

Scenario : Valid Users Login Scenario
Given I'm on the Client Connect Login Page
When I enter User Valid Credentials
Then I Can access Client Connect Dashboard

Scenario : Invalid Users Login Scenario
Given I'm on the Client Connect Login Page
When I enter User In Valid Credentials
Then I see Invalid user error message


	@BDDTEST-TST2CP-26
	Scenario: Invalid Users Login Scenario
	
		Given I'm on the Client Connect Login Page
		When I enter User In Valid Credentials
		Then I see Invalid user error message

	@BDDTEST-TST2CP-25
	Scenario:  Valid Users Login Scenario
	
		Given I'm on the Client Connect Login Page
		When I enter User Valid Credentials
		Then I Can access Client Connect Dashboard

