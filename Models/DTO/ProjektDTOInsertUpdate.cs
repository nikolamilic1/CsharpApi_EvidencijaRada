using System.ComponentModel.DataAnnotations;

namespace CsharpApi_EvidencijaRada.Models.DTO
{
    public record ProjektDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezno")]
        string Naziv,
        [Required(ErrorMessage = "Klijent obavezno")]
        string Klijent,
        DateTime Pocetak,
        DateTime Zavrsetak,
        int ProjektNaziv,
        string Opis
        );
}
