import type { Ratio } from '../enums';
import type Field from './field';

export default interface Theme {
  slug: string,
  name: string,
  ratios: Ratio[],
  premium: boolean,
  fields?: Field[]
}