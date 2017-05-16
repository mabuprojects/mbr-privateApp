import {Component, OnInit, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterializeAction} from "angular2-materialize/dist";
import {ReuseFormComponent} from "../../../shared/reuse-form/reuse-form.component";
import {Restaurant} from "../../../core/model/restaurant/restaurant.component";
import {RestaurantService} from "../../../core/restaurant.service";
import {Address} from "../../../core/model/address.component";
import {TimeTable} from "../../../core/model/restaurant/time-table.component";
import {Day} from "../../../core/model/restaurant/day.component";
/**
 * Esta página tiene dos modos de apertura:
 *  - EDIT -> edita los datos de un restaurante
 *  - NEW  - > crea un restaurante
 */
@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-edit-restaurant.component.html'
})
export class CreateEditRestaurantComponent extends ReuseFormComponent implements OnInit {

  restaurantForm: FormGroup;
  addressForm: FormGroup;
  timeTableForm: FormGroup;

  toastCreateActions = new EventEmitter<string|MaterializeAction>();
  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  error = false;
  errorMessage = '';

  restaurantName: string;
  openMode: string;
  editRestaurant: Restaurant;

  services = ['DELIVERY', 'TAKE_AWAY'];

  private chips: number[] = [];

  private chipsInit = {
    data: [],
  };

  private morningHours: {name: string;value: number}[] = [];
  private dinnerHours: {name: string;value: number}[] = [];

  constructor(private restaurantService: RestaurantService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    super();

  }



  ngOnInit(): void {
    //Si la página recibe el nombre de un restaurante el modo de apertura es EDIT, sino NEW
    this.route.params.subscribe(params => {
      this.restaurantName = params['restaurantName']
    });

    this.initHours();
    this.openMode = (this.restaurantName) ? "EDIT" : "NEW";

    if (this.openMode === "EDIT") {

      this.restaurantService.getRestaurantObservable().subscribe(restaurant => {
        this.editRestaurant = restaurant;
        this.createForm(this.editRestaurant);
      });
      this.restaurantService.getRestaurantByName(this.restaurantName, false);
      this.setEditServices();
      this.setEditTimeTable();
    } else {
      //openMode == NEW
      this.editRestaurant = this.createEmptyRestaurant();
      this.createForm(this.editRestaurant);
      this.setServices();
      this.setTimeTable();
    }
  }


  initHours(){
    for (let i = 7*60; i <= 15 * 60; i += 30) {
      let hour = '' + Math.floor(i / 60);
      if (hour.length < 2) {
        hour = '0' + hour;
      }
      let min = '' + i % 60;
      if (min.length < 2) {
        min = '0' + min;
      }
      this.morningHours.push({name: hour + ":" + min, value: i});

    }
    for (let i = 16*60; i <= 23 * 60; i += 30) {
      let hour = '' + Math.floor(i / 60);
      if (hour.length < 2) {
        hour = '0' + hour;
      }
      let min = '' + i % 60;
      if (min.length < 2) {
        min = '0' + min;
      }
      this.dinnerHours.push({name: hour + ":" + min, value: i});

    }
  }

  setServices() {
    const servicesFGs = this.services.map(service => this.fb.group(new ServiceCheckBox(service)));
    const servicesFormArray = this.fb.array(servicesFGs);
    this.restaurantForm.setControl('services', servicesFormArray);
  }


  setEditServices() {
    const servicesFGs = this.services.map(service => {
      let serviceCheck = new ServiceCheckBox(service);
      if (this.editRestaurant.services) {
        let result = this.editRestaurant.services.filter(function (name) {
          if (name == service) return name;
        });
        serviceCheck.checked = result.length > 0;
      }
      return this.fb.group(serviceCheck)
    });
    const servicesFormArray = this.fb.array(servicesFGs);
    this.restaurantForm.setControl('services', servicesFormArray);
  }

  setTimeTable() {
    const servicesFGs = this.editRestaurant.timeTable.days.map(day => this.fb.group(day));
    const servicesFormArray = this.fb.array(servicesFGs);
    this.timeTableForm.setControl('days', servicesFormArray);
  }

