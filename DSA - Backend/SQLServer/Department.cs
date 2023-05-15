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
    [Table("departments", Schema = "DSA")]
    public class Department
    {
        [Key]
        [JsonProperty("deptName")]
        public string deptName { get; set; }
        [JsonProperty("deptOneDriveFiles")]
        public int? deptOneDriveFiles { get; set; }
        [JsonProperty("deptOneDriveActiveFiles")]
        public int? deptOneDriveActiveFiles { get; set; }
        [JsonProperty("deptTotalDriveSize")]
        public double? deptTotalDriveSize { get; set; }
        [JsonProperty("deptTotalInboxMail")]
        public int? deptTotalInboxMail { get; set; }
        [JsonProperty("deptTotalEmailsSent")]
        public int? deptTotalEmailsSent { get; set; }
        [JsonProperty("deptTeamsCallCount")]
        public int? deptTeamsCallCount { get; set; }
        [JsonProperty("deptTeamsMeetingCount")]
        public int? deptTeamsMeetingCount { get; set; }
        [JsonProperty("deptTeamsChatMessageCount")]
        public int? deptTeamsChatMessageCount { get; set; }
        [JsonProperty("deptTeamsPrivateMessageCount")]
        public int? deptTeamsPrivateMessageCount { get; set; }
        [JsonProperty("deptTeamsAudioDuration")]
        public int? deptTeamsAudioDuration { get; set; }
        [JsonProperty("deptTeamsVideoDuration")]
        public int? deptTeamsVideoDuration { get; set; }
        [JsonProperty("deptTeamsScreenshareDuration")]
        public int? deptTeamsScreenshareDuration { get; set; }
        public double? deptCO2OneDrive { get; set; }
        public double? deptCO2Outlook { get; set; }
        public double? deptTeamsAudioCO2 { get; set; }
        public double? deptTeamsVideoCO2 { get; set; }
        public double? deptTeamsScreenShareCO2 { get; set; }
        [JsonProperty("company")]
        public string company { get; set; }

    }
}
