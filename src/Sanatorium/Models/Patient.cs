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

        public int Id { get; set; }

        public string FullName { get; set; }

        public PatientBook Book { get; set; }
    }
}