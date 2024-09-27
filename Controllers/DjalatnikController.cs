﻿using AutoMapper;
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









    }

}
