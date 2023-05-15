using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Net.Http.Headers;
using System.Threading;
using Microsoft.Azure.WebJobs;
using System.Threading.Tasks;
using ExecutionContext = Microsoft.Azure.WebJobs.ExecutionContext;

namespace DSA___Backend
{
    internal class GraphClient
    {
        public static async Task<GraphServiceClient> CreateGraphClientForApp(ExecutionContext context, ILogger log)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;
            string tenantId = string.Empty;
            string siteID = string.Empty;
            string listID = string.Empty;
            // Fetch values from Azure Function Configuration
            try
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(context.FunctionAppDirectory)
                    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();

                clientId = config["ClientID"];
                //Get Azure APP secret from Keyvault
                tenantId = config["TenantID"];
                clientSecret = config["ClientSecret"];

                if (string.IsNullOrEmpty(clientSecret) || string.IsNullOrEmpty(tenantId) || string.IsNullOrEmpty(clientSecret))
                {
                    log.LogInformation("Finner ikke clientid/tentant/secerte");
                }




            }
            catch (Exception exp)
            {
                log.LogInformation($"Error fetching config");
                log.LogError(exp.Message);
                log.LogError(exp.InnerException.ToString());
                log.LogError(exp.Source.ToString());
            }

            IConfidentialClientApplication confidentialClientApplication = ConfidentialClientApplicationBuilder
                   .Create(clientId)
                   .WithTenantId(tenantId)
                   .WithClientSecret(clientSecret)
                   .Build();

            // Acquire tokens for Graph API
            var scopes = new[] { "https://graph.microsoft.com/.default" };
            var authenticationResult = await confidentialClientApplication.AcquireTokenForClient(scopes).ExecuteAsync();


            // Create GraphClient and attach auth header to all request (acquired on previous step)
            var graphClient = new GraphServiceClient(
                new DelegateAuthenticationProvider(requestMessage =>
                {
                    requestMessage.Headers.Authorization =
                        new AuthenticationHeaderValue("bearer", authenticationResult.AccessToken);
                    return Task.FromResult(0);
                }));


            return graphClient;

        }
    }
}
