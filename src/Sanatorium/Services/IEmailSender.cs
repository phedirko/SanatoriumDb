using System.Threading.Tasks;

namespace Sanatorium.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}