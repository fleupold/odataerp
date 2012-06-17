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
        public int Status { get; set; }
        public int CustomerID { get; set; }
        public virtual Customer Customer { get; set; }
        public DateTime Created { get; set; }

        // info for invoice
        public double NetValue { get; set; }
        public double Discount { get; set; }
        public double Shipping { get; set; }
        public double Tax { get; set; }
        public double Total { get; set; }
        public double AmountPaid { get; set; }
        public int DunStatus { get; set; }
        public DateTime Invoiced { get; set; }

        public virtual ICollection<ProductForSalesOrder> ProductForSalesOrders { get; set; }
    }
}