using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models.AdminViewModels
{
    public class ManageNursesViewModel
    {
        public List<ApplicationUser> Nurses { get; set; } = new List<ApplicationUser>();

        public List<ApplicationUser> NotNurses { get; set; } = new List<ApplicationUser>();

        public ManageNursesViewModel()
        {

        }

        public ManageNursesViewModel(List<ApplicationUser> nurses, List<ApplicationUser> notNurses)
        {
            Nurses = nurses;

            NotNurses = notNurses;
        }
    }
}
