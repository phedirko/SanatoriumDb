using System.ComponentModel.DataAnnotations;

namespace Sanatorium.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}