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
    [Table("toolTips", Schema = "DSA")]
    public class Tips
    {
        [Key]
        [JsonProperty("id")]
        public int id { get; set; }
        [JsonProperty("hint")]
        public string hint { get; set; }
    }
}
