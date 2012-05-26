﻿//------------------------------------------------------------------------------
// <auto-generated>
//    Dieser Code wurde aus einer Vorlage generiert.
//
//    Manuelle Änderungen an dieser Datei führen möglicherweise zu unerwartetem Verhalten Ihrer Anwendung.
//    Manuelle Änderungen an dieser Datei werden überschrieben, wenn der Code neu generiert wird.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Data.Objects;
using System.Data.Objects.DataClasses;
using System.Data.EntityClient;
using System.ComponentModel;
using System.Xml.Serialization;
using System.Runtime.Serialization;

[assembly: EdmSchemaAttribute()]
#region EDM-Beziehungsmetadaten

[assembly: EdmRelationshipAttribute("ODataERPModel", "SalesOrder_Customer", "Customer", System.Data.Metadata.Edm.RelationshipMultiplicity.One, typeof(ODataERP.Customer), "SalesOrder", System.Data.Metadata.Edm.RelationshipMultiplicity.Many, typeof(ODataERP.SalesOrder), true)]
[assembly: EdmRelationshipAttribute("ODataERPModel", "ProductForSalesOrder_Product", "Product", System.Data.Metadata.Edm.RelationshipMultiplicity.One, typeof(ODataERP.Product), "ProductForSalesOrder", System.Data.Metadata.Edm.RelationshipMultiplicity.Many, typeof(ODataERP.ProductForSalesOrder), true)]
[assembly: EdmRelationshipAttribute("ODataERPModel", "SalesOrder_ProductForSalesOrders", "SalesOrder", System.Data.Metadata.Edm.RelationshipMultiplicity.One, typeof(ODataERP.SalesOrder), "ProductForSalesOrder", System.Data.Metadata.Edm.RelationshipMultiplicity.Many, typeof(ODataERP.ProductForSalesOrder), true)]

#endregion

namespace ODataERP
{
    #region Kontexte
    
    /// <summary>
    /// Keine Dokumentation für Metadaten verfügbar.
    /// </summary>
    public partial class ODataERPEntities : ObjectContext
    {
        #region Konstruktoren
    
        /// <summary>
        /// Initialisiert ein neues ODataERPEntities-Objekt mithilfe der in Abschnitt 'ODataERPEntities' der Anwendungskonfigurationsdatei gefundenen Verbindungszeichenfolge.
        /// </summary>
        public ODataERPEntities() : base("name=ODataERPEntities", "ODataERPEntities")
        {
            this.ContextOptions.LazyLoadingEnabled = true;
            OnContextCreated();
        }
    
        /// <summary>
        /// Initialisiert ein neues ODataERPEntities-Objekt.
        /// </summary>
        public ODataERPEntities(string connectionString) : base(connectionString, "ODataERPEntities")
        {
            this.ContextOptions.LazyLoadingEnabled = true;
            OnContextCreated();
        }
    
        /// <summary>
        /// Initialisiert ein neues ODataERPEntities-Objekt.
        /// </summary>
        public ODataERPEntities(EntityConnection connection) : base(connection, "ODataERPEntities")
        {
            this.ContextOptions.LazyLoadingEnabled = true;
            OnContextCreated();
        }
    
        #endregion
    
        #region Partielle Methoden
    
        partial void OnContextCreated();
    
        #endregion
    
        #region ObjectSet-Eigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        public ObjectSet<Customer> Customer
        {
            get
            {
                if ((_Customer == null))
                {
                    _Customer = base.CreateObjectSet<Customer>("Customer");
                }
                return _Customer;
            }
        }
        private ObjectSet<Customer> _Customer;
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        public ObjectSet<Product> Product
        {
            get
            {
                if ((_Product == null))
                {
                    _Product = base.CreateObjectSet<Product>("Product");
                }
                return _Product;
            }
        }
        private ObjectSet<Product> _Product;
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        public ObjectSet<ProductForSalesOrder> ProductForSalesOrder
        {
            get
            {
                if ((_ProductForSalesOrder == null))
                {
                    _ProductForSalesOrder = base.CreateObjectSet<ProductForSalesOrder>("ProductForSalesOrder");
                }
                return _ProductForSalesOrder;
            }
        }
        private ObjectSet<ProductForSalesOrder> _ProductForSalesOrder;
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        public ObjectSet<SalesOrder> SalesOrder
        {
            get
            {
                if ((_SalesOrder == null))
                {
                    _SalesOrder = base.CreateObjectSet<SalesOrder>("SalesOrder");
                }
                return _SalesOrder;
            }
        }
        private ObjectSet<SalesOrder> _SalesOrder;

