using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyTplus.Model
{
    public class HouseModel
    {
        [Key]
        public int HouseModelID { get; set; }
        public string HouseModelName { get; set; }
        public DateTime Date { get; set; }
        public double Weather { get; set; }
        public double Consumption { get; set; }
    }
}
