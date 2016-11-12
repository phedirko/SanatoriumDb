using System.Threading.Tasks;

namespace Sanatorium.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}