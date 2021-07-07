import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";

import { Employee } from "../employee";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  @Input() employees: Employee[];
  @Input() employee: Employee;
  @Output() saveEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<Employee>();
  private totalReports: number;
  private directReports;

  constructor(private cdr: ChangeDetectorRef) {
    this.totalReports = 0;
    this.directReports = [];
  }

  ngOnInit(): void {
    this.calcDirectReports();
  }

  calcDirectReports(): void {
    if (this.employee.directReports) {
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
          this.cdr.detectChanges();
        }
      }
    }
  }
}
