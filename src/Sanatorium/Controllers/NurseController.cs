using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Sanatorium.Data;
using Sanatorium.Models;
using Sanatorium.Models.NurseViewModels;
using Microsoft.EntityFrameworkCore;

namespace Sanatorium.Controllers
{
    public class NurseController : Controller
    {
        public readonly ApplicationDbContext Db;

        public NurseController(ApplicationDbContext db)
        {
            Db = db;
        }

        public async Task<IActionResult> Index()
        {
            var model = new IndexViewModel(await Db.Procedures.ToListAsync());
            return View(model);
        }

        public async Task<JsonResult> AppendProcedure(int price,string name)
        {
            var procedure = new Procedure(price, name);
            Db.Procedures.Add(procedure);

            await Db.SaveChangesAsync();
            return Json(procedure);
        }
    }
}