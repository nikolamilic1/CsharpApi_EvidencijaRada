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

            CreateMap<Zadatak, ZadatakDTORead>()
                .ForMember(
                dest => dest.ProjektNaziv,
                opt => opt.MapFrom(src => src.Projekt.Naziv)
                );
            CreateMap<Zadatak, ZadatakDTOInsertUpdate>().ForMember(
                dest => dest.ProjektSifra,
                opt => opt.MapFrom(src => src.Projekt.Sifra)
                );
            CreateMap<ZadatakDTOInsertUpdate, Zadatak>();
        }
            
    }
}
