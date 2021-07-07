import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { catchError, map, reduce } from "rxjs/operators";

import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService
      .getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map((emps) => {
          this.employees = emps;
          this.cdr.detectChanges();
        }),
        catchError(this.handleError.bind(this))
      )
      .subscribe();
  }

  updateEmployee(data) {
    this.employeeService.save(data).subscribe(
      (res) => this.getAllEmployees(),
      (err) => this.handleError(err),
      () => console.log("HTTP request completed.")
    );
  }

  deleteEmployee(data) {
    this.employeeService.remove(data).subscribe(
      (res) => this.getAllEmployees(),
      (err) => this.handleError(err),
      () => console.log("HTTP request completed.")
    );
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return (this.errorMessage = e.message || "Unable to retrieve employees");
  }
}
