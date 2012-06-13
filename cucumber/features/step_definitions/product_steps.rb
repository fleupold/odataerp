def example_products()
  [
    {"Name" => ["Hoger"],
      "Unit" => ["kg"],
      "Price" => ["10"]},
    {"Name" => ["Lotta"],
      "Unit" => ["ea"],
      "Price" => ["25"]},
    {"Name" => ["Inge"],
      "Unit" => ["set"],
      "Price" => ["30"]}
  ]
end

Given /^there is the example product$/ do
  product = [example_products()[0]]
  create_product_with_fixture product
end

Given /^there are the example products$/ do
  create_product_with_fixture example_products()
end

Then /^the system should have created the product "([^"]*)"$/ do |product_name|
  visit path_to("product overview")
  page.should have_content(product_name)
end

Then /^the system should not have created the product "([^"]*)"$/ do |product_name|
  visit path_to("product overview")
  page.should have_no_content(product_name)
end

Then /^the system should have updated the product "([^"]*)"$/ do |product_name|
  visit path_to("product overview")
  click_link(product_name)
  page.should have_content("20")
end

def create_product_with_fixture(products)
  products.each do |product|
    old_path = URI.parse(current_url).path
    step %{I am on the "create product" page}
    fill_in_fixture product
    step %{I press "Submit"}
    step %{I am on the home page}
    visit old_path
  end
end
