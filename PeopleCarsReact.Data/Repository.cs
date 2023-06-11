using Microsoft.EntityFrameworkCore;

namespace PeopleCarsReact.Data
{
    public class Repository
    {
        private string _connectionString;

        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAllPeople()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public Person GetPerson(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public void AddCar(Car c)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.Cars.Add(c);
            context.SaveChanges();
        }

        public List<Car> GetCarsByPerson(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }

        public void DeleteCars(int id)
        {
            using var context = new PeopleDbContext(_connectionString);
            var cars = GetCarsByPerson(id);
            context.Cars.RemoveRange(cars);
            context.SaveChanges();
        }

    }
}
