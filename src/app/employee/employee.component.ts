import { Component, Input } from "@angular/core";

import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
})
export class EmployeeComponent {
  @Input() employees: Employee[];
  @Input() employee: Employee;
  private totalReports: number;
  private directReports;

  constructor(private employeeService: EmployeeService) {
    this.totalReports = 0;
    this.directReports = [];
  }

  ngOnInit(): void {
    this.calcDirectReports();
  }

  calcDirectReports(): void {
    if (this.employee.directReports) {
      // let allEmployees = this.employeeService
      //   .getAll()
      //   .subscribe((allemployees) => {
      //     console.log(allemployees);
      this.totalReports += this.employee.directReports.length;
      for (let i = 0; i < this.employee.directReports.length; i++) {
        let employee = this.employees.find(
          (employee) => employee.id === this.employee.directReports[i]
        );
        if (employee) {
          this.totalReports += employee.directReports
            ? employee.directReports.length
            : 0;
          this.directReports.push(employee);
        }
      }
      // console.log(this.directReports);
      // }
      // });
    }
  }
}
