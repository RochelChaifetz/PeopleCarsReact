using Microsoft.EntityFrameworkCore;

namespace PeopleCarsReact.Data
{
    public class PeopleDbContext : DbContext
    {
        private string _connectionString;

        public PeopleDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Person> People { get; set; }
        public DbSet<Car> Cars { get; set; }
    }
}
