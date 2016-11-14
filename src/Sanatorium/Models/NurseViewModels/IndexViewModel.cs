using System.Collections.Generic;

namespace Sanatorium.Models.NurseViewModels
{
    public class IndexViewModel
    {
        public IndexViewModel()
        {
        }

        public IndexViewModel(List<Procedure> procedures,List<Patient> patients)
        {
            Procedures = procedures;

            Patients = patients;
        }

        public List<Procedure> Procedures { get; set; }

        public List<Patient> Patients { get; set; }
    }
}