import type { Theme } from '../interfaces';
import { Ratio } from '../enums';
import { color, topX } from '../fields';

const list: Theme = {
  slug: 'list',
  name: 'Lista',
  ratios: [ Ratio.Vertical ],
  premium: false,
  fields: [
    topX,
    { ...color,
      colors: [
        {
          name: 'Céu',
          color: [
            'linear-gradient(to bottom right, #0052D4, #4364F7, #6FB1FC)'
          ],
        },
        {
          name: 'Luxúria',
          color: [
            'linear-gradient(to bottom right, #ed213a, #93291e)'
          ],
        },
        {
          name: 'Limonada',
          color: [
            'linear-gradient(to bottom right, #00b09b, #96c93d)'
          ],
        },
        {
          name: 'Azul & Rosa',
          color: [
            'linear-gradient(to bottom right, #12c2e9, #c471ed, #f64f59)'
          ],
        },
        {
          name: 'Ametista',
          color: [
            'linear-gradient(to bottom right, #6441a5, #2a0845)'
          ],
        },
      ]
    }
  ]
}

export default list;