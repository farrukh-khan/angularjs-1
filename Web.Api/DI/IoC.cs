
using StructureMap;
using StructureMap.Graph;
using System.Web.ApplicationServices;

namespace Web.Api.DI
{
    public static class IoC
    {
        public static IContainer Initialize()
        {
            ObjectFactory.Initialize(x =>
            {
                x.Scan(scan =>
                {
                    scan.WithDefaultConventions();
                    scan.TheCallingAssembly();
                    //scan.Assembly("DataAccess");
                    //scan.Assembly("Service");

                });

              
            });
            return ObjectFactory.Container;
        }
    }
}


