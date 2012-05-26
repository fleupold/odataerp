// init elements
$(function() {
    // tabs
    $( ".tabs" ).tabs();
    
    // buttons
    $( "button").button();
    $( "#order-create" ).button({
        disabled:true,
        icons: {
            primary: "ui-icon-arrowreturnthick-1-e"
        },
        label: "Create Sales Order"
    });
    $( "#order-atp-check" ).button({
        disabled:true,
        icons: {
            primary: "ui-icon-check"
        },
        label: "All available"
    });
    $( "#order-add-item" ).button({
        icons: {
            primary: "ui-icon-plus"
        },
        label:"Add"
    });
    
    // oder delivery datepicker
    $( "#order-delivery-date" ).datepicker({
        showOn: "button",
        buttonImage: "/Content/images/calendar.gif",
        buttonImageOnly: true
    });
    
    // autocomplete customer name
    $( "#customer-name, #order-item-name" ).autocomplete({
        source: function( request, response ) {
            // request data over odata #todo
            /*OData.read("http://odata.netflix.com/v1/Catalog/Genres",
                function (data, request) {
                for (var i = 0; i < data.results.length; i++) {
                    //
                }
            });*/
            $.ajax({
                url: "http://ws.geonames.org/searchJSON",
                dataType: "jsonp",
                data: {
                    featureClass: "P",
                    style: "full",
                    maxRows: 12,
                    name_startsWith: request.term
                },
                success: function( data ) {
                    response( $.map( data.geonames, function( item ) {
                        return {
                            label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
                            value: item.name
                        }
                    }));
                }
            });
        },
        minLength: 2,
        select: function( event, ui ) {
            // on select
        }
    });
});