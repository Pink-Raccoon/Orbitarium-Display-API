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

        /**
         * <summary>
         * Get the newest/last DisplayData in the context.
         * </summary>
         * <returns>The last element in the Dataset or null if it's empty</returns> 
         */
        public DisplayData? Last()
        {
            if(DisplayDataSet.Any()) return DisplayDataSet.LastOrDefault();
            return null;
        }
    }    
}