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
  @Input() drs: Employee[];
  @Output() saveEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<Employee>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Method to open edit dialog box and to emit save method
   * @param employee from edit employee component emitter
   */
  editDirectReport(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: { employee, edit: true },
    });

    this.saveListener = dialogRef.componentInstance.saveEmployee.subscribe(
      (data: Employee) => {
        this.saveEmployee.emit(data);
      }
    );

    dialogRef.afterClosed().subscribe();
  }

  /**
   * Method to open delete dialog box and to emit remove method
   * @param employee from edit employee component emitter
   */
  deleteDirectReport(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data: { employee, edit: false },
    });

    this.deleteListener = dialogRef.componentInstance.deleteEmployee.subscribe(
      (data: Employee) => {
        this.deleteEmployee.emit(data);
      }
    );

    dialogRef.afterClosed().subscribe();
  }

  /**
   * Life-cycle method called when component is destroyed
   * to unsubscribe methods which are subscribed
   */
  ngOnDestroy(): void {
    this.saveListener?.unsubscribe();
    this.deleteListener?.unsubscribe();
  }
}
