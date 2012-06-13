@wip
Feature: Read Sales Order
  In order to check a sales order
  As a Sales Representative
  I want to view the sales order details

Scenario: Read details from a sales order
  Given I am logged in as a "Sales Representative"
  And there are the example customers
  And there are the example products
  And there is the example sales order
  And I am on the "sales order overview" page
  When I follow "1"
  Then I should see the following:
  | ID                      |           1 |
  | Customer                | Progmod AG. |
  | Product                 |       Hoger |
  | Quantity                |           3 |
  | Price                   |          30 |
  | Product                 |       Lotta |
  | Quantity                |           2 |
  | Price                   |          50 |
  | Priority                |        High |
  | Requested Delivery Date |  09.12.2012 |
  | Payment Terms           | 14 days net |
  | Discount                |          20 |
  | Shipping                |          10 |
  | Status                  | Deliverable |
