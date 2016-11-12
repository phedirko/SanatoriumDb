using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sanatorium.Data.Migrations
{
    public partial class models1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                "Procedures",
                table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_Procedures", x => x.Id); });

            migrationBuilder.CreateTable(
                "Rooms",
                table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Capacity = table.Column<int>(nullable: false),
                    DailyPrice = table.Column<int>(nullable: false),
                    RoomNumber = table.Column<int>(nullable: false),
                    StageNumber = table.Column<int>(nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_Rooms", x => x.Id); });

            migrationBuilder.CreateTable(
                "Patients",
                table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FullName = table.Column<string>(nullable: true),
                    RoomId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                    table.ForeignKey(
                        "FK_Patients_Rooms_RoomId",
                        x => x.RoomId,
                        "Rooms",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                "PatientBooks",
                table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Deseases = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    PatientId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientBooks", x => x.Id);
                    table.ForeignKey(
                        "FK_PatientBooks_Patients_PatientId",
                        x => x.PatientId,
                        "Patients",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                "ProceduresFrequency",
                table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Frequency = table.Column<string>(nullable: true),
                    PatientBookId = table.Column<int>(nullable: true),
                    PatientProcedureId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProceduresFrequency", x => x.Id);
                    table.ForeignKey(
                        "FK_ProceduresFrequency_PatientBooks_PatientBookId",
                        x => x.PatientBookId,
                        "PatientBooks",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        "FK_ProceduresFrequency_Procedures_PatientProcedureId",
                        x => x.PatientProcedureId,
                        "Procedures",
                        "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                "IX_Patients_RoomId",
                "Patients",
                "RoomId");

            migrationBuilder.CreateIndex(
                "IX_PatientBooks_PatientId",
                "PatientBooks",
                "PatientId",
                unique: true);

            migrationBuilder.CreateIndex(
                "IX_ProceduresFrequency_PatientBookId",
                "ProceduresFrequency",
                "PatientBookId");

            migrationBuilder.CreateIndex(
                "IX_ProceduresFrequency_PatientProcedureId",
                "ProceduresFrequency",
                "PatientProcedureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                "ProceduresFrequency");

            migrationBuilder.DropTable(
                "PatientBooks");

            migrationBuilder.DropTable(
                "Procedures");

            migrationBuilder.DropTable(
                "Patients");

            migrationBuilder.DropTable(
                "Rooms");
        }
    }
}