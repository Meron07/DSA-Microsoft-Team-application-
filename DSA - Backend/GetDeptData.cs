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
    public class GetDeptData
    {
        private readonly DSAContext _dsaContext;
        public GetDeptData(DSAContext dsaContext)
        {
            _dsaContext = dsaContext;
        }
        [FunctionName("GetDeptData")]
        public async Task<IActionResult> Run(
            [HttpTrigger("post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var stream = await new StreamReader(req.Body).ReadToEndAsync();
            log.LogInformation("");
            dynamic data = JsonConvert.DeserializeObject<dynamic>(stream);
            string deptName = data?.deptName?.ToString();
            
            log.LogInformation(deptName);

            var teamsDept = _dsaContext.departments.Where(d => d.deptName == deptName);

            string serializedObject = JsonConvert.SerializeObject(teamsDept, Formatting.Indented);

            return new OkObjectResult(serializedObject);
        }
    }
}
