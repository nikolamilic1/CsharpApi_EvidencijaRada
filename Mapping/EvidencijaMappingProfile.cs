using AutoMapper;
using CsharpApi_EvidencijaRada.Models;
using CsharpApi_EvidencijaRada.Models.DTO;

namespace CsharpApi_EvidencijaRada.Mapping
{
    public class EvidencijaMappingProfile:Profile
    {
        public EvidencijaMappingProfile()
        {
            //kreiranje mapiranja: izvor, odredište
            CreateMap<Projekt, ProjektDTORead>();
            CreateMap<ProjektDTORead, Projekt>();
            CreateMap<ProjektDTOInsertUpdate, Projekt>();

            CreateMap<Djelatnik, DjelatnikDTORead>();
            CreateMap<DjelatnikDTORead, Djelatnik>();
            CreateMap<DjelatnikDTOInsertUpdate, Djelatnik>();
        }
            
    }
}
