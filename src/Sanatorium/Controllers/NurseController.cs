using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sanatorium.Data;
using Sanatorium.Models;
using Sanatorium.Models.NurseViewModels;
using System.Linq;

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
            var model = new IndexViewModel(await Db.Procedures.ToListAsync(),await Db.Patients.Include(p=>p.Book).ToListAsync());
            return View(model);
        }

        public async Task<JsonResult> AppendProcedure(int price, string name)
        {
            var procedure = new Procedure(price, name);
            Db.Procedures.Add(procedure);

            await Db.SaveChangesAsync();
            return Json(procedure);
        }

        public async Task RemoveProcedure(int procedureId)
        {
            Db.Procedures.Remove(await Db.Procedures.SingleOrDefaultAsync(p => p.Id == procedureId));
        }

        public async Task<JsonResult> UpdateProcedure(int procedureId, int price, string name)
        {
            var procedure = await Db.Procedures.SingleOrDefaultAsync(p => p.Id == procedureId);
            procedure.Name = name;
            procedure.Price = price;

            await Db.SaveChangesAsync();
            return Json(procedure);
        }
        [HttpGet]
        public async Task<IActionResult> PatientBook(int id,int patientId)
        {
            var patient =await Db.Patients.SingleOrDefaultAsync(p => p.Id == patientId);
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
            var query = Db.Deseases.AsEnumerable()
                .GroupBy(d => d.Name)
                .Select(grp => new { Desease = grp.Key, Value = grp.Count() })
                .ToList();
            return Json(query);
        }

        public JsonResult GetDeseasesRadarStat()
        {
            var query = Db;
            return Json(query);
        }
    }
}