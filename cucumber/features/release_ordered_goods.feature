@wip
Feature: Release Ordered Goods
  In order to mark a sales order to be ready for delivery
  As a Supply Planner
  I want to see all sales orders
  And release them if it is possible

Scenario: Release a sales order
  Given I am logged in as a "Supply Planner"
  And there are the example customers
  And there are the example products
  And there are the example sales orders
  And I am on the "release sales order" page
  And the sales order for "Progmod AG." has the status releasable
  When I check "choose"
  And I press "Release"
  Then the sales order for "Progmod AG." should have the status deliverable
