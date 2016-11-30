using System;

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
        public Patient(string fullName, string gender, PatientBook book,int days)
        {
            FullName = fullName;

            Book = book;

            Gender = gender;

            Days = days;
        }

        public Patient(string fullName, string gender, int days)
        {
            FullName = fullName;

            Book = new PatientBook(fullName);

            Gender = gender;

            Days = days;
        }

        public int Id { get; set; }

        public string FullName { get; set; }

        public int Days { get; set; } = 7;

        public DateTime When { get; set; } = DateTime.Now;

        public bool IsSettle { get; set; } = false;

        public bool SeenByNurse { get; set; } = false;

        public  string Gender { get; set; }

        public PatientBook Book { get; set; }
    }
}