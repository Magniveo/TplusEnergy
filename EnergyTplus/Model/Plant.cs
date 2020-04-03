using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyTplus.Model
{
    public class Plant
    {
        [Key]
        public int PlantID { get; set; }
        public string PlantName { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
        public double Consumption { get; set; }
    }
}
