using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    interface IUpdate
    {
        DateTime When { get; set; }

        string Type { get; set; }
    }
}
