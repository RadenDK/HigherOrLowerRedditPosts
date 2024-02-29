using Microsoft.AspNetCore.Mvc;
using DotNetEnv;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Amazon.Runtime;
using System.Xml.Linq;



using System.Text.Json;


namespace api_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyRedditAPIController : ControllerBase
    {

        const string TableName = "topRedditPosts";

        [HttpGet("GetAllPosts")]
        public async Task<IActionResult> GetAllPosts()
        {
            string response = await GetAllDatabaseItemsAsJsonAsync();

            return Ok(response);
        }
        private async Task<string> GetAllDatabaseItemsAsJsonAsync()
        {

            Table table = GetDatabaseTable();

            List<Document> databaseItems = await table.Scan(new ScanFilter()).GetRemainingAsync();

            string databaseItemsAsJson = databaseItems.ToJson();


            return databaseItemsAsJson;
        }


        private AmazonDynamoDBClient GetAWSClient()
        {

            Env.Load();


            string awsAccessKeyId = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
            string awsSecretAccessKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");



            RegionEndpoint awsRegion = RegionEndpoint.EUNorth1;

            BasicAWSCredentials credentials = new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey);
            AmazonDynamoDBClient client = new AmazonDynamoDBClient(credentials, awsRegion);

            return client;
        }

        private Table GetDatabaseTable()
        {
            AmazonDynamoDBClient client = GetAWSClient();
            Table table = Table.LoadTable(client, TableName);

            return table;
        }

    }
}
