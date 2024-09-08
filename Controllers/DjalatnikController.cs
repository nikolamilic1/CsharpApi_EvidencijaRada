using CsharpApi_EvidencijaRada.Data;
using Microsoft.AspNetCore.Mvc;

namespace CsharpApi_EvidencijaRada.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DjalatnikController:ControllerBase
    {

        private readonly EvidencijaContext _context;


        public DjalatnikController(EvidencijaContext context)
        {
            _context = context;
        }

    

    }
}
