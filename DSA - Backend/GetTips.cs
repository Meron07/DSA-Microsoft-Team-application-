using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using DSA___Backend.SQLServer;
using System.Linq;

namespace DSA___Backend
{
    public class GetTips
    {
        private readonly DSAContext _dsaContext;
        public GetTips(DSAContext dsaContext)
        {
            _dsaContext = dsaContext;
        }
        [FunctionName("GetTips")]
        public async Task<IActionResult> Run(
            [HttpTrigger("post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var stream = await new StreamReader(req.Body).ReadToEndAsync();
            log.LogInformation("");
            dynamic data = JsonConvert.DeserializeObject<dynamic>(stream);

            int id = data?.id;  
             
            log.LogInformation($"{id}");

          

            var infoTips = _dsaContext.tips.Where(t => t.id == id);

            string serializedObject = JsonConvert.SerializeObject(infoTips, Formatting.Indented);

            return new OkObjectResult(serializedObject);
        }
    }
}
