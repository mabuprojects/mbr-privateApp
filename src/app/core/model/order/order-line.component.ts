import {Taxe} from "../taxe.component";
import {OrderLinePrice} from "./order-line-price.component";
/**
 * Created by alejandro on 13/04/17.
 */
export class OrderLine {
    id: number;
    productId: number;
    taxe: Taxe;
    quantity: number;
    price: number;
    totalPrice: number;
    productName:string;
    productImage:string;
    optionLinePrices: OrderLinePrice[];
}
