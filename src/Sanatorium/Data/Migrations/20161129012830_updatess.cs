using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sanatorium.Data.Migrations
{
    public partial class updatess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UpdateRoomId",
                table: "RoomUpdates",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoomUpdates_UpdateRoomId",
                table: "RoomUpdates",
                column: "UpdateRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomUpdates_Rooms_UpdateRoomId",
                table: "RoomUpdates",
                column: "UpdateRoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomUpdates_Rooms_UpdateRoomId",
                table: "RoomUpdates");

            migrationBuilder.DropIndex(
                name: "IX_RoomUpdates_UpdateRoomId",
                table: "RoomUpdates");

            migrationBuilder.DropColumn(
                name: "UpdateRoomId",
                table: "RoomUpdates");
        }
    }
}
