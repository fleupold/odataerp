using System;
using System.Collections.Generic;
using System.Data.Services;
using System.Data.Services.Common;
using System.Linq;
using System.ServiceModel.Web;
using System.Web;

namespace ODataERP
{
    public class ODataERP : DataService< ODataERPEntities >
    {
        // Diese Methode wird nur einmal aufgerufen, um dienstweite Richtlinien zu initialisieren.
        public static void InitializeService(DataServiceConfiguration config)
        {
            // TODO: Regeln festlegen, die angeben, welche Entitätssets und welche Dienstvorgänge sichtbar, aktualisierbar usw. sind
            // Beispiele:
            config.SetEntitySetAccessRule("*", EntitySetRights.);
            // config.SetServiceOperationAccessRule("MyServiceOperation", ServiceOperationRights.All);
            config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V2;
        }
    }
}
