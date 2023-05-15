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

    [Table("company", Schema = "DSA")]
    public class Company
    {
        [Key]
        [JsonProperty("company")]
        public string company { get; set; }
        [JsonProperty("compOneDriveFiles")]
        public int? compOneDriveFiles { get; set; }
        [JsonProperty("compOneDriveActiveFiles")]
        public int? compOneDriveActiveFiles { get; set; }
        [JsonProperty("compTotalDriveSize")]
        public double? compTotalDriveSize { get; set; }
        [JsonProperty("compTotalInboxMail")]
        public int? compTotalInboxMail { get; set; }
        [JsonProperty("compTotalEmailsSent")]
        public int? compTotalEmailsSent { get; set; }
        [JsonProperty("compTeamsCallCount")]
        public int? compTeamsCallCount { get; set; }
        [JsonProperty("compTeamsMeetingCount")]
        public int? compTeamsMeetingCount { get; set; }
        [JsonProperty("compTeamsChatMessageCount")]
        public int? compTeamsChatMessageCount { get; set; }
        [JsonProperty("compTeamsPrivateMessageCount")]
        public int? compTeamsPrivateMessageCount { get; set; }
        [JsonProperty("compTeamsAudioDuration")]
        public int? compTeamsAudioDuration { get; set; }
        [JsonProperty("compTeamsVideoDuration")]
        public int? compTeamsVideoDuration { get; set; }
        [JsonProperty("compTeamsScreenshareDuration")]
        public int? compTeamsScreenshareDuration { get; set; }
        [JsonProperty("SharePointTotalSizeMB")]
        public int? SharePointTotalSizeMB { get; set; }
        public double? compCO2OneDrive { get; set; }
        public double? compCO2Outlook { get; set; }
        public double? compCO2SharePoint { get; set; }
        public double? compTeamsAudioCO2 { get; set; }
        public double? compTeamsVideoCO2 { get; set; }
        public double? compTeamsScreenShareCO2 { get; set; }

    }
}