        #endregion
        #region AddTo-Methoden
    
        /// <summary>
        /// Veraltete Methode zum Hinzufügen eines neuen Objekts zum EntitySet 'Customer'. Verwenden Sie stattdessen die Methode '.Add' der zugeordneten Eigenschaft 'ObjectSet&lt;T&gt;'.
        /// </summary>
        public void AddToCustomer(Customer customer)
        {
            base.AddObject("Customer", customer);
        }
    
        /// <summary>
        /// Veraltete Methode zum Hinzufügen eines neuen Objekts zum EntitySet 'Product'. Verwenden Sie stattdessen die Methode '.Add' der zugeordneten Eigenschaft 'ObjectSet&lt;T&gt;'.
        /// </summary>
        public void AddToProduct(Product product)
        {
            base.AddObject("Product", product);
        }
    
        /// <summary>
        /// Veraltete Methode zum Hinzufügen eines neuen Objekts zum EntitySet 'ProductForSalesOrder'. Verwenden Sie stattdessen die Methode '.Add' der zugeordneten Eigenschaft 'ObjectSet&lt;T&gt;'.
        /// </summary>
        public void AddToProductForSalesOrder(ProductForSalesOrder productForSalesOrder)
        {
            base.AddObject("ProductForSalesOrder", productForSalesOrder);
        }
    
        /// <summary>
        /// Veraltete Methode zum Hinzufügen eines neuen Objekts zum EntitySet 'SalesOrder'. Verwenden Sie stattdessen die Methode '.Add' der zugeordneten Eigenschaft 'ObjectSet&lt;T&gt;'.
        /// </summary>
        public void AddToSalesOrder(SalesOrder salesOrder)
        {
            base.AddObject("SalesOrder", salesOrder);
        }

        #endregion
    }
    

    #endregion
    
    #region Entitäten
    
