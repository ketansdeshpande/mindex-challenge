import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from "@angular/core";

import { Employee } from "../employee";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  @Input() employee: Employee;
  @Input() totalAndDirectReports: any;
  @Output() saveEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<Employee>();

  constructor() {}

  ngOnInit(): void {}
}
