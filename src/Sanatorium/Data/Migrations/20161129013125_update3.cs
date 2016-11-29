using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sanatorium.Data.Migrations
{
    public partial class update3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "RoomUpdates",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "ProceduresUpdate",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "RoomUpdates");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ProceduresUpdate");
        }
    }
}
