using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sanatorium.Data;
using Sanatorium.Models;
using Sanatorium.Models.NurseViewModels;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using System;

namespace Sanatorium.Controllers
{
    public class NurseController : Controller
    {
        public readonly ApplicationDbContext Db;

        private IHostingEnvironment Environment;
        public NurseController(ApplicationDbContext db,IHostingEnvironment environment)
        {
            Db = db;
            Environment = environment;
        }

        public async Task<IActionResult> Index()
        {
            Db.Patients.RemoveRange(Db.Patients.Where(p => p.When.AddDays(p.Days) < DateTime.Now));
            await Db.SaveChangesAsync();
            var model = new IndexViewModel(await Db.Procedures.ToListAsync(),await Db.Patients.Include(p=>p.Book).ToListAsync());
            return View(model);
        }

        public async Task AppendProcedure(int price, string name)
        {
            var procedure = new Procedure(price, name);
            Db.Procedures.Add(procedure);

            await Db.SaveChangesAsync();
        }

        public async Task<int> RemoveProcedure(int id)
        {
            Db.Procedures.Remove(await Db.Procedures.SingleOrDefaultAsync(p => p.Id == id));
            await Db.SaveChangesAsync();
            return id;
        }

        public async Task<JsonResult> UpdateProcedure(int procedureId, int price, string name)
        {
            var procedure = await Db.Procedures.SingleOrDefaultAsync(p => p.Id == procedureId);
            procedure.Name = name;
            procedure.Price = price;
            Db.ProceduresUpdate.Add(new ProceduresUpdate(procedure, "Procedure"));
            await Db.SaveChangesAsync();
            return Json(procedure);
        }
        [HttpGet]
        public async Task<IActionResult> PatientBook(int id,int patientId)
        {
            var patient =await Db.Patients.SingleOrDefaultAsync(p => p.Id == patientId);
            ViewData["Gender"] = patient.Gender;
            if (!patient.SeenByNurse)
            {
                patient.SeenByNurse = true;
                await Db.SaveChangesAsync();
            }
            var model = new PatientBookViewModel(await Db.PatientBooks.Include(b=>b.Deseases).Include(b=>b.Procedures).SingleOrDefaultAsync(b=>b.Id == id),await Db.Procedures.ToListAsync());
            return View(model);
        }
        [HttpPost]
        public async Task<JsonResult> AddDesease(int id, string desease)
        {
            var patientBook = await Db.PatientBooks.SingleOrDefaultAsync(p => p.Id == id);
            var newDesease = new Desease(desease);
            patientBook.Deseases.Add(newDesease);
            await Db.SaveChangesAsync();
            return Json(newDesease);
        }
        [HttpPost]
        public async Task<int> RemoveDesease(int id, int deseaseId)
        {
            var patientBook = await Db.PatientBooks.Include(p=>p.Deseases).SingleOrDefaultAsync(p => p.Id == id);
            var deseaseForRemove =await Db.Deseases.SingleOrDefaultAsync(d=>d.Id == deseaseId);
            patientBook.Deseases.Remove(deseaseForRemove);
            await Db.SaveChangesAsync();
            return deseaseId;
        }
        [HttpPost]
        public async Task<JsonResult> AddProcedureFrequency(int bookId, int procedureId, string frequency)
        {
            var patientBook = await Db.PatientBooks.SingleOrDefaultAsync(p => p.Id == bookId);
            var procedure = await Db.Procedures.SingleOrDefaultAsync(p => p.Id == procedureId);
            var procedureFrequency = new ProcedureFrequency(procedure, frequency);
            patientBook.Procedures.Add(procedureFrequency);
            await Db.SaveChangesAsync();
            return Json(procedureFrequency);
        }

        [HttpPost]
        public async Task<int> DeleteProcedureFrequency(int procedureFrequencyId)
        {
            Db.ProceduresFrequency.Remove(await Db.ProceduresFrequency.SingleOrDefaultAsync(p => p.Id == procedureFrequencyId));
            await Db.SaveChangesAsync();
            return procedureFrequencyId;
        }
        [HttpGet]
        public async Task<Patient[]> GetAllPatients()
        {
            return await Db.Patients.ToArrayAsync();
        }

        [HttpGet]
        public async Task<JsonResult> GetDeseasesStat()
        {
            var query =await Db.Deseases
                .GroupBy(d => d.Name)
                .Select(grp => new { Desease = grp.Key, Value = grp.Count() })
                .ToListAsync();
            return Json(query);
        }

        public JsonResult GetDeseasesRadarStat()
        {
            var query = Db;
            return Json(query);
        }

        public async Task<RedirectToActionResult> SaveImg(int id,int patientId,IFormFile img)
        {
            var uploads = Path.Combine(Environment.WebRootPath, "uploads");         
            if (img.Length > 0)
            {
                var patientBook =await Db.PatientBooks.SingleOrDefaultAsync(b => b.Id == id);
                using (var fileStream = new FileStream(Path.Combine(uploads, img.FileName), FileMode.Create))
                {
                    await img.CopyToAsync(fileStream);
                    patientBook.PhotoUrl = fileStream.Name.Substring(fileStream.Name.IndexOf("wwwroot") + 7);
                }
                await Db.SaveChangesAsync();
            }
            return  RedirectToAction("PatientBook",new { id = id, patientId = patientId });
        }
        public async Task<JsonResult> GetPatientsInfo()
        {
            return Json(await Db.Patients.Include(p => p.Book.Procedures).ToListAsync());
        }

        public async Task<JsonResult> GetPatientBookInfo(int id)
        {

            return Json(await Db.PatientBooks.Select(a => new { a.Id,a.FullName, a.Deseases,a.Procedures}).SingleAsync(p => p.Id == id));
        }
    }
}