  setEditTimeTable() {
    const servicesFGs = this.editRestaurant.timeTable.days.map(day => {this.dayToInt(day);return this.fb.group(day)});
    const servicesFormArray = this.fb.array(servicesFGs);
    this.timeTableForm.setControl('days', servicesFormArray);
  }

  dayToInt(day: Day) {
    let dayNum = 0;
    switch (day.day) {
      case 'MONDAY':
        dayNum =  0;
        break;
      case 'TUESDAY':
        dayNum =  1;
        break;
      case 'WEDNESDAY':
        dayNum =  2;
        break;
      case 'THURSDAY':
        dayNum =  3;
        break;
      case 'FRIDAY':
        dayNum =  4;
        break;
      case 'SATURDAY':
        dayNum =  5;
        break;
      case 'SUNDAY':
        dayNum =  6;
        break;
    }
    day.day=dayNum;
  }

  /**
   * Inicializo el form
   *  NEW -> Form vacio
   *  EDIT -> Form completo
   * @param editRestaurant
   */
  createForm(editRestaurant: Restaurant) {
    if (editRestaurant.zipCodes) {
      let zipCodes = editRestaurant.zipCodes.map(code => new Tag(code));
      this.chips = editRestaurant.zipCodes;
      this.chipsInit = {data: zipCodes};
    }
    this.timeTableForm = this.fb.group({ // <-- the child FormGroup
      days: this.fb.array([])
    });
    this.addressForm = this.fb.group({ // <-- the child FormGroup
      street: [editRestaurant.address.street, Validators.required],
      number: [editRestaurant.address.number, Validators.required],
      unity: [editRestaurant.address.unity, Validators.required],
      postalCode: [editRestaurant.address.postalCode, Validators.required],
      state: [editRestaurant.address.state, Validators.required],
      city: [editRestaurant.address.city, Validators.required],
      country: [editRestaurant.address.country, Validators.required],
      observations: '',
    });
    this.restaurantForm = this.fb.group({
      name: [editRestaurant.name, Validators.required], //Validators.composeAsync([this.asyncValidator])]
      email: [editRestaurant.email, Validators.compose([Validators.required, Validators.pattern(this.getEmailPattern())])], //Validators.composeAsync([this.asyncValidator])]
      minPriceDelivery: [editRestaurant.minPriceDelivery, Validators.compose([Validators.required, Validators.minLength(7), this.greaterThan0])],
      transportPrice: [editRestaurant.minPriceDelivery, Validators.compose([Validators.required, Validators.minLength(7), this.greaterThan0])],
      nif: [editRestaurant.nif, Validators.required],
      phoneNumber: [editRestaurant.phoneNumber, Validators.required],
      visible: [editRestaurant.visible, Validators.required],
      services: this.fb.array([]),
      address: this.addressForm,
      timeTable: this.timeTableForm
    });
  }


  /**
   * Recupera los cambios del formulario
   *
   * @returns {Restaurant}
   */
  prepareSaveRestaurant(): Restaurant {
    const formModel = this.restaurantForm.value;

    var restaurant: Restaurant = {
      id: this.editRestaurant.id,
      name: formModel.name,
      email: formModel.email,
      phoneNumber: formModel.phoneNumber,
      visible: formModel.visible,
      minPriceDelivery: formModel.minPriceDelivery,
      transportPrice: formModel.transportPrice,
      nif: formModel.nif,
      services: formModel.services.filter(e => e.checked).map(e => e.name),
      zipCodes: this.chips,
      address: formModel.address,
      timeTable: formModel.timeTable
    };
    restaurant.address.id = this.editRestaurant.address.id;
    restaurant.address.latitude = this.editRestaurant.address.latitude;
    restaurant.address.longitude = this.editRestaurant.address.longitude;
    restaurant.timeTable.id = this.editRestaurant.timeTable.id;
    return restaurant;
  }