    /// <summary>
    /// Keine Dokumentation für Metadaten verfügbar.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="ODataERPModel", Name="Customer")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class Customer : EntityObject
    {
        #region Factory-Methode
    
        /// <summary>
        /// Erstellt ein neues Customer-Objekt.
        /// </summary>
        /// <param name="id">Anfangswert der Eigenschaft ID.</param>
        public static Customer CreateCustomer(global::System.Int32 id)
        {
            Customer customer = new Customer();
            customer.ID = id;
            return customer;
        }

        #endregion
        #region Primitive Eigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 ID
        {
            get
            {
                return _ID;
            }
            set
            {
                if (_ID != value)
                {
                    OnIDChanging(value);
                    ReportPropertyChanging("ID");
                    _ID = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("ID");
                    OnIDChanged();
                }
            }
        }
        private global::System.Int32 _ID;
        partial void OnIDChanging(global::System.Int32 value);
        partial void OnIDChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Name
        {
            get
            {
                return _Name;
            }
            set
            {
                OnNameChanging(value);
                ReportPropertyChanging("Name");
                _Name = StructuralObject.SetValidValue(value, true);
                ReportPropertyChanged("Name");
                OnNameChanged();
            }
        }
        private global::System.String _Name;
        partial void OnNameChanging(global::System.String value);
        partial void OnNameChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Address
        {
            get
            {
                return _Address;
            }
            set
            {
                OnAddressChanging(value);
                ReportPropertyChanging("Address");
                _Address = StructuralObject.SetValidValue(value, true);
                ReportPropertyChanged("Address");
                OnAddressChanged();
            }
        }
        private global::System.String _Address;
        partial void OnAddressChanging(global::System.String value);
        partial void OnAddressChanged();

        #endregion
    
        #region Navigationseigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("ODataERPModel", "SalesOrder_Customer", "SalesOrder")]
        public EntityCollection<SalesOrder> SalesOrder
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<SalesOrder>("ODataERPModel.SalesOrder_Customer", "SalesOrder");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<SalesOrder>("ODataERPModel.SalesOrder_Customer", "SalesOrder", value);
                }
            }
        }

        #endregion
    }
    
    /// <summary>
    /// Keine Dokumentation für Metadaten verfügbar.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="ODataERPModel", Name="Product")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class Product : EntityObject
    {
        #region Factory-Methode
    
        /// <summary>
        /// Erstellt ein neues Product-Objekt.
        /// </summary>
        /// <param name="id">Anfangswert der Eigenschaft ID.</param>
        /// <param name="price">Anfangswert der Eigenschaft Price.</param>
        /// <param name="quantity">Anfangswert der Eigenschaft Quantity.</param>
        public static Product CreateProduct(global::System.Int32 id, global::System.Decimal price, global::System.Int32 quantity)
        {
            Product product = new Product();
            product.ID = id;
            product.Price = price;
            product.Quantity = quantity;
            return product;
        }

        #endregion
        #region Primitive Eigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 ID
        {
            get
            {
                return _ID;
            }
            set
            {
                if (_ID != value)
                {
                    OnIDChanging(value);
                    ReportPropertyChanging("ID");
                    _ID = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("ID");
                    OnIDChanged();
                }
            }
        }
        private global::System.Int32 _ID;
        partial void OnIDChanging(global::System.Int32 value);
        partial void OnIDChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String Name
        {
            get
            {
                return _Name;
            }
            set
            {
                OnNameChanging(value);
                ReportPropertyChanging("Name");
                _Name = StructuralObject.SetValidValue(value, true);
                ReportPropertyChanged("Name");
                OnNameChanged();
            }
        }
        private global::System.String _Name;
        partial void OnNameChanging(global::System.String value);
        partial void OnNameChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Decimal Price
        {
            get
            {
                return _Price;
            }
            set
            {
                OnPriceChanging(value);
                ReportPropertyChanging("Price");
                _Price = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("Price");
                OnPriceChanged();
            }
        }
        private global::System.Decimal _Price;
        partial void OnPriceChanging(global::System.Decimal value);
        partial void OnPriceChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 Quantity
        {
            get
            {
                return _Quantity;
            }
            set
            {
                OnQuantityChanging(value);
                ReportPropertyChanging("Quantity");
                _Quantity = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("Quantity");
                OnQuantityChanged();
            }
        }
        private global::System.Int32 _Quantity;
        partial void OnQuantityChanging(global::System.Int32 value);
        partial void OnQuantityChanged();

        #endregion
    
        #region Navigationseigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("ODataERPModel", "ProductForSalesOrder_Product", "ProductForSalesOrder")]
        public EntityCollection<ProductForSalesOrder> ProductForSalesOrder
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<ProductForSalesOrder>("ODataERPModel.ProductForSalesOrder_Product", "ProductForSalesOrder");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<ProductForSalesOrder>("ODataERPModel.ProductForSalesOrder_Product", "ProductForSalesOrder", value);
                }
            }
        }

        #endregion
    }
    
    /// <summary>
    /// Keine Dokumentation für Metadaten verfügbar.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="ODataERPModel", Name="ProductForSalesOrder")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class ProductForSalesOrder : EntityObject
    {
        #region Factory-Methode
    
        /// <summary>
        /// Erstellt ein neues ProductForSalesOrder-Objekt.
        /// </summary>
        /// <param name="id">Anfangswert der Eigenschaft ID.</param>
        /// <param name="quantity">Anfangswert der Eigenschaft Quantity.</param>
        /// <param name="productID">Anfangswert der Eigenschaft ProductID.</param>
        /// <param name="salesOrderID">Anfangswert der Eigenschaft SalesOrderID.</param>
        public static ProductForSalesOrder CreateProductForSalesOrder(global::System.Int32 id, global::System.Int32 quantity, global::System.Int32 productID, global::System.Int32 salesOrderID)
        {
            ProductForSalesOrder productForSalesOrder = new ProductForSalesOrder();
            productForSalesOrder.ID = id;
            productForSalesOrder.Quantity = quantity;
            productForSalesOrder.ProductID = productID;
            productForSalesOrder.SalesOrderID = salesOrderID;
            return productForSalesOrder;
        }

        #endregion
        #region Primitive Eigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 ID
        {
            get
            {
                return _ID;
            }
            set
            {
                if (_ID != value)
                {
                    OnIDChanging(value);
                    ReportPropertyChanging("ID");
                    _ID = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("ID");
                    OnIDChanged();
                }
            }
        }
        private global::System.Int32 _ID;
        partial void OnIDChanging(global::System.Int32 value);
        partial void OnIDChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 Quantity
        {
            get
            {
                return _Quantity;
            }
            set
            {
                OnQuantityChanging(value);
                ReportPropertyChanging("Quantity");
                _Quantity = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("Quantity");
                OnQuantityChanged();
            }
        }
        private global::System.Int32 _Quantity;
        partial void OnQuantityChanging(global::System.Int32 value);
        partial void OnQuantityChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 ProductID
        {
            get
            {
                return _ProductID;
            }
            set
            {
                OnProductIDChanging(value);
                ReportPropertyChanging("ProductID");
                _ProductID = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("ProductID");
                OnProductIDChanged();
            }
        }
        private global::System.Int32 _ProductID;
        partial void OnProductIDChanging(global::System.Int32 value);
        partial void OnProductIDChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 SalesOrderID
        {
            get
            {
                return _SalesOrderID;
            }
            set
            {
                OnSalesOrderIDChanging(value);
                ReportPropertyChanging("SalesOrderID");
                _SalesOrderID = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("SalesOrderID");
                OnSalesOrderIDChanged();
            }
        }
        private global::System.Int32 _SalesOrderID;
        partial void OnSalesOrderIDChanging(global::System.Int32 value);
        partial void OnSalesOrderIDChanged();

        #endregion
    
        #region Navigationseigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("ODataERPModel", "ProductForSalesOrder_Product", "Product")]
        public Product Product
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Product>("ODataERPModel.ProductForSalesOrder_Product", "Product").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Product>("ODataERPModel.ProductForSalesOrder_Product", "Product").Value = value;
            }
        }
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Product> ProductReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Product>("ODataERPModel.ProductForSalesOrder_Product", "Product");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Product>("ODataERPModel.ProductForSalesOrder_Product", "Product", value);
                }
            }
        }
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("ODataERPModel", "SalesOrder_ProductForSalesOrders", "SalesOrder")]
        public SalesOrder SalesOrder
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<SalesOrder>("ODataERPModel.SalesOrder_ProductForSalesOrders", "SalesOrder").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<SalesOrder>("ODataERPModel.SalesOrder_ProductForSalesOrders", "SalesOrder").Value = value;
            }
        }
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<SalesOrder> SalesOrderReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<SalesOrder>("ODataERPModel.SalesOrder_ProductForSalesOrders", "SalesOrder");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<SalesOrder>("ODataERPModel.SalesOrder_ProductForSalesOrders", "SalesOrder", value);
                }
            }
        }

        #endregion
    }
    
    /// <summary>
    /// Keine Dokumentation für Metadaten verfügbar.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="ODataERPModel", Name="SalesOrder")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class SalesOrder : EntityObject
    {
        #region Factory-Methode
    
        /// <summary>
        /// Erstellt ein neues SalesOrder-Objekt.
        /// </summary>
        /// <param name="id">Anfangswert der Eigenschaft ID.</param>
        /// <param name="deliveryDate">Anfangswert der Eigenschaft DeliveryDate.</param>
        /// <param name="paymentTerms">Anfangswert der Eigenschaft PaymentTerms.</param>
        /// <param name="priority">Anfangswert der Eigenschaft Priority.</param>
        /// <param name="customerID">Anfangswert der Eigenschaft CustomerID.</param>
        public static SalesOrder CreateSalesOrder(global::System.Int32 id, global::System.DateTime deliveryDate, global::System.Int32 paymentTerms, global::System.Int32 priority, global::System.Int32 customerID)
        {
            SalesOrder salesOrder = new SalesOrder();
            salesOrder.ID = id;
            salesOrder.DeliveryDate = deliveryDate;
            salesOrder.PaymentTerms = paymentTerms;
            salesOrder.Priority = priority;
            salesOrder.CustomerID = customerID;
            return salesOrder;
        }

        #endregion
        #region Primitive Eigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 ID
        {
            get
            {
                return _ID;
            }
            set
            {
                if (_ID != value)
                {
                    OnIDChanging(value);
                    ReportPropertyChanging("ID");
                    _ID = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("ID");
                    OnIDChanged();
                }
            }
        }
        private global::System.Int32 _ID;
        partial void OnIDChanging(global::System.Int32 value);
        partial void OnIDChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.DateTime DeliveryDate
        {
            get
            {
                return _DeliveryDate;
            }
            set
            {
                OnDeliveryDateChanging(value);
                ReportPropertyChanging("DeliveryDate");
                _DeliveryDate = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("DeliveryDate");
                OnDeliveryDateChanged();
            }
        }
        private global::System.DateTime _DeliveryDate;
        partial void OnDeliveryDateChanging(global::System.DateTime value);
        partial void OnDeliveryDateChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 PaymentTerms
        {
            get
            {
                return _PaymentTerms;
            }
            set
            {
                OnPaymentTermsChanging(value);
                ReportPropertyChanging("PaymentTerms");
                _PaymentTerms = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("PaymentTerms");
                OnPaymentTermsChanged();
            }
        }
        private global::System.Int32 _PaymentTerms;
        partial void OnPaymentTermsChanging(global::System.Int32 value);
        partial void OnPaymentTermsChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 Priority
        {
            get
            {
                return _Priority;
            }
            set
            {
                OnPriorityChanging(value);
                ReportPropertyChanging("Priority");
                _Priority = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("Priority");
                OnPriorityChanged();
            }
        }
        private global::System.Int32 _Priority;
        partial void OnPriorityChanging(global::System.Int32 value);
        partial void OnPriorityChanged();
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 CustomerID
        {
            get
            {
                return _CustomerID;
            }
            set
            {
                OnCustomerIDChanging(value);
                ReportPropertyChanging("CustomerID");
                _CustomerID = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("CustomerID");
                OnCustomerIDChanged();
            }
        }
        private global::System.Int32 _CustomerID;
        partial void OnCustomerIDChanging(global::System.Int32 value);
        partial void OnCustomerIDChanged();

        #endregion
    
        #region Navigationseigenschaften
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("ODataERPModel", "SalesOrder_Customer", "Customer")]
        public Customer Customer
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Customer>("ODataERPModel.SalesOrder_Customer", "Customer").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Customer>("ODataERPModel.SalesOrder_Customer", "Customer").Value = value;
            }
        }
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Customer> CustomerReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Customer>("ODataERPModel.SalesOrder_Customer", "Customer");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Customer>("ODataERPModel.SalesOrder_Customer", "Customer", value);
                }
            }
        }
    
        /// <summary>
        /// Keine Dokumentation für Metadaten verfügbar.
        /// </summary>
        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("ODataERPModel", "SalesOrder_ProductForSalesOrders", "ProductForSalesOrder")]
        public EntityCollection<ProductForSalesOrder> ProductForSalesOrder
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<ProductForSalesOrder>("ODataERPModel.SalesOrder_ProductForSalesOrders", "ProductForSalesOrder");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<ProductForSalesOrder>("ODataERPModel.SalesOrder_ProductForSalesOrders", "ProductForSalesOrder", value);
                }
            }
        }

        #endregion
    }

    #endregion
    
}
