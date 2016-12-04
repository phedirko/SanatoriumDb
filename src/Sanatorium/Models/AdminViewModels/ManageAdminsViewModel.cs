using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models.AdminViewModels
{
    public class ManageAdminsViewModel
    {
        public List<ApplicationUser> Admins { get; set; } = new List<ApplicationUser>();

        public List<ApplicationUser> NotAdmins { get; set; } = new List<ApplicationUser>();

        public ManageAdminsViewModel()
        {
            
        }

        public ManageAdminsViewModel(List<ApplicationUser> admins,List<ApplicationUser> notAdmins)
        {
            Admins = admins;

            NotAdmins = notAdmins;
        }
    }
}
