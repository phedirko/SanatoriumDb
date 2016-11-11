using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sanatorium.Data;
using Microsoft.EntityFrameworkCore;
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
            var model =await Db.Rooms.ToListAsync();
            return View(model);
        }
        [HttpPost]
        public async Task<JsonResult> AppendRoom(int roomNumber,int stageNumber,int capacity,int dailyPrice)
        {
            var room = new Room(roomNumber, stageNumber, capacity, dailyPrice);
            Db.Rooms.Add(room);

            await Db.SaveChangesAsync();

            return Json(room);
        }
    }
}