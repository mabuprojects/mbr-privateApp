/**
 * Created by christian on 4/03/17.
 */
import {OptionLine} from "./option-line.component";
export class Option {
  id: number;
  name: string;
  main: boolean;
  optionLines: OptionLine[];
}
