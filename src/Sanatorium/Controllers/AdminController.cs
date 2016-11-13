using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sanatorium.Data;
using Sanatorium.Models;

namespace Sanatorium.Controllers
{
    public class AdminController : Controller
    {
        public readonly ApplicationDbContext Db;

        public AdminController(ApplicationDbContext db)
        {
            Db = db;
        }

        public async Task<IActionResult> Index()
        {
            var model = await Db.Rooms.ToListAsync();
            return View(model);
        }

        [HttpPost]
        public async Task<JsonResult> AppendRoom(int roomNumber, int stageNumber, int capacity, int dailyPrice)
        {
            var room = new Room(roomNumber, stageNumber, capacity, dailyPrice);
            Db.Rooms.Add(room);

            await Db.SaveChangesAsync();

            return Json(room);
        }

        public async Task RemoveRoom(int roomId)
        {
            Db.Rooms.Remove(await Db.Rooms.SingleAsync(r => r.Id == roomId));
            await Db.SaveChangesAsync();
        }

        public async Task<JsonResult> UpdateRoom(int roomId, int capacity, int dailyPrice)
        {
            var room = await Db.Rooms.SingleOrDefaultAsync(r => r.Id == roomId);

            room.Capacity = capacity;
            room.DailyPrice = dailyPrice;

            await Db.SaveChangesAsync();
            return Json(room);
        }

        public async Task<Room[]> GetRooms()
        {
            return await Db.Rooms.ToArrayAsync();
        }

        public async Task<JsonResult> RegisterPatient(string fullName,string gender)
        {
            var book = new PatientBook(fullName);
            var patient = new Patient(fullName,gender,book);
            Db.Patients.Add(patient);
            await Db.SaveChangesAsync();
            return Json(patient);
        }
    }
}