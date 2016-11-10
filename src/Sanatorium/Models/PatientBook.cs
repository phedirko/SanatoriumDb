using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    public class PatientBook
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string Deseases { get; set; }

        public int PatientId { get; set; }
        public List<ProcedureFrequency> Procedures { get; set; }

        public PatientBook()
        {

        }

        public PatientBook(string fullName,string deseases)
        {
            FullName = fullName;

            Deseases = deseases;
        }
        public PatientBook(string fullName, string deseases,List<ProcedureFrequency> procedures)
        {
            FullName = fullName;

            Deseases = deseases;

            Procedures = procedures;
        }
    }
}
