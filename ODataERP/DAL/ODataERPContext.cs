using System;
using System.Collections.Generic;
using System.Data.Entity;
using ODataERP.Models;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ODataERP.DAL
{
    public class ODataERPContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<SalesOrder> SalesOrders { get; set; }
        public DbSet<ProductForSalesOrder> ProductForSalesOrders { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}