  onSubmit() {
    if (this.validateServices()) {
      var restaurant = this.prepareSaveRestaurant();
      if (this.openMode === "NEW") {
        this.restaurantService.createRestaurant(restaurant).subscribe(
          result => {
            if (result) {
              this.toastCreateActions.emit('toast');
              this.restaurantService
                .getRestaurants(true);
              this.router.navigate(['restaurant']);
            }
          },
          (err) => {
            this.error = true;
            this.errorMessage = err.message;
          });


      } else {
        //openMode= EDIT
        this.restaurantService.updateRestaurant(restaurant).subscribe(
          result => {
            if (result) {
              this.toastUpdateActions.emit('toast');
              this.restaurantService
                .getRestaurants(true);
              this.router.navigate(['restaurant']);
            }
          },
          (err) => {
            this.error = true;
            this.errorMessage = err.message;
          });
      }
    }

  }

  validateServices(): boolean {
    let services: string[] = this.restaurantForm.controls['services'].value.filter(e => e.checked).map(e => e.name);
    if (services.length == 0) {
      this.errorMessage = 'Selecciona al menos un servicio';
      this.error = true;
      return false;
    }
    return true;

  }

  /**
   * Validador para el campo restaurant.name
   * Comprueba si hay algún restaurante con ese nombre
   *
   * NO FUNCIONA -> error con la validacion asincrona por parte de angular.
   * El codigo comentado es correcto, el problema es que siempre que devuelves
   * una promesa, el form no es valido. con resolve(null) debería ser valido y no va
   * @param control
   * @returns {Promise<T>}
   */
  asyncValidator(control: FormControl): Promise<{[key: string]: any}> {
    return new Promise(resolve => {
      resolve(null);
    });
    //   if (control.value) {
    //     return new Promise(resolve => {
    //       this.restaurantService.existRestaurantName(control.value).subscribe(data => {
    //         console.log(data);
    //         if (data == true) {
    //           resolve({"duplicate": data})
    //         } else {
    //           resolve(null);
    //         }
    //       });
    //     });
    //   } else {
    //     return new Promise(resolve => {
    //       resolve(null)
    //     });
    //   }
    // }
  }


//---------------------------------------------------------------------------------
  //AUX FUNCTIONS
  createEmptyRestaurant(): Restaurant {
    var r = new Restaurant();
    r.minPriceDelivery = null;
    r.id = null;
    r.name = null;
    r.services = null;
    r.phoneNumber = null;
    r.visible = true;
    r.email = null;
    r.transportPrice = null;
    r.zipCodes = null;
    var a = new Address();
    a.id = null;
    a.street = null;
    a.city = null;
    a.country = null;
    a.latitude = null;
    a.number = null;
    a.observations = null;
    a.postalCode = null;
    a.state = null;
    a.unity = null;
    a.longitude = null;

    r.address = a;


    r.timeTable = this.createTimeTable();
    return r;
  }

  createTimeTable() {
    let timetable = new TimeTable();
    timetable.id = null;
    timetable.days = [];
    for (let i = 0; i < 7; i++) {
      timetable.days.push(this.createDay(i));
    }
    return timetable;
  }

  createDay(name: number) {
    let day: Day = new Day();
    day.day = name;
    day.id = null;
    day.openDinner = false;
    day.openMorning = false;
    day.openingMorning = null;
    day.openingDinner = null;
    day.lastHourToMorningBook = null;
    day.lastHourToDinnerBook = null;
    return day;
  }

  get servicesControls(): FormArray {
    return this.restaurantForm.get('services') as FormArray;
  };

  get days(): FormArray {
    return this.timeTableForm.get('days') as FormArray;
  };


  add(chip) {
    let number = parseInt(chip.tag);
    if (!number) {
      return;
    }
    if (this.chips.find(e => e === number)) {
      return;
    }
    this.chips.push(number);
  }

  delete(chip) {
    let index = this.chips.indexOf(parseInt(chip.tag));
    if (index > -1) {
      this.chips.splice(index, 1);
    }
  }

}

class ServiceCheckBox {
  name: string;
  checked: boolean;

  constructor(name: string) {
    this.name = name;
    this.checked = false;
  }

}

class Tag {
  tag: number;

  constructor(tag: number) {
    this.tag = tag;
  }
}
