@wip
Feature: Read Customer
  In order to check a customer
  As a Sales Representative
  I want to view the customer details

Scenario: Read details from a customer
  Given I am logged in as a "Sales Representative"
  And there is the example customer
  And I am on the "customer overview" page
  When I follow "Progmod AG."
  Then I should see the following:
  | Name          | Progmod AG.          |
  | Street        | Stahnsdorfer Str.    |
  | Street number | 54                   |
  | Postcode      | 14482                |
  | City          | Potsdam              |
  | Firstname     | Jürgen               |
  | Lastname      | Müller               |
  | Phone         | 01783988649          |
  | E-Mail        | jmueller@progmod.com |
