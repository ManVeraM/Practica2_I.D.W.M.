using Microsoft.EntityFrameworkCore;

namespace Practica2_IDWM.Models;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;

    public DbSet<Hobbie> Hobbies { get; set; } = null!;

    public DbSet<Framework> Frameworks { get; set; } = null!;
}