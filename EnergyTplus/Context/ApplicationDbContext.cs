using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyTplus.Context
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Model.HouseModel> HouseModels { get; set; }
        public DbSet<Model.Plant> Plants { get; set; }
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }
    }
}
