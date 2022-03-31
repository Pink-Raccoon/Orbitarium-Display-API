using Microsoft.EntityFrameworkCore;


namespace Orbitarium_Display_API.Models
{
    public class DisplayDataContext : DbContext
    {
        public DisplayDataContext(DbContextOptions<DisplayDataContext> options)
            : base(options)
        {
        }

        public DbSet<DisplayData> DisplayDataSet { get; set; } = null!;
    }
    
}