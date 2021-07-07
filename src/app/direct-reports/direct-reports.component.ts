import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { EditEmployeeComponent } from "../edit-employee/edit-employee.component";
import { Employee } from "../employee";

@Component({
  selector: "app-direct-reports",
  templateUrl: "./direct-reports.component.html",
  styleUrls: ["./direct-reports.component.css"],
})
export class DirectReportsComponent implements OnInit {
  private saveListener: Subscription;
  private deleteListener: Subscription;
  @Input() drs;
  @Output() saveEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<Employee>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  editDirectReport(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: { employee, edit: true },
    });

    this.saveListener = dialogRef.componentInstance.saveEmployee.subscribe(
      (data: Employee) => {
        console.log("dialog data", data);
        this.saveEmployee.emit(data);
      }
    );

    dialogRef.afterClosed().subscribe();
  }

  deleteDirectReport(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: { employee, edit: false },
    });

    this.deleteListener = dialogRef.componentInstance.deleteEmployee.subscribe(
      (data: Employee) => {
        console.log("dialog data", data);
        this.deleteEmployee.emit(data);
      }
    );

    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    this.saveListener?.unsubscribe();
    this.deleteListener?.unsubscribe();
  }
}
