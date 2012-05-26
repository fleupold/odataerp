using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ODataERP.Models;
using ODataERP.DAL;

namespace ODataERP.Controllers
{ 
    public class ProductForSalesOrderController : Controller
    {
        private ODataERPContext db = new ODataERPContext();

        //
        // GET: /ProductForSalesOrder/

        public ViewResult Index()
        {
            var productforsalesorders = db.ProductForSalesOrders.Include(p => p.Product).Include(p => p.SalesOrder);
            return View(productforsalesorders.ToList());
        }

        //
        // GET: /ProductForSalesOrder/Details/5

        public ViewResult Details(int id)
        {
            ProductForSalesOrder productforsalesorder = db.ProductForSalesOrders.Find(id);
            return View(productforsalesorder);
        }

        //
        // GET: /ProductForSalesOrder/Create

        public ActionResult Create()
        {
            ViewBag.ProductID = new SelectList(db.Products, "ID", "Name");
            ViewBag.SalesOrderID = new SelectList(db.SalesOrders, "ID", "ID");
            return View();
        } 

        //
        // POST: /ProductForSalesOrder/Create

        [HttpPost]
        public ActionResult Create(ProductForSalesOrder productforsalesorder)
        {
            if (ModelState.IsValid)
            {
                db.ProductForSalesOrders.Add(productforsalesorder);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            ViewBag.ProductID = new SelectList(db.Products, "ID", "Name", productforsalesorder.ProductID);
            ViewBag.SalesOrderID = new SelectList(db.SalesOrders, "ID", "ID", productforsalesorder.SalesOrderID);
            return View(productforsalesorder);
        }
        
        //
        // GET: /ProductForSalesOrder/Edit/5
 
        public ActionResult Edit(int id)
        {
            ProductForSalesOrder productforsalesorder = db.ProductForSalesOrders.Find(id);
            ViewBag.ProductID = new SelectList(db.Products, "ID", "Name", productforsalesorder.ProductID);
            ViewBag.SalesOrderID = new SelectList(db.SalesOrders, "ID", "ID", productforsalesorder.SalesOrderID);
            return View(productforsalesorder);
        }

        //
        // POST: /ProductForSalesOrder/Edit/5

        [HttpPost]
        public ActionResult Edit(ProductForSalesOrder productforsalesorder)
        {
            if (ModelState.IsValid)
            {
                db.Entry(productforsalesorder).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ProductID = new SelectList(db.Products, "ID", "Name", productforsalesorder.ProductID);
            ViewBag.SalesOrderID = new SelectList(db.SalesOrders, "ID", "ID", productforsalesorder.SalesOrderID);
            return View(productforsalesorder);
        }

        //
        // GET: /ProductForSalesOrder/Delete/5
 
        public ActionResult Delete(int id)
        {
            ProductForSalesOrder productforsalesorder = db.ProductForSalesOrders.Find(id);
            return View(productforsalesorder);
        }

        //
        // POST: /ProductForSalesOrder/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            ProductForSalesOrder productforsalesorder = db.ProductForSalesOrders.Find(id);
            db.ProductForSalesOrders.Remove(productforsalesorder);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}