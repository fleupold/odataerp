// init elements
$(function () {
    // tabs
    $(".tabs").tabs();

    // buttons
    $("button").button();
    $("#order-create").button({
        disabled: true,
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
        buttonImageOnly: true
    });

    // autocomplete customer name
    $("#customer-name, #order-item-name").autocomplete({
        source: function (request, response) {
            // request data over odata #todo

            OData.read(
              document.location.href + "ODataERP.svc/Customer?$filter=startswith(Name, '" + request.term + "')",
              function (data) {
                  response($.map(data.results, function (item) {
                      return {
                          label: item.Name + ", " + item.Address,
                          value: item.Name
                      }
                  }));
              }
            );
        },
        minLength: 1,
        select: function (event, ui) {
            // on select
        }
    });
});