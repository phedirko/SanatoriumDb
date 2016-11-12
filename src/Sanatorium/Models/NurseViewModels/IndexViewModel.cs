using System.Collections.Generic;

namespace Sanatorium.Models.NurseViewModels
{
    public class IndexViewModel
    {
        public IndexViewModel()
        {
        }

        public IndexViewModel(List<Procedure> procedures)
        {
            Procedures = procedures;
        }

        public List<Procedure> Procedures { get; set; }
    }
}