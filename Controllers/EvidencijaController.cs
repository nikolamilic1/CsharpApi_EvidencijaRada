using AutoMapper;
using CsharpApi_EvidencijaRada.Data;
using Microsoft.AspNetCore.Mvc;

namespace CsharpApi_EvidencijaRada.Controllers
{
    public abstract class EvidencijaController:ControllerBase
    {

        //dependecy injection
        // 1. definiranje privatnog svojstva
        
        protected readonly EvidencijaContext _context;

        protected readonly IMapper _mapper;

        //dependecy injection
        // 2. proslijđivanje instance kroz konstruktor
        public EvidencijaController(EvidencijaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


    }
}
