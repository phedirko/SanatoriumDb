using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    public class Patient
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public PatientBook Book { get; set; }

        public Patient()
        {

        }

        public Patient(string fullName,PatientBook book)
        {
            FullName = fullName;

            Book = book;
        }
    }
}
