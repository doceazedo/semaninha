import type { Theme } from '../interfaces';
import { Ratio } from '../enums';
import { select, bool, topX } from '../fields';

const grid: Theme = {
  slug: 'grid',
  name: 'Mosaico',
  ratios: [ Ratio.Square ],
  premium: false,
  fields: [
    {...select, label: 'Tamanho da grade:', values: [
      '3x3',
      '5x5',
      '10x10'
    ]},
    topX,
    { ...bool, label: 'Mostrar títulos?' }
  ]
}

export default grid;