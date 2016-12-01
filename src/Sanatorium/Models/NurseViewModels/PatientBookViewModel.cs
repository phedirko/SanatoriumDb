using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models.NurseViewModels
{
    public class PatientBookViewModel
    {
        public PatientBook Book { get; set; }

        public List<Procedure> Procedures { get; set; }

        public List<Desease> Deseases { get; set; }
        public PatientBookViewModel()
        {
            
        }

        public PatientBookViewModel(PatientBook book,List<Procedure> procedures)
        {
            Book = book;

            Procedures = procedures;
        }

        public PatientBookViewModel(PatientBook book, List<Procedure> procedures,List<Desease> deseases)
        {
            Book = book;

            Procedures = procedures;

            Deseases = deseases;
        }
    }
}
