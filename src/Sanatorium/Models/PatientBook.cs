using System.Collections.Generic;

namespace Sanatorium.Models
{
    public class PatientBook
    {
        public PatientBook()
        {
        }

        public PatientBook(string fullName, List<Deseases> deseases)
        {
            FullName = fullName;

            Deseases = deseases;
        }

        public PatientBook(string fullName)
        {
            FullName = fullName;
        }

        public PatientBook(string fullName, List<Deseases> deseases, List<ProcedureFrequency> procedures)
        {
            FullName = fullName;

            Deseases = deseases;

            Procedures = procedures;
        }

        public int Id { get; set; }

        public string FullName { get; set; }

        public List<Deseases> Deseases { get; set; } = new List<Deseases>();

        public int PatientId { get; set; }
        public List<ProcedureFrequency> Procedures { get; set; }
    }
}