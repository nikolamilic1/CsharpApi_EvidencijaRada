namespace CsharpApi_EvidencijaRada.Models
{
    public class Djelatnik:Entitet
    {

        public string? Ime { get; set; }

        public string? Prezime { get; set; }

        public string? Email { get; set; }

        public ICollection<Zadatak>? Zadatak { get; } = [];

    }
}
