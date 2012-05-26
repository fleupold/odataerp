using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ODataERP.Models
{
    public class SalesOrder
    {
        public int ID { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int PaymentTerms { get; set; }
        public int Priority { get; set; }
        public int CustomerID { get; set; }
        public virtual Customer Customer { get; set; }

        public virtual ICollection<ProductForSalesOrder> ProductForSalesOrders { get; set; }
    }
}