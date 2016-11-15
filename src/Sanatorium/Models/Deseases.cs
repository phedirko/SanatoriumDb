using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    public class Desease
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Desease()
        {
            
        }

        public Desease(string name)
        {
            Name = name;
        }
    }
}
