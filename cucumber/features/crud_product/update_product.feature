@wip
Feature: Update Product
  In order to update products details
  As a Warehouse Manager
  I want to be able to change the product details

Scenario: Change product details
  Given I am logged in as a "Warehouse Manager"
  And there is the example product
  And I am on the "product overview" page
  When I follow "Update"
  Then I should be on the "update product" page
  When I fill in the following:
  | Price | 20 |
  And I press "Submit"
  Then the system should have updated the product "Hoger"
