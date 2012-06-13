@wip
Feature: Create Product
  In order to sell our products
  As a Warehouse Manager
  I want to create a new product

Background: 
  Given I am logged in as a "Warehouse Manager"
  And I am on the "product overview" page
  When I follow "New Product"
  Then I should be on the "create product" page  

Scenario: Enter an empty Name
  When I fill in the following:
  | Unit  | kg |
  | Price | 10 |
  And I press "Submit"
  Then I should see "Name cannot be empty"

Scenario: Enter an empty Unit type
  When I fill in the following:
  | Name  | Hoger |
  | Price |    10 |
  And I press "Submit"
  Then I should see "Unit cannot be empty"
  And the system should not have created the product "Hoger"

Scenario: Enter an empty Default price
  When I fill in the following:
  | Name | Hoger |
  | Unit | kg    |
  And I press "Submit"
  Then I should see "Price cannot be empty"
  And the system should not have created the product "Hoger"

Scenario: Enter an invalid Default price #1
  When I fill in the following:
  | Name  | Hoger |
  | Unit  | kg    |
  | Price | -10   |
  And I press "Submit"
  Then I should see "Price cannot be negative"
  And the system should not have created the product "Hoger"

Scenario: Create a new product
  When I fill in the following:
  | Name  | Hoger |
  | Unit  | kg    |
  | Price | 10    |
  And I press "Submit"
  Then the system should have created the product "Hoger"
