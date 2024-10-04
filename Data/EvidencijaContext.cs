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

        public DbSet<Zadatak> Zadatak { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //implementacija veze 1:n
            modelBuilder.Entity<Zadatak>().HasOne(g => g.Projekt);


            //implementacija veze n:n
            modelBuilder.Entity<Zadatak>()
                .HasMany(g => g.Djelatnik)
                .WithMany(p => p.Zadatak)
                .UsingEntity<Dictionary<string, object>>("evidencija_rada",
                c => c.HasOne<Djelatnik>().WithMany().HasForeignKey("djelatnik"),
                c => c.HasOne<Zadatak>().WithMany().HasForeignKey("zadatak"),
                c => c.ToTable("evidencija_rada")
                );

        }


    }
}
