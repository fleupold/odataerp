@wip
Feature: Create Sales Order
  In order to deliver goods
  As a Sales Representative
  I want to enter details about the order

Background:
  Given I am logged in as a "Sales Representative"
  And I am on the "create sales order" page
  And there are the example products
  And there are the example customers

Scenario: Try to create a sales order without products
  When I fill in the following:
  | Customer            (select) | Progmod AG. |
  | Priority            (select) | Normal      |
  | Discount                     | 20          |
  | Shipping                     | 20          |
  | Payment Terms      (select)  | 14 days net |
  | Requested Delivery Date      | 02.11.2015  |
  And I press "Submit"
  Then I should see "Product cannot be empty"
  And the system should not have created a sales order for "Progmod AG."

Scenario: Try to create a sales order with a too high discount
  When I fill in the following:
  | Customer            (select) | Progmod AG. |
  | Priority            (select) | Normal      |
  | Product1            (select) | Hoger       |
  | Quantity1                    | 3           |
  | Discount                     | 150         |
  | Shipping                     | 20          |
  | Payment Terms      (select)  | 14 days net |
  | Requested Delivery Date      | 02.11.2015  |
  And I press "Submit"
  Then I should see "Discount must be between 0-100"
  Then the system should not have created a sales order for "Progmod AG."

Scenario: Try to create a sales order with a too low discount
  When I fill in the following:
  | Customer            (select) | Progmod AG. |
  | Priority            (select) |      Normal |
  | Product1            (select) |       Hoger |
  | Quantity1                    |           3 |
  | Discount                     |        -150 |
  | Shipping                     |          20 |
  | Payment Terms      (select)  | 14 days net |
  | Requested Delivery Date      |  02.11.2015 |
  And I press "Submit"
  Then I should see "Discount must be between 0-100"
  Then the system should not have created a sales order for "Progmod AG."

Scenario: Create a sales order
  When I fill in the following:
  | Customer            (select) | Progmod AG. |
  | Priority            (select) | Normal      |
  | Product1            (select) | Hoger       |
  | Quantity1                    | 3           |
  | Discount                     | 20          |
  | Shipping                     | 20          |
  | Payment Terms      (select)  | 14 days net |
  | Requested Delivery Date      | 02.11.2015  |
  And I press "Submit"
  Then the system should have created a sales order for "Progmod AG."

Scenario: Give discount on total product net value
  When I fill in the following:
  | Product1   (select) | Lotta |
  | Quantity1           |     2 |
  And I press "Add Product"
  And I fill in the following:
  | Product2   (select) | Inge |
  | Quantity2           |    5 |
  Then the "Total Net Value" field should contain "200.00"
  When I fill in "Discount" with "10"
  Then the "Total" field should contain "234.20"
