import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";

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
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    private employeeService: EmployeeService
  ) {
    // this.compensation = data.employee.compensation;
    // this.dialogRef.afterClosed().subscribe((result) => {
    //   this.data.employee.compensation = this.compensation;
    // });
  }

  ngOnInit(): void {}

  onSave(): void {
    console.log(this.data.employee);
    // this.employeeService.save(this.data.employee);
    this.saveEmployee.emit(this.data.employee);
  }

  onDelete(): void {
    console.log(this.data.employee);
    // this.employeeService.remove(this.data.employee);
    this.deleteEmployee.emit(this.data.employee);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
