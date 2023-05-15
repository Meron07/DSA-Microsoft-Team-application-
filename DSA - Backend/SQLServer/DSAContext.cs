using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Graph;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DSA___Backend.SQLServer
{

    public class DSAContext : DbContext
    {

        public DSAContext(DbContextOptions<DSAContext> options) : base(options) { }
        public DbSet<User> users { get; set; }
        public DbSet<Department> departments { get; set; }
        public DbSet<Company> company { get; set; }
        public DbSet<Tips> tips { get; set; }

        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("users");
            builder.ToTable("departments");
            builder.ToTable("companies");
            builder.ToTable("toolTips");
        }
    }
}


