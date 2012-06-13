@wip
Feature: Update Customer
  In order to update the customer details
  As a Sales Representative
  I want to be able to change the customer details

Scenario: Change customer details
  Given I am logged in as a "Sales Representative"
  And there is the example customer
  And I am on the "customer overview" page
  When I follow "Update"
  Then I should be on the "update customer" page
  When I fill in the following:
  | Street        | Großbeerenstraße |
  | Street number |               47 |
  And I press "Submit"
  Then the system should have updated the customer "Progmod AG." with "Großbeerenstraße"
  And the system should have updated the customer "Progmod AG." with "47"
  
