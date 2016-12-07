using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sanatorium.Data;
using Sanatorium.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Controllers
{
    public class HomeController : Controller
    {
        public readonly ApplicationDbContext Db;

        public HomeController(ApplicationDbContext db)
        {
            Db = db;
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetLatestUpdates()
        {
            List<IUpdate> model = await Db.ProceduresUpdate.Cast<IUpdate>().ToListAsync();
            model.AddRange(await Db.RoomUpdates.Cast<IUpdate>().ToListAsync());
            model.OrderBy(u => u.When);
            return Json(model);
        }

        [HttpGet]
        public async Task<JsonResult> GetLatestRoomsPriceList()
        {
            var priceList =
                await Db.Rooms.Select(r => new {Capacity = r.Capacity, Price = r.DailyPrice,}).ToArrayAsync();
            return Json(priceList);
        }

        [HttpGet]
        public async Task<JsonResult> GetLatestProceduresPriceList()
        {
            var priceList = await Db.Procedures.Select(p => new {Name = p.Name, Price = p.Price,}).ToArrayAsync();
            return Json(priceList);
        }

        [HttpGet]
        public async Task<JsonResult> GetRoomsInfo()
        {
            var averagePrice = await Db.Rooms.AverageAsync(x => x.DailyPrice);
            var totalRooms = await Db.Rooms.CountAsync();
            var totalProcedures = await Db.Procedures.CountAsync();
            var averageProcPrice = await Db.Procedures.AverageAsync(x => x.Price);
            return
                Json(
                    new
                    {
                        average = averagePrice,
                        total = totalRooms,
                        totalProc = totalProcedures,
                        averageProc = averageProcPrice
                    });
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}