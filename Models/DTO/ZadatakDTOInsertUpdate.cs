using System.ComponentModel.DataAnnotations;

namespace CsharpApi_EvidencijaRada.Models.DTO
{
    public record ZadatakDTOInsertUpdate(
                [Required(ErrorMessage = "Naziv obavezno")]
                string? Naziv,
              //  [Required(ErrorMessage = "Datum početka obavezno")]
                DateTime? Pocetak,

                DateTime? Zavrsetak,
                [Range(1, int.MaxValue, ErrorMessage = "{0} mora biti između {1} i {2}")]
                [Required(ErrorMessage = "Projekt obavezno")]
                int ProjektSifra,

                string? Opis


        );


}
