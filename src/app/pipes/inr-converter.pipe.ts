import { Pipe, PipeTransform } from '@angular/core';
import {addINRCommaSeparator} from '../utils/util.functions';

@Pipe({
  name: 'inrConverter'
})
export class InrConverterPipe implements PipeTransform {
  transform(value: number): string {
    return "₹ " + addINRCommaSeparator(value);
  }
}
