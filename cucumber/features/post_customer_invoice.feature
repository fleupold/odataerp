@wip
Feature: Post Customer Invoice
  In order to receive money for the goods
  As a Financial Accountant
  I want to send an invoice to the customer

Scenario: Post a customer invoice
  Given I am logged in as a "Financial Accountant"
  And there are the example customers
  And there are the example products
  And there is the example sales order
  And I am on the "post customer invoice" page
  And the sales order for "Progmod AG." has the status to be invoiced
  When I check "choose"
  And I press "Invoice"
  Then the sales order for "Progmod AG." should have the status invoiced
