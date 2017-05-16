import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
/**
 * Created by alejandro on 17/03/17.
 */
@Injectable()
export class WebClientService {

  constructor(private http: Http, private auth: AuthenticationService) {

  }

  public secureGet(url: string): Observable<Response> {
    let headers = this.getSecureHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options);

  }

  public securePost(url: string, body: any): Observable<Response> {
    let headers = this.getSecureHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, body, options);

  }

  public securePatch(url: string, body: any): Observable<Response> {
    let headers = this.getSecureHeaders();
    let options = new RequestOptions({headers: headers});
    return this.http.patch(url, body, options);

  }

  private getSecureHeaders(): Headers {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.auth.token == null ? '' : this.auth.token);
    return headers
  }
}
