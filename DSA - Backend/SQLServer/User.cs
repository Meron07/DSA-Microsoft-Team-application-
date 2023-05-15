using Microsoft.Graph.ExternalConnectors;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DSA___Backend.SQLServer
{
    [Table("users", Schema = "DSA")]
    public class User
    {
        [Key]
        [JsonProperty("id")]
        public string id { get; set; }
        [JsonProperty("email")]
        public string email { get; set; }
        [JsonProperty("OneDriveFiles")]
        public int? OneDriveFiles { get; set; }
        [JsonProperty("OneDriveActiveFiles")]
        public int? OneDriveActiveFiles { get; set; }

        [JsonProperty("TotalDriveSize")]
        public double? TotalDriveSize { get; set; }
        [JsonProperty("totalInboxmail")]
        public int? totalInboxmail { get; set; }
        [JsonProperty("totalEmailsSent")]
        public int? totalEmailsSent { get; set; }
        [JsonProperty("TeamsCallCount")]
        public int? TeamsCallCount { get; set; }
        [JsonProperty("TeamsMeetingCount")]
        public int? TeamsMeetingCount { get; set; }
        [JsonProperty("TeamsChatMessageCount")]
        public int? TeamsChatMessageCount { get; set; }
        [JsonProperty("TeamsPrivateMessageCount")]
        public int? TeamsPrivateMessageCount { get; set; }
        [JsonProperty("TeamsAudioDuration")]
        public int? TeamsAudioDuration { get; set; }
        [JsonProperty("TeamsVideoDuration")]
        public int? TeamsVideoDuration { get; set; }
        [JsonProperty("TeamsScreenshareDuration")]
        public int? TeamsScreenshareDuration { get; set; }
        public double? CO2OneDrive { get; set; }
        public double? CO2Outlook { get; set; }
        public double? TeamsAudioCO2 { get; set; }
        public double? TeamsVideoCO2 { get; set; }
        public double? TeamsScreenShareCO2 { get; set; }
        [JsonProperty("deptName")]
        public string deptName { get; set; }
    }
}
