using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sanatorium.Data;
using Sanatorium.Models;
using Sanatorium.Models.AdminViewModels;
using System.Linq;

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
            var model = new IndexViewModel(await Db.Rooms.ToListAsync(),await Db.Patients.ToListAsync());
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
        [HttpPost]
        public async Task<JsonResult> SettlePatients(int roomId, List<int> patientsId)
        {
            var room = await Db.Rooms.SingleOrDefaultAsync(r => r.Id == roomId);
            if (room.Capacity >= patientsId.Count)
            {
                room.Patients = new List<Patient>();
                foreach (var id in patientsId)
                {
                    var patient =await Db.Patients.SingleOrDefaultAsync(p => p.Id == id);
                    room.Patients.Add(patient);
                    patient.IsSettle = true;
                }

                room.HavePatients = true;
                await Db.SaveChangesAsync();

                return Json(patientsId);
            }
            return  Json(new List<int>());
        }

        [HttpPost]
        public async Task<JsonResult> SettlePatient(int roomId, int patientId)
        {
            var room = await Db.Rooms.SingleOrDefaultAsync(r => r.Id == roomId);
            var patient = await Db.Patients.SingleOrDefaultAsync(p => p.Id == patientId);
            room.Patients = new List<Patient>();
            room.Patients.Add(patient);
            patient.IsSettle = true;
            return Json(new {room = roomId, patient = patientId});
        }

        [HttpGet]
        public async Task<JsonResult> GetRoomsStat()
        {
            return Json(Db.Rooms.Select(r => new {cap = r.Capacity,price = r.DailyPrice}).OrderBy(r=>r.cap));
        }
    }
}