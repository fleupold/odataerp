def example_sales_order()
  [
  {"Customer" => ["Progmod AG."],
    "Product1" => ["Hoger"],
    "Quantity1" => ["3"],
    "Product2" => ["Lotta"],
    "Quantity2" => ["2"],
    "Priority" => ["High"],
    "Requested Delivery Date" => ["09.12.2012"],
    "Payment Terms" => ["14 days net"],
    "Discount" => ["20"],
    "Shipping" => ["10"]},
    {"Customer" => ["Silverstar Corp."],
      "Product1" => ["Inge"],
      "Quantity1" => ["6"],
      "Product2" => ["Lotta"],
      "Quantity2" => ["9"],
      "Priority" => ["Normal"],
      "Requested Delivery Date" => ["07.04.2013"],
      "Payment Terms" => ["14 days net"],
      "Discount" => ["10"],
      "Shipping" => ["10"]},
    {"Customer" => ["Akima Ltd."],
      "Product1" => ["Inge"],
      "Quantity1" => ["6"],
      "Product2" => ["Hoger"],
      "Quantity2" => ["9"],
      "Priority" => ["Normal"],
      "Requested Delivery Date" => ["08.01.2013"],
      "Payment Terms" => ["14 days net"],
      "Discount" => ["10"],
      "Shipping" => ["10"]}
  ]
end

Given /^there is the example sales order$/ do
  sales_order = [example_sales_order()[0]]
  create_sales_order_with_fixture sales_order
end

Given /^there are the example sales orders$/ do
  create_sales_order_with_fixture example_sales_order()
end

Given /^the sales order for "([^"]*)" has the status releasable$/ do |customer_name|
  page.should have_content(customer_name)
  page.should have_content("releasable")
end

Given /^the sales order for "([^"]*)" has the status deliverable$/ do |customer_name|
  step %{I am on the "release sales order" page}
  step %{I check "choose"}
  step %{I press "Release"}
  step %{I am on the "post goods issue" page}
  page.should have_content(customer_name)
end

Given /^the sales order for "([^"]*)" has the status to be invoiced$/ do |customer_name|
  step %{the sales order for customer_name has the status deliverable}
  step %{I check choose}
  step %{I press "Post Goods Issue"}
  step %{I am on the "post customer invoice" page}
  page.should have_content(customer_name)
end

Then /^the sales order for "([^"]*)" should have the status to be invoiced$/ do |customer_name|
  step %{I am on the "post customer invoice" page}
  page.should have_content(customer_name)
end

Then /^the sales order for "([^"]*)" should have the status deliverable$/ do |customer_name|
  step %{I am on the "post goods issue" page}
  page.should have_content(customer_name)
end

Then /^the system should have created a sales order for "([^"]*)"$/ do |customer_name|
  visit path_to("sales order overview")
  page.should have_content(customer_name)
end

Then /^the system should not have created a sales order for "([^"]*)"$/ do |customer_name|
  visit path_to("sales order overview")
  page.should have_no_content(customer_name)
end

Then /^the system should have updated the sales order with "([^"]*)"$/ do |update|
  visit path_to("sales order overview")
  page.should have_content(update)
end

def create_sales_order_with_fixture(sales_orders)
  sales_orders.each do |sales_order|
    old_path = URI.parse(current_url).path
    step %{I am on the "create sales order" page}
    fill_in_fixture sales_order
    step %{I press "Submit"}
    step %{I am on the home page}
    visit old_path
  end
end
