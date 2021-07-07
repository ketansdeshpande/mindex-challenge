import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EditEmployeeComponent } from "../edit-employee/edit-employee.component";
import { Employee } from "../employee";

@Component({
  selector: "app-direct-reports",
  templateUrl: "./direct-reports.component.html",
  styleUrls: ["./direct-reports.component.css"],
})
export class DirectReportsComponent implements OnInit {
  @Input() drs;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  editDirectReport(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: { employee, edit: true },
    });

    dialogRef.afterClosed().subscribe();
  }

  deleteDirectReport(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: { employee, edit: false },
    });

    dialogRef.afterClosed().subscribe();
  }
}
