using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleCarsReact.Data;

namespace PeopleCarsReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarsController : ControllerBase
    {
        private string _connectionString;

        public PeopleCarsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getallpeople")]
        public List<Person> GetAllPeople()
        {
            var repo = new Repository(_connectionString);
            return repo.GetAllPeople();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person p)
        {
            var repo = new Repository(_connectionString);
            repo.AddPerson(p);
        }

        [HttpGet]
        [Route("getperson")]
        public Person GetPerson(int id)
        {
            var repo = new Repository(_connectionString);
            return repo.GetPerson(id);
        }

        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car c)
        {
            var repo = new Repository(_connectionString);
            repo.AddCar(c);
        }

        [HttpPost]
        [Route("deletecars")]
        public void DeleteCars(int id)
        {
            var repo = new Repository(_connectionString);
            repo.DeleteCars(id);
        }

        [HttpGet]
        [Route("getcars")]
        public List<Car> GetCars(int id)
        {
            var repo = new Repository(_connectionString);
            return repo.GetCarsByPerson(id);
        }

    }
}
