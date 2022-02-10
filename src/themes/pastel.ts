import type { Theme } from '../interfaces';
import { Ratio } from '../enums';
import { color, topX } from '../fields';

const pastel: Theme = {
  slug: 'pastel',
  name: 'Pastel',
  ratios: [ Ratio.Horizontal ],
  premium: false,
  fields: [
    topX,
    { ...color,
      colors: [
        {
          name: 'Baunilha & Morango',
          color: [
            '#ffe6d4',
            '#ff8c9f',
          ],
        },
        {
          name: 'Blueberry',
          color: [
            '#D6E5FA',
            '#BAABDA',
          ],
        },
        {
          name: 'Menta',
          color: [
            '#C1FFD7',
            '#79B4B7',
          ],
        },
        {
          name: 'Tangerina',
          color: [
            '#30475E',
            '#F1935C',
          ],
        },
        {
          name: 'Tutti-frutti',
          color: [
            '#87d8c2',
            '#E36387',
          ],
        },
      ]
    }
  ]
}

export default pastel;