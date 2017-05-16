import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import {Observable, ReplaySubject} from "rxjs";
import {Taxe} from "../../core/model/taxe.component";
import {ConfigService} from "../../core/config.service";
import {Exception} from "../../core/exception.component";

@Injectable()
export class TaxeService {

    taxes: Taxe[];
    taxesObservable: ReplaySubject<Taxe[]>;


    constructor(private http: Http, private configService: ConfigService) {
        this.taxesObservable = new  ReplaySubject(1);

    }


    getTaxesObservable(): Observable<Taxe[]>{
        return this.taxesObservable;
    }

    /**
     *Obtiene todos los impuestos
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    getTaxes(refresh: boolean = false): void {
        var request: boolean = true;

        if (this.taxes) {
            request = false;
        }

        request = refresh ? true : request;

        if (request) {
            //No ha realizado la petición o quiere forzarla
            this.http.get(this.configService.getUrl('taxe'))
                .map(response => {
                    this.taxes = response.json();
                    this.taxesObservable.next(this.taxes);
                })
                .catch(this.handleError)
                .subscribe();
        }

    }


    /**
     *Crea un impuesto
     * @param taxe
     * @returns {Observable<R>}
     */
    createTaxe(taxe: Taxe): Observable<boolean> {
        let body = JSON.stringify(taxe);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.configService.getUrl('taxe'), body, options)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError);
    }


    /**
     * Actualiza un impuesto
     *
     * @param taxe
     * @returns {Observable<R>}
     */
    updateTaxe(taxe: Taxe): Observable<boolean> {
        let body = JSON.stringify(taxe);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.configService.getUrl('taxe'), body, options)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError);
    }

    /**
     * Elimina un impuesto
     *
     * @param taxeId
     * @returns {Observable<R>}
     */
    deleteTaxe(taxeId: number): Observable<boolean> {
        return this.http.delete(this.configService.getUrl('taxe') + `/${taxeId}`)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError);
    }

    /**
     *Obtiene un impuesto con ese nombre
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    findTaxeByName(taxeName: string, refresh: boolean): Observable<Taxe> {
        if (!refresh && this.taxes) {
            //Ya he realizado esta petición
            return Observable.of(this.taxes.find(t => t.name === taxeName));
        } else {
            //No ha realizado la petición o quiere forzarla
            return this.http.get(this.configService.getUrl('taxe'))
                .map(response => {
                    this.taxes = response.json();
                    return this.taxes.find(t => t.name === taxeName)
                })
                .catch(this.handleError);
        }
    }

    /**
     * Maneja los errores
     * @param error
     * @returns {any}
     */
    private handleError(error: Response) {
        if (error.status == 400) {
            return Observable.throw(error.json() as Exception);
        }
        return Observable.throw(error.json());

    }
}
