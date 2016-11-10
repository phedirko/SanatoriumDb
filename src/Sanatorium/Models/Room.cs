﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sanatorium.Models
{
    public class Room
    {
        public int Id { get; set; }

        public int RoomNumber { get; set; }

        public int StageNumber { get; set; }

        public int DailyPrice { get; set; }

        public int Capacity { get; set; }

        public List<Patient> Patients { get; set;}

        public Room()
        {

        }

        public Room(int roomNumber,int stageNumber,int capacity,int dailyPrice)
        {
            RoomNumber = roomNumber;

            StageNumber = stageNumber;

            Capacity = capacity;

            DailyPrice = dailyPrice;
        }
    }
}