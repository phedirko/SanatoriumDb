using System.Collections.Generic;

namespace Sanatorium.Models.AdminViewModels
{
    public class IndexViewModel
    {
        public List<Room> Rooms { get; set; }

        public List<Patient> Patients { get; set; }

        public IndexViewModel()
        {
        }

        public IndexViewModel(List<Room> rooms, List<Patient> patients)
        {
            Rooms = rooms;

            Patients = patients;
        }
    }
}
