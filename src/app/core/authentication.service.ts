import {Injectable, OnInit, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/Rx";
import {ConfigService} from "./config.service";
import {Exception} from "./exception.component";
import {User} from "./model/user/user.component";
import {Router} from "@angular/router";
@Injectable()
export class AuthenticationService implements OnInit {

  token: string | null;

  private authenticated: boolean;
  private authenticatedObservable: EventEmitter<boolean> = new EventEmitter();


  private redirectUrl: string = '';

  private user: User;
  private userLoaded: EventEmitter<boolean>;
  private roles: string[];

  constructor(private http: Http, private config: ConfigService, private router: Router) {
    this.userLoaded = new EventEmitter();
    let user = localStorage.getItem('currentUser');
    if (user != null) {
      var currentUser = JSON.parse(user);
    }
    this.token = currentUser && currentUser.token;
    if (this.isAuthenticated()) {
      this.getUserData();
    }
  }

  ngOnInit() {

    this.authenticationChanged();
  }

  singin(email: String, password: String): Observable<boolean> {
    let body = JSON.stringify({username: email, password: password});
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.config.get('serviceUrl') + '/auth', body, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: email, token: token}));
          if (this.redirectUrl == '' || this.redirectUrl == '/singin') {
            this.redirectUrl = "/mainpage";
          }
          this.getUserData();
          this.authenticationChanged();
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
      .catch(this.handleSingInError);
  }

  private handleSingInError(error: Response) {
    if (error.status == 400) {
      return Observable.throw(error.json() as Exception);
    }
    return Observable.throw(error);

  }


  private getUserData() {
    let headers = new Headers({'Content-Type': 'application/json'});

    headers.append('Authorization', this.token == null ? '' : this.token);
    let options = new RequestOptions({headers: headers});

    this.http.get(this.config.getUrl('employee') + '/current', options).subscribe(response => {
      console.log(response.json());
      this.user = response.json() as User;
      if (this.user != null) {
        this.roles = this.user.authorities.map(e => e.authority);
        this.userLoaded.emit(true);

        this.redirect();
      }

    });

  }

  private redirect() {
    let navigate = '/mainpage';
    if (this.redirectUrl != '') {
      navigate = this.redirectUrl;
    } else {
      navigate = this.router.url;
    }
    this.router.navigate([navigate]);

  }

  private authenticationChanged() {
    this.authenticated = this.token != null;
    this.authenticatedObservable.emit(this.authenticated);

  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.token = null;
    this.user = null;
    this.authenticationChanged();

  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  getUser(): Promise<User> {
    if (this.isAuthenticated() && this.user != null) {
      return new Promise<User>((resolve) => {
        resolve(this.user)
      });
    } else {
      this.userLoaded.subscribe(e => {
          if (this.isAuthenticated()) {
            this.userLoaded.unsubscribe();
            return new Promise<User>((resolve) => {
              resolve(this.user)
            });
          }
        }
      )
    }
  }

  getRoles(): string[] {
    return this.roles;
  }


}
