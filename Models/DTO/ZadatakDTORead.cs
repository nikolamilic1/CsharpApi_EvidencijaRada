namespace CsharpApi_EvidencijaRada.Models.DTO
{
    public record ZadatakDTORead(
        int Sifra,
        string? Naziv,
        DateTime? Pocetak,
        DateTime? Zavrsetak,
        string? Projekt,
        string? Opis
        );
    
}
