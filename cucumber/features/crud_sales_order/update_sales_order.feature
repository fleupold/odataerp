@wip
Feature: Update Sales Order
  In order to update the sales order details
  As a Sales Representative
  I want to be able to change the sales order detials

Scenario: Change sales order details
  Given I am logged in as a "Sales Representative"
  And there are the example customers
  And there are the example products
  And there is the example sales order
  And I am on the "sales order overview" page
  When I follow "Update"
  Then I should be on the "update sales order" page
  When I fill in the following:
  | Requested Delivery Date | 19.12.2012 |
  And I press "Submit"
  Then the system should have updated the sales order with "19.12.2012"
