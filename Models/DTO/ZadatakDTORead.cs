namespace CsharpApi_EvidencijaRada.Models.DTO
{
    public record ZadatakDTORead(
        int sifra,
        DateTime? Pocetak,
        DateTime? Zavrsetak,
        string? ProjektNaziv,
        string? Opis
        );
    
}
