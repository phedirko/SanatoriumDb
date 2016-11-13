namespace Sanatorium.Models
{
    public class Patient
    {
        public Patient()
        {
        }

        public Patient(string fullName, PatientBook book)
        {
            FullName = fullName;

            Book = book;
        }

        public Patient(string fullName,string gender, PatientBook book)
        {
            FullName = fullName;

            Book = book;

            Gender = gender;
        }

        public int Id { get; set; }

        public string FullName { get; set; }

        public bool IsSettle { get; set; } = false;

        public bool SeenByNurse { get; set; } = false;

        public  string Gender { get; set; }

        public PatientBook Book { get; set; }
    }
}