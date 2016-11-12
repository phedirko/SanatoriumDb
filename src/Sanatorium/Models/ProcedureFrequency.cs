namespace Sanatorium.Models
{
    public class ProcedureFrequency
    {
        public ProcedureFrequency()
        {
        }

        public ProcedureFrequency(Procedure patientProcedure, string frequency)
        {
            PatientProcedure = patientProcedure;

            Frequency = frequency;
        }

        public int Id { get; set; }

        public Procedure PatientProcedure { get; set; }

        public string Frequency { get; set; }
    }
}