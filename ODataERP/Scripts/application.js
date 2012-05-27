// init elements
$(function () {
    var tax_prc = 0.19;
    so = {
        customer: null,
        new_product: null,
        new_quantity: 1,
        products: []
    }

    // tabs
    $(".tabs").tabs();

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
                          label: item.Name + ", " + item.Address,
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
        var total_net = 0;
        for (var i = 0; i < so.products.length; i++) {
            total_net += so.products[i].product.Price * so.products[i].quantity;
        }
        $("#order-net").html(String((total_net).toFixed(2)).replace(".", ","))

        // discount
        var discount = 1 - 0.01 * parseInt($("#order-discount").val());

        // shipping
        var shipping = parseFloat($("#order-shipping").val().replace(",", "."));
        if (isNaN(shipping)) {
            shipping = 0;
            var message = "Enter a valid value!";
            showDialog(message, message);
        }

        // tax
        var tax = total_net * discount * tax_prc;
        $("#order-tax").html(String((tax).toFixed(2)).replace(".", ","))

        // total
        var total = total_net * discount + shipping + tax;
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
        console.log("ckucj")
        var error = null;
        if (!so.customer)
            error = "You have to select a customer!";
        else if (so.products.length == 0)
            error = "You have to add a product!";
        else if (!$("#order-delivery-date").datepicker("getDate"))
            error = "You have to select a delivery date!";

        if (error) {
            showDialog(error, error);
        }
        else {
            var requestData = { __batchRequests: [{ __changeRequests: 
                    [
                        { requestUri: "SalesOrder", method: "POST", headers: { "Content-ID": "1" }, data: {
                                CustomerID: so.customer,
                                DeliveryDate: $("#order-delivery-date").datepicker("getDate"),
                                PaymentTerms: parseInt($("#order-payment-terms").val()),
                                Priority: parseInt($("#priority-selection").val())
                            }
                        }
                    ]
                    }]
                };
            
            for (var i=0; i< so.products.length; i++) {
                var requestObject = { 
                            requestUri: "ProductForSalesOrder", method: "POST", data: {
                                Quantity: so.products[i].quantity,
                                ProductID: so.products[i].product.ID,
                                SalesOrderID: { __metadata: { uri: "$1"} }.ID
                            }
                        };
                        requestData.__batchRequests[0].__changeRequests.push(requestObject)
            }
            
            console.log(requestData)

            OData.request({ 
                requestUri: document.location.href + "ODataERP.svc/$batch",
                method: "POST",
                data: requestData
                },
                function (data) {
                    console.log(data)
                    showDialog("Sales order created", "Your sales order was successfully created!", function () { window.location.reload() });
                },
                function (err) {
                    alert(err.message);
                },
                OData.batchHandler
            );
        }
    });
});