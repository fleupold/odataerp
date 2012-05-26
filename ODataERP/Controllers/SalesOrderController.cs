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
    public class SalesOrderController : Controller
    {
        private ODataERPContext db = new ODataERPContext();

        //
        // GET: /SalesOrder/

        public ViewResult Index()
        {
            var salesorders = db.SalesOrders.Include(s => s.Customer);
            return View(salesorders.ToList());
        }

        //
        // GET: /SalesOrder/Details/5

        public ViewResult Details(int id)
        {
            SalesOrder salesorder = db.SalesOrders.Find(id);
            return View(salesorder);
        }

        //
        // GET: /SalesOrder/Create

        public ActionResult Create()
        {
            ViewBag.CustomerID = new SelectList(db.Customers, "ID", "Name");
            return View();
        } 

        //
        // POST: /SalesOrder/Create

        [HttpPost]
        public ActionResult Create(SalesOrder salesorder)
        {
            if (ModelState.IsValid)
            {
                db.SalesOrders.Add(salesorder);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            ViewBag.CustomerID = new SelectList(db.Customers, "ID", "Name", salesorder.CustomerID);
            return View(salesorder);
        }
        
        //
        // GET: /SalesOrder/Edit/5
 
        public ActionResult Edit(int id)
        {
            SalesOrder salesorder = db.SalesOrders.Find(id);
            ViewBag.CustomerID = new SelectList(db.Customers, "ID", "Name", salesorder.CustomerID);
            return View(salesorder);
        }

        //
        // POST: /SalesOrder/Edit/5

        [HttpPost]
        public ActionResult Edit(SalesOrder salesorder)
        {
            if (ModelState.IsValid)
            {
                db.Entry(salesorder).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CustomerID = new SelectList(db.Customers, "ID", "Name", salesorder.CustomerID);
            return View(salesorder);
        }

        //
        // GET: /SalesOrder/Delete/5
 
        public ActionResult Delete(int id)
        {
            SalesOrder salesorder = db.SalesOrders.Find(id);
            return View(salesorder);
        }

        //
        // POST: /SalesOrder/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            SalesOrder salesorder = db.SalesOrders.Find(id);
            db.SalesOrders.Remove(salesorder);
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