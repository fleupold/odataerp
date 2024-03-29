// init elements
$(function () {
    // helper
    function usDate(dateObject) {
        return dateObject.getMonth() + 1 + "/" + dateObject.getDate() + "/" + dateObject.getFullYear();
    }
    
    function showDialog(title, message, ok_func) {
        if (!ok_func) {
            ok_func = function () {
                $(this).dialog("close");
            }
        }
        $("#dialog").html(message);
        $("#dialog").dialog({
            modal: true,
            buttons: {
                Ok: ok_func
            },
            title: title
        });
    }
    
    function checkEmail(email) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            return false;
        }
        return true;
    }
    
    // tabs
    $(".tabs").tabs({
        select: function (event, ui) {
            if (ui.index == 0) {
                reloadSalesOrder();
            }
            else if (ui.index == 1) {
                reloadCustomer();
            }
            else if (ui.index == 2) {
                reloadProduct();
            }
            else if (ui.index == 3) {
                reloadTable();
            }
            else if (ui.index == 4) {
                reloadDunTable();
            }
            else if (ui.index == 5) {
                reloadAnalytics();
            }
        }
    });

    // buttons
    $("button").button();
    $("#crud-order-button").button({
        icons: {
            primary: "ui-icon-arrowreturnthick-1-e"
        },
        label: "Submit Sales Order"
    });
    $("#crud-order-new-button").button({
        icons: {
            primary: "ui-icon-arrowreturnthick-1-e"
        },
        label: "New Sales Order"
    });
    $("#order-add-item").button({
        icons: {
            primary: "ui-icon-plus"
        },
        label: "Add"
    });
    $("#show-add-customer").button({
        icons: {
            primary: "ui-icon-plus"
        },
        label: "New"
    });
    $("#add-customer").button({
        icons: {
            primary: "ui-icon-plus"
        },
        label: "Add"
    });
    $("#change-button").button({
        icons: {
            primary: "ui-icon-arrowreturnthick-1-e"
        },
        label: "Release"
    });
    $("#dun-button").button({
        icons: {
            primary: "ui-icon-arrowreturnthick-1-e"
        },
        label: "Dun"
    });
    $("#crud-product-button").button({
        icons: {
            primary: "ui-icon-arrowreturnthick-1-e"
        },
        label: "Submit Product"
    });
    $("#crud-product-new-button").button({
        icons: {
            primary: "ui-icon-plus"
        },
        label: "New Product"
    });
    $("#crud-customer-button").button({
        icons: {
            primary: "ui-icon-arrowreturnthick-1-e"
        },
        label: "Submit Customer"
    });
    $("#crud-customer-new-button").button({
        icons: {
            primary: "ui-icon-plus"
        },
        label: "New Customer"
    });
    
    // sales order
    var tax_prc = 0.19;
    var total_net = null;
    var discount = null;
    var discount_perc = 0;
    var shipping = null;
    var tax = null;
    var total = null;

    so = {
        id: null,
        customer: null,
        new_product: null,
        new_quantity: 1,
        products: [],
        old_products:[]
    }
    
    function reloadSalesOrder() {
        var url = document.location.href + "ODataERP.svc/SalesOrder?$expand=Customer";
        readMoreData(url, [], redrawSalesOrder);
    }
    
    function redrawSalesOrder(salesorders) {
        $("#sales-order-list").html("");
        for (var i = 0; i < salesorders.length; i++) {
            $("#sales-order-list").append("<li id='sales-order-" + salesorders[i].ID + "'>" + salesorders[i].Customer.Name + " (" + usDate(salesorders[i].DeliveryDate) + ") <span class='edit-sales-order'>[Edit]</span> <span class='delete-sales-order'>[Delete]</span></li>");
        }
    }
    
    function atpCheck() {
        var delivery_date = $("#order-delivery-date").datepicker( "getDate" );
        if (delivery_date && !so.id) {
            OData.request({
                    requestUri: document.location.href + "ODataERP.svc/SalesOrder?$filter=Status le 1",
                    method: "GET",
                    recognizeDates: true
                },
                function success(data) {
                    var atp_so = data.results;
                    OData.request({
                            requestUri: document.location.href + "ODataERP.svc/Product",
                            method: "GET"
                        },
                        function success(data) {
                            var atp_p = data.results;
                            OData.request({
                                    requestUri: document.location.href + "ODataERP.svc/ProductForSalesOrder",
                                    method: "GET"
                                },
                                function success(data) {
                                    var atp_ps = data.results;
                                    // prepare data
                                    var products = {}
                                    for (var i=0; i<atp_p.length; i++) {
                                        products[atp_p[i].ID] = {quantity: atp_p[i].Stock, date: null}
                                    }
                                    for (var i=0; i<atp_so.length; i++) {
                                        for (var j=0; j<atp_ps.length; j++) {
                                            if (atp_ps[j].SalesOrderID == atp_so[i].ID) {
                                                products[atp_ps[j].ProductID].quantity -= atp_ps[j].Quantity;
                                                if (products[atp_ps[j].ProductID].date < atp_so[i].DeliveryDate) {
                                                    products[atp_ps[j].ProductID].date = atp_so[i].DeliveryDate;
                                                }
                                            }
                                        }
                                    }
                                    // check if current so is available
                                    var earliest_date = null;
                                    for (var i=0; i<so.products.length; i++) {
                                        if((products[so.products[i].product.ID].quantity - so.products[i].quantity) <= 0) {
                                            if (earliest_date < products[so.products[i].product.ID].date) {
                                                earliest_date = products[so.products[i].product.ID].date;
                                            }
                                        }
                                    }
                                    if (earliest_date > delivery_date) {
                                        $("#atp-check").html("Earliest date possible (click!): ");
                                        $("#atp-check-date").html(usDate(earliest_date));
                                    }
                                    else {
                                        $("#atp-check").html("All available");
                                        $("#atp-check-date").html("");
                                    }
                                }, 
                                function (err) {
                                    console.log(err);
                                }
                            );
                        }, 
                        function (err) {
                            console.log(err);
                        }
                    );
                }, 
                function (err) {
                    console.log(err);
                }
            );
        }
    }
    
    function addItem(product, name, quantity, price) {
        var num = $(".item-row").length + 1
        $("#order-item-num").html((num + 1) + ".")
        so.products.push({ product: product, quantity: quantity });
        var new_item = '<tr class="item-row"><td class="num"></td><td>' + name + '</td><td>' + quantity + '</td><td>' + price + ' &euro;</td><td><button id="delete_row_' + num + '" class="order-delete-item"></button></td></tr>';
        $("#order-item-new").before(new_item);
        $(".order-delete-item").button({
            icons: {
                primary: "ui-icon-trash"
            },
            label: "Delete"
        });
        updateTable();
    }
    
    function resetSalesOrder() {
        so = {
            id: null,
            customer: null,
            new_product: null,
            new_quantity: 1,
            products: [],
            old_products:[]
        }
        $("#customer-name").val("");
        $("#priority-selection option[value='0']").attr('selected',true);
        $("#order-discount").val(0);
        $("#order-shipping").val(0);
        $("#order-delivery-date").datepicker( "setDate" , null );
        $("#atp-check").html("All available");
        $("#atp-check-date").html("");
        $(".item-row").remove();
        updateTable();
    }
    
    function loadSalesOrder(so_data, prod){
        resetSalesOrder();
        so.customer = so_data.Customer.ID;
        so.id = so_data.ID
        $("#customer-name").val(so_data.Customer.Name);
        $("#priority-selection option[value='" + so_data.Priority + "']").attr('selected',true);
        $("#order-discount").val(so_data.Discount);
        $("#order-shipping").val(so_data.Shipping);
        $("#order-payment-terms option[value='" + so_data.PaymentTerms + "']").attr('selected',true);
        $("#order-delivery-date").datepicker( "setDate" , so_data.DeliveryDate );
        so.old_products = [];
        for(var i=0; i<prod.results.length; i++) {
            addItem(prod.results[i].Product, prod.results[i].Product.Name, prod.results[i].Quantity, String((prod.results[i].Quantity*prod.results[i].Product.Price).toFixed(2)).replace(".", ","));
            so.old_products.push(prod.results[i].ID);
        }
    }
    
    $("#atp-check-date").live("click", function(){
        if($(this).html() != "All available"){
            $("#order-delivery-date").datepicker( "setDate" , $(this).html() );
            $(this).html("");
            $("#atp-check").html("All available");
        }
    });
    
    $(".edit-sales-order").live("click", function(){
        var id = $(this).parent().attr("id");
        OData.request({
                requestUri: document.location.href + "ODataERP.svc/SalesOrder(" + id.substr(12) + ")?$expand=Customer",
                method: "GET",
                recognizeDates: true
            },
            function success(data) {
                var so_data = data;
                OData.request({
                    requestUri: document.location.href + "ODataERP.svc/SalesOrder(" + id.substr(12) + ")/ProductForSalesOrder?$expand=Product",
                    method: "GET"
                    },
                    function success(data) {
                        var so_product = data;
                        loadSalesOrder(so_data, so_product);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }, 
            function (err) {
                console.log(err);
            }
        );
    });
    
    $(".delete-sales-order").live("click", function(){
        var id = $(this).parent().attr("id");
        OData.request({
                requestUri: document.location.href + "ODataERP.svc/SalesOrder(" + id.substr(12) + ")",
                method: "DELETE"
            }, 
            function success(data) {
                reloadSalesOrder();
                resetSalesOrder();
            }, 
            function (err) {
                console.log(err);
            }
        );
        $("li[id=" + id + "]").remove();
    });
    
    $("#crud-order-new-button").click(function (){
        resetSalesOrder();
    });
    
    // oder delivery datepicker
    $("#order-delivery-date").datepicker({
        showOn: "button",
        buttonImage: "/Content/images/calendar.gif",
        buttonImageOnly: true,
        minDate: 0,
        onSelect: atpCheck
    });

    // autocomplete customer name
    $("#customer-name").autocomplete({
        source: function (request, response) {
            OData.read(
              document.location.href + "ODataERP.svc/Customer?$filter=startswith(Name, '" + request.term + "')",
              function (data) {
                  response($.map(data.results, function (item) {
                      return {
                          label: item.Name + ", " + item.City,
                          value: item.Name,
                          attributes: item
                      }
                  }));
              }
            );
        },
        minLength: 1,
        select: function (event, ui) {
            so.customer = ui.item.attributes.ID;
            $('#order-discount').val(ui.item.attributes.Discount);
        }
    });

    // autocomplete product
    $("#order-item-name").autocomplete({
        source: function (request, response) {
            OData.read(
              document.location.href + "ODataERP.svc/Product?$filter=startswith(Name, '" + request.term + "') and Stock gt 0",
              function (data) {
                  response($.map(data.results, function (item) {
                      return {
                          label: item.Name,
                          value: item.Name,
                          attributes: item
                      }
                  }));
              }
            );
        },
        minLength: 1,
        select: function (event, ui) {
            // update quantity
            var options = "";
            for (var i = 1; i <= ui.item.attributes.Stock; i++) {
                options += '<option value="' + i + ((i == 1) ? '" selected="selected"' : '"') + '>' + i + '</option>';
            }
            $("#order-item-quantity").html(options);
            $("#order-item-price").html(String(ui.item.attributes.Price).replace(".", ","));
            so.new_product = ui.item.attributes;
        }
    });

    $("#order-item-quantity").change(function () {
        so.new_quantity = parseInt($(this).val());
        var price = (so.new_product.Price * so.new_quantity).toFixed(2);
        $("#order-item-price").html(String(price).replace(".", ","));
    });
    
    function updateTable() {
        // num rows
        for (var i = 0; i < $(".item-row").length; i++) {
            $(".num", $(".item-row")[i]).html((i + 1) + ".");
        }
        $("#order-item-num").html(($(".item-row").length + 1) + ".");

        // total net
        total_net = 0;
        for (var i = 0; i < so.products.length; i++) {
            total_net += so.products[i].product.Price * so.products[i].quantity;
        }
        $("#order-net").html(String((total_net).toFixed(2)).replace(".", ","))

        // discount
        var discount_int = parseInt($("#order-discount").val());
        discount_perc = (discount_int == NaN?0:discount_int);
        discount = 1 - 0.01 * discount_perc;

        // shipping
        shipping = parseFloat($("#order-shipping").val().replace(",", "."));
        if (isNaN(shipping)) {
            shipping = 0;
            var message = "Enter a valid value!";
            showDialog(message, message);
        }

        // tax
        tax = total_net * discount * tax_prc;
        $("#order-tax").html(String((tax).toFixed(2)).replace(".", ","));

        // total
        total = total_net * discount + shipping + tax;
        $("#order-total").html(String((total).toFixed(2)).replace(".", ","));
        
        atpCheck();
    }

    $("#order-discount, #order-shipping").change(function () {
        updateTable();
    });
    
    // add item
    $("#order-add-item").click(function () {
        if (so.new_product) {
            var name = so.new_product.Name;
            var quantity = so.new_quantity;
            var price = $("#order-item-price").html();
            addItem(so.new_product, name, quantity, price);
            $("#order-item-name").val("");
            $("#order-item-quantity").html("");
            $("#order-item-price").html("0,00");
        }
    });

    // delete item
    $(".order-delete-item").live("click", function () {
        var row = parseInt($(this).attr("id").substr(11));
        so.products.splice(row - 1, 1);
        $(this).parent().parent().remove();
        updateTable();
    });

    // submit sales order
    $("#crud-order-button").click(function () {
        var error = null;
        if (!so.customer)
            error = "You have to select a customer!";
        else if (so.products.length == 0)
            error = "You have to add a product!";
        else if (!$("#order-delivery-date").datepicker("getDate"))
            error = "You have to select a delivery date!";
        else if (discount < 0) {
            error = "The discount cannot be negative!";
        }
        else if (discount > 100) {
            error = "The discount cannot be more than 100%!";
        }
        else if (!($("#atp-check").html() == "All available")) {
            error = "Products are not available at this time!";
        }
        if (error) {
            showDialog("Error", error);
        }
        else {
            // sales order object
            var requestData = { __batchRequests: 
                [{ __changeRequests:
                    [
                        { requestUri: "SalesOrder" + ((so.id)? "(" + so.id + ")":""), method: (so.id?"PUT":"POST"), headers: { "Content-ID": "1" }, recognizeDates: true,
                            data: {
                                CustomerID: so.customer,
                                DeliveryDate: $("#order-delivery-date").datepicker("getDate"),
                                PaymentTerms: parseInt($("#order-payment-terms").val()),
                                Priority: parseInt($("#priority-selection").val()),
                                Status: 0,
                                NetValue: total_net,
                                Discount: discount_perc,
                                Shipping: shipping,
                                Tax: tax,
                                Total: total,
                                AmountPaid: 0.0,
                                DunStatus: 0,
                                Created: new Date(),
                                Invoiced: new Date()
                            }
                        }
                    ]
                }]
            };
            // delete old product connections
            if(so.id) {
                for (var i=0; i<so.old_products.length; i++) {
                    var requestObject = {requestUri: "ProductForSalesOrder(" + so.old_products[i] + ")", method: "DELETE"};
                    requestData.__batchRequests[0].__changeRequests.push(requestObject);
                }
            }
            for (var i = 0; i < so.products.length; i++) {
                var requestObject = {
                    requestUri: "ProductForSalesOrder", method: "POST", data: {
                        Quantity: so.products[i].quantity,
                        ProductID: so.products[i].product.ID,
                        SalesOrderID: (so.id?so.id:{ __metadata: { uri: "$1"}}.ID)
                    }
                };
                requestData.__batchRequests[0].__changeRequests.push(requestObject)
            }
            OData.request({
                    requestUri: document.location.href + "ODataERP.svc/$batch",
                    data: requestData,
                    method: "POST"
                },
                function (data) {
                    so.id = data.id;
                    so.old_products = [];
                    reloadSalesOrder();
                    showDialog("Sales order created", "Your sales order was successfully submitted!");
                },
                function (err) {
                    console.log(err);
                },
                OData.batchHandler
            );
        }
    });
    
    // add new customer
    $("#show-add-customer").click(function () {
        $("#create-new-customer").slideDown();
    });
    $("#add-customer").click(function () {
        var error = null;
        if (!$("#new-customer-name").val())
            error = "You have to enter a customer name!";
        else if (!$("#new-customer-city").val())
            error = "You have to enter a customer city!";
        if (error) {
            showDialog("Error", error);
        }
        else {
            OData.request(
              { requestUri: document.location.href + "ODataERP.svc/Customer",
                  method: "POST",
                  data: {
                      Name: $("#new-customer-name").val(),
                      Street: $("#new-customer-street").val(),
                      StreetNo: $("#new-customer-streetno").val(),
                      Zip: $("#new-customer-zip").val(),
                      City: $("#new-customer-city").val(),
                      Firstname: $("#new-customer-firstname").val(),
                      Lastname: $("#new-customer-lastname").val(),
                      Phone: $("#new-customer-phone").val(),
                      Email: $("#new-customer-email").val(),
                      Discount: parseInt($("#new-customer-discount").val())
                  }
              },
              function (data) {
                  so.customer = data.ID;
                  // reset values
                  $("#customer-name").val($("#new-customer-name").val());
                  $("#new-customer-name").val("");
                  $("#new-customer-city").val("");
                  $("#new-customer-street").val("");
                  $("#new-customer-streetno").val("");
                  $("#new-customer-zip").val("");
                  $("#new-customer-city").val("");
                  $("#new-customer-firstname").val("");
                  $("#new-customer-lastname").val("");
                  $("#new-customer-phone").val("");
                  $("#new-customer-email").val("");
                  $("#create-new-customer").slideUp();
              },
              function (err) {
                  console.log(err);
              }
            );
        }
    });

    // change status
    function readMoreData(url, arr, cb) {
        OData.read({
            requestUri: url,
            recognizeDates: true
        }, function (data) {
            arr = arr.concat(data.results);
            if (data.__next) {
                readMoreData(data.__next, arr, cb);
            } else {
                return cb(arr);
            }
        }, function(err) {
            console.log(err)
        });
    }


    // reload table
    function reloadTable() {
        var status = $("#change-status").val();
        var searchtext = $("#change-search").val();
        var url = document.location.href + "ODataERP.svc/SalesOrder?$expand=Customer&$filter=Status eq " + status + ((searchtext) ? " and indexof(Customer/Name, '" + searchtext + "') gt -1" : "");

        readMoreData(url, [], redrawTable);
    }

    var mapStatus = ["releasable", "deliverable", "to be invoiced", "completed"];

    function redrawTable(arr) {
        var data = [];
        for (var i = 0; i < arr.length; i++) {
            data.push([arr[i].ID, mapStatus[arr[i].Status], usDate(arr[i].DeliveryDate), arr[i].Customer.Name]);
        }
        changeTable.fnClearTable();
        changeTable.fnAddData(data);
    }

    // release goods + post goods issues + invoice
    var changeTable = $('#change-table').dataTable();

    $('#change-table tr').live("click", function () {
        $(this).toggleClass('row_selected');
    });

    $("#change-status").change(function () {
        var currentStatus = parseInt($("#change-status").val());
        var label = null;
        if (currentStatus == 0) {
            label = "Release"
        }
        else if (currentStatus == 1) {
            label = "Deliver"
        }
        else if (currentStatus == 2) {
            label = "Invoice"
        }
        else if (currentStatus == 3) {
            label = "Complete"
        }
        $("#change-button").button({
            icons: {
                primary: "ui-icon-arrowreturnthick-1-e"
            },
            label: label,
            disabled: ((currentStatus == 3) ? true : false)
        });
        reloadTable();
    });

    $("#change-search").keyup(function () {
        reloadTable();
    })

    $("#change-button").click(function () {
        $.each($('#change-table tr.row_selected'), function (index_tr, tr) {
            var salesOrderId = parseInt($("td:first", tr).html());
            var currentStatus = parseInt($("#change-status").val());
            OData.request({
                requestUri: document.location.href + "ODataERP.svc/SalesOrder(" + salesOrderId + ")/Status/$value",
                method: "PUT",
                headers: { "Content-Type": "text/plain" },
                data: currentStatus + 1
            }, function success(data, response) {
                reloadTable();
                if (currentStatus == 2) {
                    // create invoice
                    OData.request(
                      { requestUri: document.location.href + "ODataERP.svc/Invoice",
                          method: "POST",
                          data: {
                              Status: 0,
                              AmountPaid: 0,
                              SalesOrderID: salesOrderId
                          }
                      },
                      function (data) {
                          // pass
                      },
                      function (err) {
                          console.log(err);
                      }
                    );
                }
            }, function (err) {
                console.log(err);
            });
        });
    });

    // dun customer
    var dunTable = $('#dun-table').dataTable();
    $('#dun-table tr').live("click", function () {
        $(this).toggleClass('row_selected');
    });
    function getDunStatus(obj) {
        if (obj.DunStatus == 2) {
            return "dunned";
        }
        else {
            var today = new Date();
            var diff = today - obj.DeliveryDate;
            var days = Math.round(diff / (1000 * 60 * 60 * 24));
            if (days > obj.PaymentTerms && obj.AmountPaid < obj.Total) {
                return "dunnable"
            }
            else {
                return "on time"
            }
        }
    }

    function redrawDunTable(arr) {
        var data = [];
        for (var i = 0; i < arr.length; i++) {
            data.push([arr[i].Customer.Name, arr[i].ID, getDunStatus(arr[i]), usDate(arr[i].DeliveryDate) + " - Payment Terms:" + arr[i].PaymentTerms + " Days", (arr[i].Total + " EUR"), (arr[i].AmountPaid + " EUR")]);
        }
        dunTable.fnClearTable();
        dunTable.fnAddData(data);
    }

    function reloadDunTable() {
        var url = document.location.href + "ODataERP.svc/SalesOrder?$expand=Customer&$filter=Status eq 3";
        readMoreData(url, [], redrawDunTable);
    }

    $("#dun-button").click(function () {
        $.each($('#dun-table tr.row_selected'), function (index_tr, tr) {
            var salesOrderId = parseInt($($("td", tr)[1]).html());
            if ($($("td", tr)[2]).html() == "dunnable") {
                OData.request({
                    requestUri: document.location.href + "ODataERP.svc/SalesOrder(" + salesOrderId + ")/DunStatus/$value",
                    method: "PUT",
                    headers: { "Content-Type": "text/plain" },
                    data: 2
                }, function success(data, response) {
                    reloadDunTable();
                }, function errorr(err) {
                    console.log(err);
                });
            }
        });
    });
    
    // crud customer
    var customer = {};
    
    function reloadCustomer() {
        var url = document.location.href + "ODataERP.svc/Customer";
        readMoreData(url, [], redrawCustomer);
    }
    
    function redrawCustomer(customers) {
        $("#customer-list").html("");
        for (var i = 0; i < customers.length; i++) {
            $("#customer-list").append("<li id='customer-" + customers[i].ID + "'>" + customers[i].Name + " <span class='edit-customer'>[Edit]</span> <span class='delete-customer'>[Delete]</span></li>");
        }
    }
    
    $(".edit-customer").live("click", function(){
        var id = $(this).parent().attr("id");
        OData.request({
                requestUri: document.location.href + "ODataERP.svc/Customer(" + id.substr(9) + ")",
                method: "GET"
            }, 
            function success(data) {
                customer = data;
                $("#crud-customer-name").val(customer.Name);
                $("#crud-customer-street").val(customer.Street);
                $("#crud-customer-streetno").val(customer.StreetNo);
                $("#crud-customer-zip").val(customer.Zip);
                $("#crud-customer-city").val(customer.City);
                $("#crud-customer-firstname").val(customer.Firstname);
                $("#crud-customer-lastname").val(customer.Lastname);
                $("#crud-customer-phone").val(customer.Phone);
                $("#crud-customer-email").val(customer.Email);
            }, 
            function (err) {
                console.log(err);
            }
        );
    });
    
    $("#crud-customer-button").click(function(){
        customer.Name = $("#crud-customer-name").val();
        customer.Street = $("#crud-customer-street").val();
        customer.StreetNo = $("#crud-customer-streetno").val();
        customer.Zip = $("#crud-customer-zip").val();
        customer.City = $("#crud-customer-city").val();
        customer.Firstname = $("#crud-customer-firstname").val();
        customer.Lastname = $("#crud-customer-lastname").val();
        customer.Phone = $("#crud-customer-phone").val();
        customer.Email = $("#crud-customer-email").val();
        
        var error = null;
        if (!customer.Name)
            error = "You have to enter a customer name!";
        else if (!customer.City)
            error = "You have to enter a customer city!";
        else if (customer.Email && !checkEmail(customer.Email))
            error = "Your email address has to be in the right format!"
        if (error) {
            showDialog("Error", error);
        }
        else {
            OData.request({
                    requestUri: (document.location.href + "ODataERP.svc/Customer") + ((customer.ID)? "(" + customer.ID + ")" : ""),
                    method: customer.ID ? "PUT" : "POST",
                    data:customer
                }, 
                function success(data) {
                    if (!customer.ID) {
                        customer = data
                    }
                    reloadCustomer();
                    showDialog("Customer", "Customer was successfully updated.");
                }, 
                function (err) {
                    console.log(err);
                }
            );
        }
    });
    
    $(".delete-customer").live("click", function(){
        var id = $(this).parent().attr("id");
        OData.request({
                requestUri: document.location.href + "ODataERP.svc/Customer(" + id.substr(9) + ")",
                method: "DELETE"
            }, 
            function success(data, response) {
                reloadCustomer();
            }, 
            function (err) {
                console.log(err);
            }
        );
        $("li[id=" + id + "]").remove();
    });
    
    $("#crud-customer-new-button").click(function(){
        customer = {};
        $("#crud-customer-name").val("");
        $("#crud-customer-street").val("");
        $("#crud-customer-streetno").val("");
        $("#crud-customer-zip").val("");
        $("#crud-customer-city").val("");
        $("#crud-customer-firstname").val("");
        $("#crud-customer-lastname").val("");
        $("#crud-customer-phone").val("");
        $("#crud-customer-email").val("");
    });
    
    // crud product
    var product = {};
    
    function reloadProduct() {
        var url = document.location.href + "ODataERP.svc/Product";
        readMoreData(url, [], redrawProduct);
    }
    
    function redrawProduct(products) {
        $("#product-list").html("");
        for (var i = 0; i < products.length; i++) {
            $("#product-list").append("<li id='product-" + products[i].ID + "'>" + products[i].Name + " <span class='edit-product'>[Edit]</span> <span class='delete-product'>[Delete]</span></li>");
        }
    }
    
    $(".edit-product").live("click", function(){
        var id = $(this).parent().attr("id");
        OData.request({
                requestUri: document.location.href + "ODataERP.svc/Product(" + id.substr(8) + ")",
                method: "GET"
            },
            function success(data) {
                product = data;
                $("#crud-prodcut-name").val(product.Name);
                $("#crud-prodcut-price").val(product.Price);
                $("#crud-prodcut-stock").val(product.Stock);
                $("#crud-prodcut-unit").val(product.Unit);
                $("#crud-prodcut-monthly-supply").val(product.MonthlySupply);
            }, 
            function (err) {
                console.log(err);
            }
        );
    });
    
    $("#crud-product-button").click(function(){
        product.Name = $("#crud-prodcut-name").val();
        product.Price = parseFloat($("#crud-prodcut-price").val());
        product.Stock = parseInt($("#crud-prodcut-stock").val());
        product.Unit = $("#crud-prodcut-unit").val();
        product.MonthlySupply = parseInt($("#crud-prodcut-monthly-supply").val());
        
        var error = null;
        if (!product.Name)
            error = "You have to enter a product name!";
        else if (!product.Price)
            error = "You have to enter a product price!";
        else if (product.Price < 0)
            error = "Price cannot be negative!";
        else if (!product.Stock)
            error = "You have to enter a product stock!";
        else if (!product.Unit)
            error = "You have to enter a product unit!";
        else if (!product.MonthlySupply)
            error = "You have to enter a product monthly supply!";
        if (error) {
            showDialog("Error", error);
        }
        else {
            OData.request({
                    requestUri: (document.location.href + "ODataERP.svc/Product") + ((product.ID)? "(" + product.ID + ")" : ""),
                    method: product.ID ? "PUT" : "POST",
                    data:product
                }, 
                function success(data) {
                    if (!product.ID) {
                        product = data
                    }
                    reloadCustomer();
                    showDialog("Product", "Product was successfully updated.");
                }, 
                function (err) {
                    console.log(err);
                }
            );
        }
    });
    
    $(".delete-product").live("click", function(){
        var id = $(this).parent().attr("id");
        OData.request({
                requestUri: document.location.href + "ODataERP.svc/Product(" + id.substr(8) + ")",
                method: "DELETE"
            }, 
            function success(data) {
                reloadProduct();
            }, 
            function (err) {
                console.log(err);
            }
        );
        $("li[id=" + id + "]").remove();
    });
    
    $("#crud-product-new-button").click(function(){
        product = {};
        $("#crud-prodcut-name").val("");
        $("#crud-prodcut-price").val("");
        $("#crud-prodcut-stock").val("");
        $("#crud-prodcut-unit").val("");
        $("#crud-prodcut-monthly-supply").val("");
    });
    
    // analytics
    function reloadAnalytics() {
        readMoreData(document.location.href + "ODataERP.svc/SalesOrder", [], analyticsSalesOrders);
    }
    
    function analyticsSalesOrders(arr) {
        var duration_tot = 0;
        var duration_count = 0;
        var amount_tot = 0;
        var sales_order_count = 0;
        var customers = [];
        var dunned = 0;
        for (var i=0; i<arr.length; i++) {
            if(arr[i].Created && arr[i].Invoiced) {
                duration_tot += arr[i].Invoiced - arr[i].Created;
                duration_count += 1;
            }
            if(!$.inArray(arr[i].Customer, customers)) {
                customers.push(arr[i].Customer);
            }
            if(arr[i].DunStatus == 1) {
                dunned += 1;
            }
            amount_tot += arr[i].Total;
            sales_order_count += 1;
        }
        $("#analytics-avg-duration").html((Math.round(duration_tot / (1000 * 60 * 60 * 24))/duration_count).toFixed(2) + " days");
        $("#analytics-avg-orders").html((sales_order_count?amount_tot/sales_order_count:0).toFixed(2) + "&euro;");
        $("#analytics-dpp").html((customers.length?dunned/customers.length:0).toFixed(2));
        $("#analytics-dps").html((sales_order_count?dunned/sales_order_count:0).toFixed(2));
    }
    
    // init
    reloadSalesOrder();
});