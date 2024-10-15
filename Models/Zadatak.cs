using System.ComponentModel.DataAnnotations.Schema;

namespace CsharpApi_EvidencijaRada.Models
{
    public class Zadatak:Entitet
    {
        public string? Naziv {  get; set; }

        public DateTime? Pocetak {  get; set; }

        public DateTime? Zavrsetak { get; set; }

        [ForeignKey("projekt")]
        public required Projekt Projekt { get; set; }

        public string? Opis { get; set; }

        public ICollection<Djelatnik>? Djelatnik { get; set; }


    }
}
