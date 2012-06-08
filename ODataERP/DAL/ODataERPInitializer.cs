﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using ODataERP.Models;

namespace ODataERP.DAL
{
    public class ODataERPInitializer : DropCreateDatabaseIfModelChanges<ODataERPContext>
    {
        protected override void Seed(ODataERPContext context)
        {
            var customers = new List<Customer>
            {
                new Customer { ID = 1, Name = "Stefan George",   City = "Köln", Discount = 1 },
                new Customer { ID = 2, Name = "Felix Leupold",   City = "Berlin", Discount = 2 },
                new Customer { ID = 3, Name = "Marvin Killing",   City = "München", Discount = 1 },
                new Customer { ID = 4, Name = "Christian Reß",   City = "Potsdam", Discount = 1 },
                new Customer { ID = 5, Name = "Melanie Meyer",   City = "Köln", Discount = 3 },
                new Customer { ID = 6, Name = "Stefan Maier",   City = "Dortmund", Discount = 1 },
                new Customer { ID = 7, Name = "Peter George",   City = "Essen", Discount = 1 },
                new Customer { ID = 8, Name = "Volker Stürmer",   City = "Berlin", Discount = 3 },
                new Customer { ID = 9, Name = "Marcello Schmidt",   City = "Freiburg", Discount = 1 },
                new Customer { ID = 10, Name = "Philipp Lehmann",   City = "Karlsruhe", Discount = 1 }
            };
            customers.ForEach(s => context.Customers.Add(s));
            context.SaveChanges();

            var products = new List<Product>
            {
                new Product { ID = 1, Name = "Saft", Price = 0.99M, Stock = 10 },
                new Product { ID = 2, Name = "Bier", Price = 2.99M, Stock = 4 },
                new Product { ID = 3, Name = "Brot", Price = 0.99M, Stock = 8 },
                new Product { ID = 4, Name = "Fleisch", Price = 3.99M, Stock = 14 },
                new Product { ID = 5, Name = "Müsli", Price = 1.99M, Stock = 4 },
                new Product { ID = 6, Name = "Milch", Price = 0.99M, Stock = 20 },
                new Product { ID = 7, Name = "Schokolade", Price = 0.99M, Stock = 9 },
                new Product { ID = 8, Name = "Chips", Price = 0.99M, Stock = 6 },
                new Product { ID = 9, Name = "Pizza", Price = 0.99M, Stock = 7 },
                new Product { ID = 10, Name = "Wurst", Price = 0.99M, Stock = 8 }
            };
            products.ForEach(s => context.Products.Add(s));
            context.SaveChanges();
            
            var salesorders = new List<SalesOrder>
            {
                new SalesOrder { ID = 1, CustomerID = 1, Priority = 0, DeliveryDate = DateTime.Parse("2005-09-01"), PaymentTerms = 0, Status=0, Discount=0, NetValue=10.0, Shipping=5.0, Tax=10.0, Total=10.0},
                new SalesOrder { ID = 2, CustomerID = 1, Priority = 0, DeliveryDate = DateTime.Parse("2005-09-01"), PaymentTerms = 0, Status=0, Discount=0, NetValue=10.0, Shipping=5.0, Tax=10.0, Total=10.0},
                new SalesOrder { ID = 3, CustomerID = 2, Priority = 0, DeliveryDate = DateTime.Parse("2005-09-01"), PaymentTerms = 0, Status=0, Discount=0, NetValue=10.0, Shipping=5.0, Tax=10.0, Total=10.0},
                new SalesOrder { ID = 4, CustomerID = 3, Priority = 0, DeliveryDate = DateTime.Parse("2005-09-01"), PaymentTerms = 0, Status=0, Discount=0, NetValue=10.0, Shipping=5.0, Tax=10.0, Total=10.0}
            };
            salesorders.ForEach(s => context.SalesOrders.Add(s));
            context.SaveChanges();

            var productforsalesorders = new List<ProductForSalesOrder>
            {
                new ProductForSalesOrder { ProductID = 1, SalesOrderID = 1, Quantity = 1},
                new ProductForSalesOrder { ProductID = 2, SalesOrderID = 1, Quantity = 2},
                new ProductForSalesOrder { ProductID = 3, SalesOrderID = 1, Quantity = 1},
                new ProductForSalesOrder { ProductID = 4, SalesOrderID = 1, Quantity = 3},
                new ProductForSalesOrder { ProductID = 5, SalesOrderID = 1, Quantity = 4},
                new ProductForSalesOrder { ProductID = 6, SalesOrderID = 2, Quantity = 1},
                new ProductForSalesOrder { ProductID = 7, SalesOrderID = 2, Quantity = 5},
                new ProductForSalesOrder { ProductID = 8, SalesOrderID = 2, Quantity = 3},
                new ProductForSalesOrder { ProductID = 9, SalesOrderID = 3, Quantity = 4},
                new ProductForSalesOrder { ProductID = 10, SalesOrderID = 3, Quantity = 5},
                new ProductForSalesOrder { ProductID = 1, SalesOrderID = 4, Quantity = 1},
                new ProductForSalesOrder { ProductID = 2, SalesOrderID = 4, Quantity = 3}
            };
            productforsalesorders.ForEach(s => context.ProductForSalesOrders.Add(s));
            context.SaveChanges();
        }
    }
}