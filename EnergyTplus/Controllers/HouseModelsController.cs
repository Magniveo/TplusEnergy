using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnergyTplus.Context;
using EnergyTplus.Model;

namespace EnergyTplus.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HouseModelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HouseModelsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/HouseModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HouseModel>>> GetHouseModels()
        {
            return await _context.HouseModels.ToListAsync();
        }

        // GET: api/HouseModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HouseModel>> GetHouseModel(int id)
        {
            var houseModel = await _context.HouseModels.FindAsync(id);

            if (houseModel == null)
            {
                return NotFound();
            }

            return houseModel;
        }

        // PUT: api/HouseModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHouseModel(int id, HouseModel houseModel)
        {
            if (id != houseModel.HouseModelID)
            {
                return BadRequest();
            }

            _context.Entry(houseModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HouseModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HouseModels
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<HouseModel>> PostHouseModel(HouseModel houseModel)
        {
            _context.HouseModels.Add(houseModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHouseModel", new { id = houseModel.HouseModelID }, houseModel);
        }

        // DELETE: api/HouseModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HouseModel>> DeleteHouseModel(int id)
        {
            var houseModel = await _context.HouseModels.FindAsync(id);
            if (houseModel == null)
            {
                return NotFound();
            }

            _context.HouseModels.Remove(houseModel);
            await _context.SaveChangesAsync();

            return houseModel;
        }

        private bool HouseModelExists(int id)
        {
            return _context.HouseModels.Any(e => e.HouseModelID == id);
        }
    }
}
