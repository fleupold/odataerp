// init elements
$(function () {
    // sales order values
    var tax_prc = 0.19;
    var total_net = null;
    var discount = null;
    var shipping = null;
    var tax = null;
    var total = null;

    so = {
        customer: null,
        new_product: null,
        new_quantity: 1,
        products: []
    }

    // tabs
    $(".tabs").tabs({
        select: function (event, ui) {
            if (ui.index == 1) {
                reloadTable();
            }
            else if (ui.index == 2) {
                reloadDunTable();
            }
            else if (ui.index == 3) {
                reloadAnalytics();
            }
        }
    });

    // buttons
    $("button").button();
    $("#order-create").button({
        icons: {
            primary: "ui-icon-arrowreturnthick-1-e"
        },
        label: "Create Sales Order"
    });
    $("#order-atp-check").button({
        disabled: true,
        icons: {
            primary: "ui-icon-check"
        },
        label: "All available"
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

    // oder delivery datepicker
    $("#order-delivery-date").datepicker({
        showOn: "button",
        buttonImage: "/Content/images/calendar.gif",
        buttonImageOnly: true,
        minDate: 0
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
            $('#order-discount option').eq(ui.item.attributes.Discount).attr('selected', 'selected');
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
        discount = 1 - 0.01 * parseInt($("#order-discount").val());

        // shipping
        shipping = parseFloat($("#order-shipping").val().replace(",", "."));
        if (isNaN(shipping)) {
            shipping = 0;
            var message = "Enter a valid value!";
            showDialog(message, message);
        }

        // tax
        tax = total_net * discount * tax_prc;
        $("#order-tax").html(String((tax).toFixed(2)).replace(".", ","))

        // total
        total = total_net * discount + shipping + tax;
        $("#order-total").html(String((total).toFixed(2)).replace(".", ","))

    }

    $("#order-discount, #order-shipping").change(function () {
        updateTable();
    });

    // add item
    $("#order-add-item").click(function () {
        if (so.new_product) {
            var num = $(".item-row").length + 1
            $("#order-item-num").html((num + 1) + ".")

            var name = so.new_product.Name;
            var quantity = so.new_quantity;
            var price = $("#order-item-price").html();

            so.products.push({ product: so.new_product, quantity: so.new_quantity });

            var new_item = '<tr class="item-row"><td class="num"></td><td>' + name + '</td><td>' + quantity + '</td><td>' + price + ' &euro;</td><td><button id="delete_row_' + num + '" class="order-delete-item"></button></td></tr>';
            $("#order-item-new").before(new_item);

            $(".order-delete-item").button({
                icons: {
                    primary: "ui-icon-trash"
                },
                label: "Delete"
            });

            $("#order-item-name").val("");
            $("#order-item-quantity").html("");
            $("#order-item-price").html("0,00");
            updateTable()
        }
    });

    // delete item
    $(".order-delete-item").live("click", function () {
        var row = parseInt($(this).attr("id").substr(11));
        so.products.splice(row - 1, 1);
        $(this).parent().parent().remove();
        updateTable();
    });

    // create sales order
    $("#order-create").click(function () {
        var error = null;
        if (!so.customer)
            error = "You have to select a customer!";
        else if (so.products.length == 0)
            error = "You have to add a product!";
        else if (!$("#order-delivery-date").datepicker("getDate"))
            error = "You have to select a delivery date!";

        if (error) {
            showDialog("Error", error);
        }
        else {
            var requestData = { __batchRequests: [{ __changeRequests:
                    [
                        { requestUri: "SalesOrder", method: "POST", headers: { "Content-ID": "1" },
                            data: {
                                CustomerID: so.customer,
                                DeliveryDate: $("#order-delivery-date").datepicker("getDate"),
                                PaymentTerms: parseInt($("#order-payment-terms").val()),
                                Priority: parseInt($("#priority-selection").val()),
                                Status: 0,
                                NetValue: total_net,
                                Discount: discount,
                                Shipping: shipping,
                                Tax: tax,
                                Total: total,
                                AmountPaid: 0.0,
                                DunStatus: 0
                            }
                        }
                    ]
            }]
            };

            for (var i = 0; i < so.products.length; i++) {
                var requestObject = {
                    requestUri: "ProductForSalesOrder", method: "POST", data: {
                        Quantity: so.products[i].quantity,
                        ProductID: so.products[i].product.ID,
                        SalesOrderID: { __metadata: { uri: "$1"}}.ID
                    }
                };
                requestData.__batchRequests[0].__changeRequests.push(requestObject)
            }

            OData.request({
                requestUri: document.location.href + "ODataERP.svc/$batch",
                method: "POST",
                data: requestData
            },
                function (data) {
                    showDialog("Sales order created", "Your sales order was successfully created!", function () { window.location.reload() });
                },
                function (err) {
                    alert(err.message);
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
                  alert(err.message);
              }
            );
        }
    });

    // tables
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
        });
    }

    function usDate(dateObject) {
        return dateObject.getMonth() + 1 + "/" + dateObject.getDate() + "/" + dateObject.getFullYear();
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
            }, function errorr(err) {
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
                    data: 1
                }, function success(data, response) {
                    reloadDunTable();
                }, function errorr(err) {
                    console.log(err);
                });
            }
        });
    });

    // analytics
    function reloadAnalytics() {
        $("#analytics-avg-duration").html("?");
        $("#analytics-dpp").html("?");
        $("#analytics-avg-orders").html("?");
    }
});