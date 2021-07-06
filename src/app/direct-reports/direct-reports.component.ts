import { Component, OnInit, Input } from "@angular/core";
import { Employee } from "../employee";

@Component({
  selector: "app-direct-reports",
  templateUrl: "./direct-reports.component.html",
  styleUrls: ["./direct-reports.component.css"],
})
export class DirectReportsComponent implements OnInit {
  @Input() drs;

  constructor() {}

  ngOnInit(): void {
    console.log(this.drs);
  }
}
