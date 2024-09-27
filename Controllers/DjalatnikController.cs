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











    }

}
