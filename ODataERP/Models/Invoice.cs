using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ODataERP.Models
{
    public class Invoice
    {
        public int ID { get; set; }
        public int Status { get; set; }
        public decimal AmountPaid { get; set; }
        public int SalesOrderID { get; set; }
        public virtual SalesOrder SalesOrder { get; set; }
    }
}