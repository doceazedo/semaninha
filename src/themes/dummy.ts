import type { Theme } from '../interfaces';
import { Ratio } from '../enums';

const classic: Theme = {
  slug: 'dummy',
  name: 'Modelo',
  ratios: [ Ratio.Square, Ratio.Vertical, Ratio.Horizontal ],
  premium: false
}

export default classic;