using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ODataERP.Models
{
    public class ProductForSalesOrder
    {
        public int ID { get; set; }
        public int Quantity { get; set; }
        public int ProductID { get; set; }
        public int SalesOrderID { get; set; }
        public virtual Product Product { get; set; }
        public virtual SalesOrder SalesOrder { get; set; }
    }
}