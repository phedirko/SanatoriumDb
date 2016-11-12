using System.Collections.Generic;

namespace Sanatorium.Models
{
    public class PatientBook
    {
        public PatientBook()
        {
        }

        public PatientBook(string fullName, string deseases)
        {
            FullName = fullName;

            Deseases = deseases;
        }

        public PatientBook(string fullName, string deseases, List<ProcedureFrequency> procedures)
        {
            FullName = fullName;

            Deseases = deseases;

            Procedures = procedures;
        }

        public int Id { get; set; }

        public string FullName { get; set; }

        public string Deseases { get; set; }

        public int PatientId { get; set; }
        public List<ProcedureFrequency> Procedures { get; set; }
    }
}