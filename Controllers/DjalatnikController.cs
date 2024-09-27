using AutoMapper;
using CsharpApi_EvidencijaRada.Data;
using CsharpApi_EvidencijaRada.Models;
using CsharpApi_EvidencijaRada.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CsharpApi_EvidencijaRada.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class DjelatnikController(EvidencijaContext context, IMapper mapper) : EvidencijaController(context, mapper)
    {
        // RUTE
        [HttpGet]
        public ActionResult<List<DjelatnikDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<DjelatnikDTORead>>(_context.Djelatnik));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<DjelatnikDTORead> GetBySifra(int sifra) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Djelatnik? e;
            try
            {
                e = _context.Djelatnik.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Djelatnik ne postoji u bazi" });
            }

            return Ok(_mapper.Map<DjelatnikDTORead>(e));
        }

        [HttpPost]
        public IActionResult Post(DjelatnikDTOInsertUpdate djelatnikDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = _mapper.Map<Djelatnik>(djelatnikDTO);
                _context.Djelatnik.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<DjelatnikDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, DjelatnikDTOInsertUpdate djelatnikDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Djelatnik? e;
                try
                {
                    e = _context.Djelatnik.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Djelatnik ne postoji u bazi" });
                }

                e = _mapper.Map(djelatnikDTO, e);

                _context.Djelatnik.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }








    }

}
