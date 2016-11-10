using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    public class ProcedureFrequency
    {
        public int Id { get; set; }

        public Procedure PatientProcedure { get; set; }

        public string Frequency { get; set; }

        public ProcedureFrequency()
        {

        }

        public ProcedureFrequency(Procedure patientProcedure,string frequency)
        {
            PatientProcedure = patientProcedure;

            Frequency = frequency;
        }
    }
}
