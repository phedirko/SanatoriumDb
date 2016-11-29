using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    public class ProceduresUpdate : IUpdate
    {
        public int Id { get; set; }

        public DateTime When { get; set; } = DateTime.Now;

        public Procedure UpdateProcedure { get; set; }

        public string Type { get; set; } = "Procedure";

        public ProceduresUpdate()
        {

        }

        public ProceduresUpdate(Procedure procedure)
        {
            UpdateProcedure = procedure;
        }
     
    }
}
