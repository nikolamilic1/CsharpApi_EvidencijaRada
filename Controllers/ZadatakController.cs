using AutoMapper;
using CsharpApi_EvidencijaRada.Data;
using CsharpApi_EvidencijaRada.Models;
using CsharpApi_EvidencijaRada.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CsharpApi_EvidencijaRada.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ZadatakController(EvidencijaContext context, IMapper mapper) : EvidencijaController(context, mapper)
    {

        // RUTE
        [HttpGet]
        public ActionResult<List<ZadatakDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<ZadatakDTORead>>(_context.Zadatak.Include(g => g.Projekt)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }



        [HttpGet]
        [Route("{sifra:int}")]
        public ActionResult<ZadatakDTOInsertUpdate> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Zadatak? e;
            try
            {

                e = _context.Zadatak.Include(g => g.Projekt).FirstOrDefault(g => g.Sifra == sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Zadatak ne postoji u bazi" });
            }

            return Ok(_mapper.Map<ZadatakDTOInsertUpdate>(e));
        }



        [HttpPost]
        public IActionResult Post(ZadatakDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Projekt? es;
            try
            {
                es = _context.Projekt.Find(dto.ProjektSifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Zadatak na projektu ne postoji u bazi" });
            }

            try
            {
                var e = _mapper.Map<Zadatak>(dto);
                e.Projekt = es;
                _context.Zadatak.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<ZadatakDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }



        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, ZadatakDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Zadatak? e;
                try
                {
                    e = _context.Zadatak.Include(g => g.Projekt).FirstOrDefault(x => x.Sifra == sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Zadatak ne postoji u bazi" });
                }

                Projekt? es;
                try
                {
                    es = _context.Projekt.Find(dto.ProjektSifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (es == null)
                {
                    return NotFound(new { poruka = "Projekt na zadatku ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);
                e.Projekt = es;
                _context.Zadatak.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Zadatak? e;
                try
                {
                    e = _context.Zadatak.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Zadatak ne postoji u bazi");
                }
                _context.Zadatak.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("Djelatnik/{sifraZadatak:int}")]
        public ActionResult<List<DjelatnikDTORead>> GetDjelatnici(int sifraZadatak)
        {
            if (!ModelState.IsValid || sifraZadatak <= 0)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var p = _context.Zadatak
                    .Include(i => i.Djelatnik).FirstOrDefault(x => x.Sifra == sifraZadatak);
                if (p == null)
                {
                    return BadRequest("Ne postoji zadatak s šifrom " + sifraZadatak + " u bazi");
                }

                return Ok(_mapper.Map<List<DjelatnikDTORead>>(p.Djelatnik));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
        

        [HttpPost]
        [Route("{sifra:int}/dodaj/{djelatnikSifra:int}")]
        public IActionResult DodajDjelatnika(int sifra, int djelatnikSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || djelatnikSifra <= 0)
            {
                return BadRequest("Šifra zadatka ili djelatnika nije dobra");
            }
            try
            {
                var zadatak = _context.Zadatak
                    .Include(g => g.Djelatnik)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (zadatak == null)
                {
                    return BadRequest("Ne postoji zadatak s šifrom " + sifra + " u bazi");
                }
                var djelatnik = _context.Djelatnik.Find(djelatnikSifra);
                if (djelatnik == null)
                {
                    return BadRequest("Ne postoji djelatnik s šifrom " + djelatnikSifra + " u bazi");
                }
                zadatak.Djelatnik.Add(djelatnik);
                _context.Zadatak.Update(zadatak);
                _context.SaveChanges();
                return Ok(new
                {
                    poruka = "Djelatnik " + djelatnik.Prezime + " " + djelatnik.Ime + " dodan na grupu "
                 + zadatak.Naziv
                });
            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);
            }
        }

        [HttpDelete]
        [Route("{sifra:int}/obrisi/{djelatnikSifra:int}")]
        public IActionResult ObrisiDjelatnika(int sifra, int djelatnikSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (sifra <= 0 || djelatnikSifra <= 0)
            {
                return BadRequest("Šifra zadatka ili djelatnika nije dobra");
            }
            try
            {
                var zadatak = _context.Zadatak
                    .Include(g => g.Djelatnik)
                    .FirstOrDefault(g => g.Sifra == sifra);
                if (zadatak == null)
                {
                    return BadRequest("Ne postoji zadatak s šifrom " + sifra + " u bazi");
                }
                var djelatnik = _context.Djelatnik.Find(djelatnikSifra);
                if (djelatnik == null)
                {
                    return BadRequest("Ne postoji djelatnik s šifrom " + djelatnikSifra + " u bazi");
                }
                zadatak.Djelatnik.Remove(djelatnik);
                _context.Zadatak.Update(zadatak);
                _context.SaveChanges();

                return Ok(new
                {
                    poruka = "Djelatnik " + djelatnik.Prezime + " " + djelatnik.Ime + " je obrisan sa zadatka "
                 + zadatak.Naziv
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });

            }
        }



    }
}
