import type { Ratio } from '../enums';

export default interface Theme {
  slug: string,
  name: string,
  ratios: Ratio[],
  premium: boolean,
}