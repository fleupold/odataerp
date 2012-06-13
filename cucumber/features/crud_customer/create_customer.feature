@wip
Feature: Create Customer
  In order to sell our products
  As a Sales Representative
  I want to create a new customer

Background:
  Given I am logged in as a "Sales Representative"
  And I am on the "customer overview" page
  When I follow "New Customer"
  Then I should be on the "create customer" page        

Scenario: Enter invalid E-Mail
  When I fill in the following: 
  | Name          | Progmod AG.       |
  | Street        | Stahnsdorfer Str. |
  | Street number | 54                |
  | Postcode      | 14482             |
  | City          | Potsdam           |
  | Firstname     | Jürgen            |
  | Lastname      | Müller            |
  | Phone         | 01783988649       |
  | E-Mail        | jmueller12345     |
  And I press "Submit"
  Then I should see "Please type your e-mail address in the format yourname@example.com."
  And the system should not have created the customer "Progmod AG."

Scenario: Create a new customer
  When I fill in the following:
  | Name          | Progmod AG.          |
  | Street        | Stahnsdorfer Str.    |
  | Street number | 54                   |
  | Postcode      | 14482                |
  | City          | Potsdam              |
  | Firstname     | Jürgen               |
  | Lastname      | Müller               |
  | Phone         | 01783988649          |
  | E-Mail        | jmueller@progmod.com |
  And I press "Submit"
  Then the system should have created the customer "Progmod AG."
