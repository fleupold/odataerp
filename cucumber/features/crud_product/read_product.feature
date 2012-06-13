@wip
Feature: Read Product
  In order to check an product
  As a Warehouse Manager
  I want to view the product details

Scenario: Read details from an product
  Given I am logged in as a "Warehouse Manager"
  And there is the example product
  And I am on the "product overview" page
  When I follow "Hoger"
  Then I should see the following:
  | Name          | Hoger |
  | Unit 	      | kg    |
  | Price         | 10    |
