import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserPageComponent} from "./users-page/user-page.component";
import {CreateEmployeeComponent} from "./employee/create-employee.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ListEmployeesComponent} from "./list-employees/list-employees.component";
import {EmployeeDetailsComponent} from "./list-employees/employee-details/employee-details.component";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {WebClientService} from "../../core/web-client.service";
import {ConfigService} from "../../core/config.service";
import {EmployeeService} from "./employee.service";
import {RoleGuard} from "../../routing/role-guard.service";
import {RouterModule} from "@angular/router";
import {MaterializeModule} from "angular2-materialize/dist";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [UserPageComponent, CreateEmployeeComponent, ListEmployeesComponent, EmployeeDetailsComponent],
  providers: [WebClientService, ConfigService, EmployeeService,RoleGuard]
})
export class EmployeeModule {
}
