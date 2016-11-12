namespace Sanatorium.Models
{
    public class Procedure
    {
        public Procedure()
        {
        }

        public Procedure(int price, string name)
        {
            Name = name;

            Price = price;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }
    }
}