import {Address} from "../address.component";
import {TimeTable} from "./time-table.component";
export class Restaurant {
  id: number;
  name: string;
  email: string;
  minPriceDelivery: number;
  transportPrice: number;
  phoneNumber: string;
  visible: boolean;
  nif: string;
  services: string[];
  zipCodes:number[];
  address: Address;
  timeTable:TimeTable;
}
