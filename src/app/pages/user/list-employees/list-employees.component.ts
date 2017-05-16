import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../core/model/user/employee.component";
import {WebClientService} from "../../../core/web-client.service";
import {EmployeeService} from "../employee.service";
import {ConfigService} from "../../../core/config.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
})
export class ListEmployeesComponent implements OnInit {

  employees: Observable<Employee[]>;

  constructor(private employeeSerivce: EmployeeService) {
    this.employees = this.employeeSerivce.getEmployeesObservable();
  }

  ngOnInit() {

    this.employeeSerivce.getEmployees(false);
  }


}
