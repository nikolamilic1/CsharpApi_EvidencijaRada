using CsharpApi_EvidencijaRada.Data;
using CsharpApi_EvidencijaRada.Models;
using Microsoft.AspNetCore.Mvc;

namespace CsharpApi_EvidencijaRada.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProjektController:ControllerBase
    {
        // dependency injection

        private readonly EvidencijaContext _context;

        public ProjektController(EvidencijaContext context)
        {
            _context = context;
        }

        // RUTE
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Projekt);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Projekt.Find(sifra));
        }

        [HttpPost]
        public IActionResult Post(Projekt projekt)
        {
            _context.Projekt.Add(projekt);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, projekt);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Projekt projekt)
        {
            var projektIzBaze = _context.Projekt.Find(sifra);

            projektIzBaze.Naziv = projekt.Naziv;
            projektIzBaze.Klijent = projekt.Klijent;

            _context.Projekt.Update(projektIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });
        }


        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var projektIzBaze = (_context.Projekt.Find(sifra));
            _context.Projekt.Remove(projektIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano"});
        }



    }
}
