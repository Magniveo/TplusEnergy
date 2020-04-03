using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml;
using System.IO;
using System.Xml.XPath;
using System.Text;
using System.Xml.Linq;
using EnergyTplus.ModelParser;
using EnergyTplus.Model;
using EnergyTplus.Context;
using Microsoft.EntityFrameworkCore;

namespace EnergyTplus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class XmlFileStructureController  : Controller
    {
        private readonly ApplicationDbContext _context;

        public XmlFileStructureController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        //[Route("SaveFile")]
        public async Task<IActionResult> Post([FromForm]IFormFile xmlFile) 
        {
            //var memoryStream = new MemoryStream();
            //await xmlFile.CopyToAsync(memoryStream);
            //using (var reader = new StreamReader(memoryStream))
            //{
            //    try
            //    {
            //        var xDoc = new XmlDocument();
            //        xDoc.Load(reader);
            //    }
            //    catch(Exception ex) 
            //    {
            //    }
            //}
            //try
            //{
            //    var doc = XDocument.Load(@"C:\Users\micha\Downloads\Тестовое задание Кирпичный город.xml");
            //}
            //catch (Exception ex)
            //{
            //}
            try
            {
                
                //"utf-8" --, Encoding.GetEncoding("windows-1251")
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                var srcEncoding = Encoding.GetEncoding("windows-1251");
                var rs = new StreamReader(xmlFile.OpenReadStream(),encoding: srcEncoding);
                var UTF8 = Encoding.UTF8; 
                var inpstr = rs.ReadToEnd().Replace("windows-1251", "utf-8");
                //byte[] bytes = Encoding.Default.GetBytes(rs.ReadToEnd());// encoding = "windows-1251"
                //var myString = Encoding.UTF8.GetString(bytes);
                var doc = XDocument.Parse(inpstr);
                var dataHouses = doc.Descendants("houses");
                var plants = doc.Descendants("plants");
                _context.Database.ExecuteSqlCommand("delete from HouseModels");
                _context.Database.ExecuteSqlCommand("delete from Plants");
                foreach (XElement element in dataHouses.Descendants("house"))
                {
                    var houseName = UTF8ToWin1251( element.Attribute("Name").Value);
                    var houseData = element.Elements("dates");
                    var dates = houseData.Select(x => new HouseModel
                    {  
                        HouseModelID = 0,
                        HouseModelName = houseName,
                        Date = TryParse.TryParseToDatetime(x.Attribute("Date").Value),
                        Weather = TryParse.TryParseToDouble(x.Attribute("Weather").Value), 
                        Consumption = TryParse.TryParseToDouble(x.Attribute("Consumption").Value) }
                    );
                    foreach (var hsmdl in dates)
                    {
                        _context.HouseModels.Add(hsmdl);
                        await _context.SaveChangesAsync();
                    }
                }
                foreach (XElement element in plants.Descendants("plant"))
                {
                    var plantsName = element.Attribute("Name").Value;
                    var plantData = element.Elements("dates");
                    var dates = plantData.Select(x => new Plant
                    {
                        PlantID = 0,
                        PlantName = plantsName,
                        Date = TryParse.TryParseToDatetime(x.Attribute("Date").Value),
                        Price = TryParse.TryParseToDouble(x.Attribute("Price").Value),
                        Consumption = TryParse.TryParseToDouble(x.Attribute("Consumption").Value)
                    });
                    foreach (var hsmdl in dates)
                    {
                        _context.Plants.Add(hsmdl);
                        await _context.SaveChangesAsync();
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return View();
        }
        private static string UTF8ToWin1251(string sourceStr)
        {
            Encoding utf8 = Encoding.UTF8;
            Encoding win1251 = Encoding.GetEncoding("windows-1251");
            byte[] utf8Bytes = utf8.GetBytes(sourceStr);
            byte[] win1251Bytes = Encoding.Convert(utf8, win1251, utf8Bytes);
            return win1251.GetString(win1251Bytes);
        }
    }
}