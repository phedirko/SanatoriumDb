using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Sanatorium.Data.Migrations
{
    public partial class deseases : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Deseases",
                table: "PatientBooks");

            migrationBuilder.CreateTable(
                name: "Deseases",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    PatientBookId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deseases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Deseases_PatientBooks_PatientBookId",
                        column: x => x.PatientBookId,
                        principalTable: "PatientBooks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Deseases_PatientBookId",
                table: "Deseases",
                column: "PatientBookId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Deseases");

            migrationBuilder.AddColumn<string>(
                name: "Deseases",
                table: "PatientBooks",
                nullable: true);
        }
    }
}
