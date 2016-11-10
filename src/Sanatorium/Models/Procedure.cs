using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    public class Procedure
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }

        public Procedure()
        {

        }

        public Procedure(int price,string name)
        {
            Name = name;

            Price = price;
        }
    }
}
