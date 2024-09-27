using System.ComponentModel.DataAnnotations;

namespace CsharpApi_EvidencijaRada.Models.DTO
{
    public record DjelatnikDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string? Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string? Prezime,
        [Required(ErrorMessage = "Email obavezno")]
        [EmailAddress(ErrorMessage = "Email nije dobrog formata")]
        string? Email);

}
