module NavigationHelpers
  # Maps a name to a path. Used by the
  #
  #   When /^I go to (.+)$/ do |page_name|
  #
  # step definition in web_steps.rb
  #
  def path_to(page_name)
    case page_name

    # Add more mappings here.
    # Here is an example that pulls values out of the Regexp:
    #
    #   when /^(.*)'s profile page$/i
    #     user_profile_path(User.find_by_login($1))
    # Add more page name => path mappings here

    when /the home\s?page/
      '/'
     when /the (login|sign in|signup) page/
      new_user_session_path
    when /customer overview/
      '/customers'
    when /product overview/
      '/products'
    when /sales order overview/
      '/sales_orders'
    when /create product/
      '/products/new'
    when /create sales order/
      '/sales_orders/new'
    when /create customer/
      '/customers/new'
    when /cgi/
      '/cgi-bin/show-table.py'
    when /update customer/
      '/customer/1/update'
    else
      begin
        page_name =~ /the (.*) page/
        path_components = $1.split(/\s+/)
        self.send(path_components.push('path').join('_').to_sym)
      rescue Object => e
        raise "Can't find mapping from \"#{page_name}\" to a path.\n" +
          "Now, go and add a mapping in #{__FILE__}"
      end
    end
  end
end
World(NavigationHelpers)
