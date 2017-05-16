import {Injectable} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs";
import {WebClientService} from "../../core/web-client.service";
import {ConfigService} from "../../core/config.service";
import {Exception} from "../../core/exception.component";
import {Employee} from "../../core/model/user/employee.component";

@Injectable()
export class EmployeeService {

  employees: Employee[];
  employeesObservable: ReplaySubject<Employee[]>;


  employee: Employee;
  employeeObservable: Promise<Employee>;

  constructor(private webClient: WebClientService, private configService: ConfigService) {
    this.employeesObservable = new ReplaySubject<Employee[]>(1);
  }


  getEmployeesObservable() {
    return this.employeesObservable;
  }

  getEmployees(refresh: boolean): void {

    let request: boolean = true;
    if (this.employees) {
      request = false;
    }
    request = refresh ? true : request;

    if (request) {
      this.webClient.secureGet(this.configService.getUrl('employee'))
        .map(response => {
          this.employees = response.json();
          this.employeesObservable.next(this.employees);
        })
        .catch(this.handleError)
        .subscribe();
    }

  }

  updateEmployee(id:number,email:String, name:String, roles:number[]){
    let body = JSON.stringify({email: email, password: '', name: name, roles: roles});
    return this.webClient.securePatch(this.configService.getUrl('employee')+'/'+id, body)
      .map(() => {
        this.getEmployees(true);
        return true
      })
      .catch(this.handleError);

  }

  registerEmployee(email: String, password: String, name: String, roles: number[]) {
    let body = JSON.stringify({email: email, password: password, name: name, roles: roles});

    return this.webClient.securePost(this.configService.getUrl('employee'), body)
      .map(() => {
        this.getEmployees(true);
        return true

      })
      .catch(this.handleError);

  }

  private handleError(error: any) {
    if (error.status == 400) {
      return Observable.throw(error.json() as Exception);
    }
    return Observable.throw(error.json());

  }


  getEmployeeById(id: number):Promise<Employee> {
    return new Promise((resolve, reject) => {

      if (!this.employees) {
        this.employeesObservable.subscribe(() => {
          resolve(this.employeeFound(id));
          this.employeesObservable.unsubscribe();
        });
        this.getEmployees(false);
      } else {
        resolve(this.employeeFound(id));
      }

    });

  }

  private employeeFound(id: number) {
    return this.employees.find(r => r.id === id);
  }



  getEmployeeRoles(){
    return this.webClient.secureGet(this.configService.getUrl('employeeRoles'));
  }
}
