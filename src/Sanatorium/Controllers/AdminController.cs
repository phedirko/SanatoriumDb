using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sanatorium.Data;
using Sanatorium.Models;
using Sanatorium.Models.AdminViewModels;
using System.Linq;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Data.SqlClient;

namespace Sanatorium.Controllers
{
    [Authorize(Roles = "ADMIN")]
    public class AdminController : Controller
    {
       
        public readonly ApplicationDbContext Db;

        public AdminController(ApplicationDbContext db)
        {
            Db = db;
        }

        public async Task<IActionResult> Index()
        {
            var model = new IndexViewModel(await Db.Rooms.ToListAsync(), await Db.Patients.ToListAsync());
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
            Db.RoomUpdates.Add(new RoomUpdate(room, "Room"));
            await Db.SaveChangesAsync();
            return Json(room);
        }

        public async Task<Room[]> GetRooms()
        {
            return await Db.Rooms.ToArrayAsync();
        }

        public async Task<JsonResult> RegisterPatient(string fullName, string gender, int days)
        {
            var book = new PatientBook(fullName);
            var patient = new Patient(fullName, gender, book, days);
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
                    var patient = await Db.Patients.SingleOrDefaultAsync(p => p.Id == id);
                    room.Patients.Add(patient);
                    patient.IsSettle = true;
                }

                room.HavePatients = true;
                await Db.SaveChangesAsync();

                return Json(patientsId);
            }
            return Json(new List<int>());
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
            var query =
                await
                    Db.Rooms.Select(r => new {cap = r.Capacity, price = r.DailyPrice})
                        .OrderBy(r => r.cap)
                        .ToArrayAsync();
            return Json(query);
        }

        [HttpGet]
        public async Task<JsonResult> GetGenderStat()
        {
            var query = await Db.Patients
                .GroupBy(r => r.Gender)
                .Select(grp => new {Gender = grp.Key, Value = grp.Count()})
                .ToListAsync();
            return Json(query);
        }

        [HttpGet]
        public async Task<JsonResult> GetSettleStat()
        {
            var query = await Db.Patients
                .GroupBy(r => r.IsSettle)
                .Select(grp => new {Settle = grp.Key, Value = grp.Count()})
                .ToListAsync();
            return Json(query);
        }

        [HttpGet]
        public async Task<Patient[]> GetAllPatients()
        {
            return await Db.Patients.ToArrayAsync();
        }

        [HttpGet]
        public async Task<JsonResult> OrderPatientsByName(bool desc = false)
        {
            if (desc)
                return Json(await Db.Patients.OrderBy(p => p.FullName).Select(p => new {id = p.Id}).ToListAsync());
            else
                return
                    Json(await Db.Patients.OrderByDescending(p => p.FullName).Select(p => new {id = p.Id}).ToListAsync());
        }

        [HttpGet]
        public async Task<JsonResult> SearchPatients(string partOfName)
        {
            return
                Json(
                    await
                        Db.Patients.Where(p => p.FullName.Substring(0, partOfName.Length) == partOfName).ToArrayAsync());
        }

        [HttpPost]
        public async Task ImportPatientFromFile(string FullName, int Days, string Gender)
        {
            var patient = new Patient(FullName, Gender, Days);
            Db.Patients.Add(patient);
            await Db.SaveChangesAsync();
        }

        public async Task<IActionResult> ManageAdmins()
        {
            List<ApplicationUser> admins = await Db.Users.Where(x=>x.Roles.Any(y=>y.RoleId=="1"&&y.UserId==x.Id)).ToListAsync();
            List<ApplicationUser> notAdmins =
                await Db.Users.Where(x=>x.Roles.All(r=>r.RoleId!="1")).ToListAsync();
            ManageAdminsViewModel model = new ManageAdminsViewModel(admins, notAdmins); 
            return View(model);
        }

        public async Task<IActionResult> ManageNurses()
        {
            List<ApplicationUser> nurses = await Db.Users.Where(x => x.Roles.Any(y => y.RoleId == "2" && y.UserId == x.Id)).ToListAsync();
            List<ApplicationUser> notNurses =
                await Db.Users.Where(x => x.Roles.All(r => r.RoleId != "1")).ToListAsync();
            ManageNursesViewModel model = new ManageNursesViewModel(nurses, notNurses);
            return View(model);
        }

        public IActionResult Sql()
        {
            return View();
        }
        public PartialViewResult Query(string q)
        {
            List<List<string>> result = new List<List<string>>();
            using (SqlConnection connection = new SqlConnection("Server=(localdb)\\mssqllocaldb; Database = aspnet-Sanatorium-be834578-74f8-4422-bea0-8de2861221f9;Trusted_Connection = True;MultipleActiveResultSets=true"))
            {
                string queryString = q;
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                
                if (reader != null)
                {
                    result.Add(new List<string>());
                    for (int i = 0; i < reader.FieldCount; ++i)
                        result[0].Add(reader.GetName(i));
                    int j = 1;
                    while (reader.Read())
                    {
                        result.Add(new List<string>());
                        for (int i = 0; i < reader.FieldCount; ++i)
                            result[j].Add(reader[i].ToString());
                        ++j;
                    }
                }
            }

            return PartialView("~/Views/Admin/queryResult.cshtml",result);
        }
    }
}