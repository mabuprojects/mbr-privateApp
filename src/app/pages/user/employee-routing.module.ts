import {Routes} from "@angular/router";
import {UserPageComponent} from "./users-page/user-page.component";
import {CreateEmployeeComponent} from "./employee/create-employee.component";
import {RoleGuard} from "../../routing/role-guard.service";


export const employeeRoutes: Routes = [
  {
    path: '', component: UserPageComponent, canActivate: [RoleGuard], data: {roles: ['ROLE_USER_MANAGER']}, children: [
    {path: 'new', component: CreateEmployeeComponent},
    {path: ':id', component: CreateEmployeeComponent}
  ]
  },
];

