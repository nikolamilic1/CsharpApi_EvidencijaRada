namespace CsharpApi_EvidencijaRada.Models.DTO
{
    public record ZadatakDTORead(
        int sifra,
        string? Naziv,
        DateTime? Pocetak,
        DateTime? Zavrsetak,
        string? ProjektNaziv,
        string? Opis
        );
    
}
