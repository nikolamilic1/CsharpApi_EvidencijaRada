using AutoMapper;
using CsharpApi_EvidencijaRada.Data;
using CsharpApi_EvidencijaRada.Models;
using CsharpApi_EvidencijaRada.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CsharpApi_EvidencijaRada.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    //public class ProjektController:ControllerBase
    //{
    //    // dependency injection

    //    private readonly EvidencijaContext _context;

    //    public ProjektController(EvidencijaContext context)
    //    {
    //        _context = context;
    //    }
    public class ProjektController(EvidencijaContext context, IMapper mapper) : EvidencijaController(context, mapper)
    {



        // RUTE
        [HttpGet]
        //public IActionResult Get()
        //{
        //    return Ok(_context.Projekt);
        //}

        public ActionResult<List<ProjektDTORead>> Get() 
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<ProjektDTORead>>(_context.Projekt));
            }
            catch (Exception ex)
            { 
                return BadRequest(new { poruka = ex.Message });
            }

        }



        [HttpGet]
        [Route("{sifra:int}")]
        //public IActionResult GetBySifra(int sifra)
        //{
        //    return Ok(_context.Projekt.Find(sifra));
        //}
        public ActionResult<ProjektDTORead> GetBySifra(int sifra)         
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(new { poruka = ModelState });
            }
            Projekt? e;
            try
            {
                e = _context.Projekt.Find(sifra);
            }
            catch (Exception ex) 
            { 
                return BadRequest(new {poruka = ex.Message});
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Projekt ne postoji u bazi" });
            }
            return Ok(_mapper.Map<ProjektDTORead>(e));




                
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
