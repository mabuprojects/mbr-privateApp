import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../../core/model/order/order.component";

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(items: Order[], filter: string[]): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => filter.indexOf(item.status)!=-1);
  }

}
