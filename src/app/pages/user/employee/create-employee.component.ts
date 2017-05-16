import {Component, OnInit, AfterViewChecked, OnDestroy, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {ReuseFormComponent} from "../../../shared/reuse-form/reuse-form.component";
import {WebClientService} from "../../../core/web-client.service";
import {ConfigService} from "../../../core/config.service";
import {EmployeeService} from "../employee.service";
import {Role} from "../../../core/model/user/role.component";
import {ActivatedRoute} from "@angular/router";
import {Employee} from "../../../core/model/user/employee.component";
import {MaterializeAction} from "angular2-materialize/dist";
declare var Materialize: any;
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
})

export class CreateEmployeeComponent extends ReuseFormComponent implements OnInit {

  employeeForm: FormGroup;
  error: boolean = false;
  errorMessage: string = '';
  employee: Employee;
  openMode: string;
  employeeId: number;

  toastCreateActions = new EventEmitter<string|MaterializeAction>();
  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  constructor(private fb: FormBuilder, private http: WebClientService,
              private config: ConfigService, private employeeService: EmployeeService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    //Si la página recibe el nombre de un restaurante el modo de apertura es EDIT, sino NEW
    this.route.params.subscribe(params => {
      let employeeId = parseInt(params['id']);
      if (this.employeeId == employeeId) {
        return;
      } else {
        this.employeeId = employeeId;
      }

      this.openMode = (this.employeeId) ? "EDIT" : "NEW";

      if (this.openMode === "EDIT") {
        this.edit();
      } else {
        this.createNewForm();
      }
    });
  }

  private edit() {
    this.createEmptyEditForm();
    this.employeeService.getEmployeeById(this.employeeId).then(employee => {
      this.employee = employee;
      this.populateEditForm(this.employee);
      Materialize.updateTextFields();
    });
  }

  createNewForm() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        this.getEmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      roles: this.fb.array([])
    });

    this.employeeService.getEmployeeRoles().subscribe(
      result => {
        this.setRoles(result.json() as Role[]);
      }, error => {
      });

  }

  createEmptyEditForm() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        this.getEmailValidator
      ])],
      roles: this.fb.array([])
    });
  }

  populateEditForm(employee: Employee) {
    this.employeeForm.patchValue({'name': employee.name, 'email': employee.email});
    this.employeeService.getEmployeeRoles().subscribe(
      result => {
        this.setEmployeeRoles(result.json() as Role[]);
      }, error => {
      });

  }

  onSubmit() {
    if (this.employeeForm.valid) {
      let roles: number[] = this.employeeForm.controls['roles'].value.filter(e => e.checked).map(e => e.id);
      if (roles.length == 0) {
        this.errorMessage = 'Selecciona al menos un rol';
        this.error = true;
      } else {
        let email = this.employeeForm.controls['email'].value;
        let name = this.employeeForm.controls['name'].value;
        if (this.openMode == 'EDIT') {
          this.employeeService.updateEmployee(this.employee.id, email, name, roles).subscribe(
            (e) => {
              this.toastUpdateActions.emit('toast');
            }, this.handleCreateError.bind(this)
          );
        } else {

          let password = this.employeeForm.controls['password'].value;
          this.employeeService.registerEmployee(email, password, name, roles).subscribe(
            (e) => {
              this.toastCreateActions.emit('toast');
            }, this.handleCreateError.bind(this)
          );
        }
      }
    }
  }

  handleCreateError(error) {
    this.error = true;
    switch (error.id) {
      case  1: {
        this.errorMessage = 'El email ya existe';
        break;
      }
    }
  }

  setRoles(roles: Role[]) {
    const rolesFGs = roles.map(role => this.fb.group(new RoleCheckBox(role)));
    const rolesFormArray = this.fb.array(rolesFGs);
    this.employeeForm.setControl('roles', rolesFormArray);
  }

  setEmployeeRoles(roles: Role[]) {
    const rolesFGs = roles.map(role => {
      let roleCheck = new RoleCheckBox(role);
      let result = this.employee.roles.filter(function (obj) {
        if (obj.id == role.id) return obj;
      });
      roleCheck.checked = result.length > 0;
      return this.fb.group(roleCheck)
    });
    const rolesFormArray = this.fb.array(rolesFGs);
    this.employeeForm.setControl('roles', rolesFormArray);
  }

  get roles(): FormArray {
    return this.employeeForm.get('roles') as FormArray;
  };


}

class RoleCheckBox implements Role {
  id: number;
  name: string;
  checked: boolean;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.checked = false;
  }

}
