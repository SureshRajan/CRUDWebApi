using System.Data.Entity;

namespace WebApiServerClient.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ProductDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
    }
}