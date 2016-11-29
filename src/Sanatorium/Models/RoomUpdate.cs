using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    public class RoomUpdate : IUpdate
    {
        public int Id { get; set; }

        public DateTime When { get; set; } = DateTime.Now;
        
        public Room UpdateRoom { get; set; }

        public string Type { get; set; } = "Room";

        public RoomUpdate()
        {

        }

        public RoomUpdate(Room room)
        {
            UpdateRoom = room;
        }

        
    }
}
