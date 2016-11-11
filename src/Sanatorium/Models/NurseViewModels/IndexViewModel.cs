using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models.NurseViewModels
{
    public class IndexViewModel
    {
        public List<Procedure> Procedures { get; set; }

        public IndexViewModel()
        {

        }

        public IndexViewModel(List<Procedure> procedures)
        {
            Procedures = procedures;
        }
    }
}
