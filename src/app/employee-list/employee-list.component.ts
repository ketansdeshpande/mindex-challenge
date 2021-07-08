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
  private totalAndDirectReports = [];

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  /**
   * Calls employee service's getAll method to fetch all employees
   */
  getAllEmployees() {
    this.employeeService
      .getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map((emps) => {
          this.employees = emps;
          this.reCalculateTotalReports();
          this.cdr.detectChanges();
        }),
        catchError(this.handleError.bind(this))
      )
      .subscribe();
  }

  /**
   * Calls employee service's save method to update the employee
   * @param data employee object to be updated
   */
  updateEmployee(data) {
    this.employeeService.save(data).subscribe(
      (res) => {
        alert("Updated successfully!");
        this.getAllEmployees();
      },
      (err) => this.handleError(err),
      () => console.log("HTTP request completed.")
    );
  }

  /**
   * Calls employee service's remove method to delete the employee
   * @param data employee object to be deleted
   */
  deleteEmployee(data) {
    this.employeeService.remove(data).subscribe(
      (res) => {
        alert("Deleted successfully!");
        this.getAllEmployees();
        this.filterDeletedEmployees(data);
        this.reCalculateTotalReports();
        this.cdr.detectChanges();
      },
      (err) => this.handleError(err),
      () => console.log("HTTP request completed.")
    );
  }

  /**
   * This method filters deleted employees and takes care of its reference
   * in direct reports
   * @param data the deleted employee object
   */
  filterDeletedEmployees(data: Employee) {
    let deletedId = data.id;
    let updatedEmployees = [...this.employees];
    for (let i = 0; i < updatedEmployees.length; i++) {
      if (updatedEmployees[i].directReports) {
        for (let j = 0; j < updatedEmployees[i].directReports.length; j++) {
          let subEmployee = updatedEmployees[i].directReports[j];
          if (subEmployee === deletedId) {
            updatedEmployees[i].directReports.splice(j, 1);
            let deletedempidindex = updatedEmployees.findIndex(
              (emp) => emp.id === deletedId
            );
            updatedEmployees.splice(deletedempidindex, 1);
          }
        }
      }
    }
    this.employees = [...updatedEmployees];
  }

  /**
   * Method to calculate total number of reports and
   * creates a list of direct reports
   */
  reCalculateTotalReports() {
    if (this.employees) {
      this.totalAndDirectReports = [];
      for (let i = 0; i < this.employees.length; i++) {
        let employee = this.employees[i];
        this.totalAndDirectReports[i] = {
          totalReports: 0,
          directReports: [],
        };
        if (employee.directReports) {
          for (let j = 0; j < employee.directReports.length; j++) {
            let subEmployee = this.employees.find(
              (subEmployee) => subEmployee.id === employee.directReports[j]
            );
            if (subEmployee) {
              this.totalAndDirectReports[i].directReports.push(subEmployee);
              this.totalAndDirectReports[i].totalReports += this
                .totalAndDirectReports[i].directReports
                ? this.totalAndDirectReports[i].directReports.length
                : 0;
            }
          }
        }
      }
    }
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return (this.errorMessage = e.message || "Unable to retrieve employees");
  }
}
