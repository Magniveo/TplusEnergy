using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyTplus.ModelParser
{
    public class TryParse
    {
        public static DateTime TryParseToDatetime(string inp) 
        {
            DateTime.TryParse(inp, out DateTime res);
            return res;
        }
        public static decimal TryParseToDecimal(string inp)
        {
            inp = inp.Replace(".", ",");
            decimal.TryParse(inp, out decimal res);
            return res;
        }
        public static float TryParseToFloat(string inp)
        {
            float.TryParse(inp, out float res);
            return res;
        }
        public static double TryParseToDouble(string inp)
        {
            inp = inp.Replace(".",",");
            //var style = NumberStyles.AllowExponent;
            //var culture = CultureInfo.CurrentCulture;// .CreateSpecificCulture("ru-RU");
            //double.TryParse(inp, style, culture, out double res);
            double.TryParse(inp, out double res);
            return res;
        }
    }
}
