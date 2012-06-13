# -*- coding: utf-8 -*-
def example_customers()
  [
    {"Name" => ["Progmod AG."],
      "Street" => ["Stahnsdorfer Str."],
      "Street number" => ["54"],
      "Postcode" => ["14482"],
      "City" => ["Potsdam"],
      "Firstname" => ["Jürgen"],
      "Lastname" => ["Müller"],
      "Phone" => ["01783988649"],
      "E-Mail" => ["jmueller@progmod.com"]},
    {"Name" => ["Silverstar Corp."],
      "Street" => ["Vanderbilt Avenue"],
      "Street number" => ["10"],
      "Postcode" => ["10017"],
      "City" => ["New York"],
      "Firstname" => ["Max"],
      "Lastname" => ["Walldorf"],
      "Phone" => ["84242498226"],
      "E-Mail" => ["mwalldorf@silverstar.com"]},
    {"Name" => ["Akima Ltd."],
      "Street" => ["Lombard St"],
      "Street number" => ["34"],
      "Postcode" => ["EC3V"],
      "City" => ["London"],
      "Firstname" => ["Erika"],
      "Lastname" => ["Rhodes"],
      "Phone" => ["93835520399"],
      "E-Mail" => ["erhodes@akima.com"]}
    ]
end

Then /^the system should have created the customer "([^"]*)"$/ do |customer_name|
  visit path_to("customer overview")
  page.should have_content(customer_name)
end

Then /^the system should not have created the customer "([^"]*)"$/ do |customer_name|
  visit path_to("customer overview")
  page.should have_no_content(customer_name)
end

Then /^the system should have updated the customer "([^"]*)" with "([^"]*)"$/ do |customer_name, value|
  visit path_to("customer overview")
  click_link(customer_name)
  page.should have_content(value)
end

Given /^there is the example customer$/ do
  customer = [example_customers()[0]]
  create_customer_with_fixture customer
end

Given /^there are the example customers$/ do
  create_customer_with_fixture example_customers()
end

def create_customer_with_fixture(fixture)
  fixture.each do |customer|
    old_path = URI.parse(current_url).path
    step %{I am on the "create customer" page}
    fill_in_fixture customer
    step %{I press "Submit"}
    step %{I am on the home page}
    visit old_path
  end
end
