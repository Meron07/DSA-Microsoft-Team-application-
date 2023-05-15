using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DSA___Backend.SQLServer;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.DependencyInjection;
[assembly:FunctionsStartup(typeof(DSA___Backend.Startup))]
namespace DSA___Backend
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            string connection = Environment.GetEnvironmentVariable("sqldb_connection");
            builder.Services.AddDbContext<DSAContext>(
                options => SqlServerDbContextOptionsExtensions.UseSqlServer(options, connection));
        }
        
    }
}
