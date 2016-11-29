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
        public async Task <JsonResult> GetLatestUpdates()
        {
            List<IUpdate> model = await Db.ProceduresUpdate.Cast<IUpdate>().ToListAsync();
            model.AddRange(await Db.RoomUpdates.Cast<IUpdate>().ToListAsync());
            model.OrderByDescending(u => u.When);
            return Json(model);
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