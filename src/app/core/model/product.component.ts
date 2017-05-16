/**
 * Created by christian on 4/03/17.
 */
import {Option} from "./option.component";
import {Category} from "./category.component";
import {Taxe} from "./taxe.component";
import {ProductDetails} from "./product-details.component";


export class Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  taxe: Taxe;
  created: Date;
  productDetails: ProductDetails[];
  options: Option[];
  imageName: string;
}
