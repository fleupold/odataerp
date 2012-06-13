require 'capybara'
require 'capybara/cucumber'
require 'capybara/mechanize/cucumber'
Capybara.default_driver = :mechanize
Capybara.app_host = 'http://localhost:5279'
