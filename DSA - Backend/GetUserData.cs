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
    public class GetUserData
    {
        private readonly DSAContext _dsaContext;
        public GetUserData(DSAContext dsaContext)
        {
            _dsaContext = dsaContext;
        }
          [FunctionName("GetUserData")]
            public async Task<IActionResult> Run(
            [HttpTrigger("POST")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var stream = await new StreamReader(req.Body).ReadToEndAsync();

            log.LogInformation("");
            dynamic data = JsonConvert.DeserializeObject<dynamic>(stream);
            string email = data?.email?.ToString();
            log.LogInformation(email);


            if (!email.Contains("@"))
            {

                log.LogInformation("This is not an Email");
                return new BadRequestObjectResult("Invalid Email");
            }

            var teamsUser = _dsaContext.users.Where(u => u.email == email);

            string serializedObject = JsonConvert.SerializeObject(teamsUser, Formatting.Indented);



            log.LogInformation(serializedObject);

            return new OkObjectResult(serializedObject);
        }
    }
}
