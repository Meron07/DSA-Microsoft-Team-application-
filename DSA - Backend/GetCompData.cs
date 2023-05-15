using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using DSA___Backend.SQLServer;
using System.Linq;

namespace DSA___Backend
{
    public class GetCompData
    {
        private readonly DSAContext _dsaContext;
        public GetCompData(DSAContext dsaContext)
        {
            _dsaContext = dsaContext;
        }
        [FunctionName("GetCompData")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "GET")] HttpRequest req, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            try
            {
                var companyValues = _dsaContext.company.Where(c => c.company == "Inmeta");

                string serializedObject = JsonConvert.SerializeObject(companyValues, Formatting.Indented);

                log.LogInformation(serializedObject);

                return new OkObjectResult(serializedObject);
            }catch(Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
               
        }
        
    }
}
