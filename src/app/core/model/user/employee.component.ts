import {Role} from "./role.component";
/**
 * Created by alejandro on 17/03/17.
 */
export class Employee{
    id: number;
    email: number;
    enabled: boolean;
    credentialsexpired: boolean;
    expired: boolean;
    locked: boolean;
    name:string;
    roles:Role[];
}
