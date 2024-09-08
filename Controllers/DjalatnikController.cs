using CsharpApi_EvidencijaRada.Data;
using CsharpApi_EvidencijaRada.Models;
using Microsoft.AspNetCore.Mvc;

namespace CsharpApi_EvidencijaRada.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DjalatnikController : ControllerBase
    {

        private readonly EvidencijaContext _context;


        public DjalatnikController(EvidencijaContext context)
        {
            _context = context;
        }

        // RUTE

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Djelatnik);
        }

        [HttpGet]
        [Route("{sifra:int")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Djelatnik.Find(sifra));
        }
        [HttpPost]
        public IActionResult Post(Djelatnik djelatnik)
        {
            _context.Djelatnik.Add(djelatnik);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, djelatnik);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Djelatnik djelatnik)
        {
            var djelatnikIzBaze = _context.Djelatnik.Find(sifra);

            djelatnikIzBaze.Ime = djelatnik.Ime;
            djelatnikIzBaze.Prezime = djelatnik.Prezime;
            djelatnikIzBaze.Email = djelatnik.Email;


        }




    }
}
