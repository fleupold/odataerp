using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ODataERP.Models
{
    public class Customer
    {
        public int ID { get; set; }
        public int Discount { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string StreetNo { get; set; }
        public string Zip { get; set; }
        public string City { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}