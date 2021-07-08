import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Employee } from "../employee";

@Component({
  selector: "app-edit-employee",
  templateUrl: "./edit-employee.component.html",
  styleUrls: ["./edit-employee.component.css"],
})
export class EditEmployeeComponent implements OnInit {
  @Output() saveEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<Employee>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditEmployeeComponent>
  ) {}

  ngOnInit(): void {}

  /**
   * Event handler on save click to emit the event to employee component
   */
  onSave(): void {
    if (this.data.employee.compensation && this.data.employee.compensation > 0)
      this.saveEmployee.emit(this.data.employee);
  }

  /**
   * Event handler on delete click to emit the event to employee component
   */
  onDelete(): void {
    this.deleteEmployee.emit(this.data.employee);
  }

  /**
   * Event handler on cancel click to close the dialog box
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
