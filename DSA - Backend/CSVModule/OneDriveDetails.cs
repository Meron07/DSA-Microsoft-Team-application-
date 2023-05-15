using CsvHelper.Configuration.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DSA___Backend.CSVModule
{
    public class OneDriveDetails
    {


        [Name("Owner Display Name")]
        public string OwnerName { get; set; }

        [Name("Last Activity Date")]
        public string LastActivityDate { get; set; }
        [Name("Active File Count")]
        public string ActiveFileCount { get; set; }

        [Name("Storage Used (Byte)")]
        public string StorageUsedByte { get; set; }

        [Name("Owner Principal Name")]
        public string OwnerPrincipalName { get; set; }

        [Name("File Count")]
        public string FileCount { get; set; }


    }
}
