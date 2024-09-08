using CsharpApi_EvidencijaRada.Models;
using Microsoft.EntityFrameworkCore;

namespace CsharpApi_EvidencijaRada.Data
{

    

    public class EvidencijaContext:DbContext
    {
        public EvidencijaContext(DbContextOptions<EvidencijaContext> opcije) : base(opcije) { }
       
      //  public DbSet<Projekt> Projekti { get; set; }

        
        public DbSet<Projekt> Projekt { get; set; }

        public DbSet<Djelatnik> Djelatnik { get; set; }

        
    }
}
