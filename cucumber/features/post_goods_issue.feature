@wip
Feature: Post Goods Issue
  In order to update stock values automatically
  As a Warehouse Manager
  I want to see all deliverable sales orders
  And post a goods issue for them

Scenario: Post a goods issue
  Given I am logged in as a "Warehouse Manager"
  And there are the example customers
  And there are the example products
  And there is the example sales order
  And I am on the "post goods issue" page
  And the sales order for "Progmod AG." has the status deliverable
  When I check "choose"
  And I press "Post Goods Issue"
  Then the sales order for "Progmod AG." should have the status to be invoiced
