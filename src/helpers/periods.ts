import type { Option } from '../interfaces';

const periods: Option[] = [
  { value: '7day',    label: 'Última semana'   },
  { value: '1month',  label: 'Último mês'      },
  { value: '3month',  label: 'Últimos 3 meses' },
  { value: '6month',  label: 'Últimos 6 meses' },
  { value: '12month', label: 'Último ano'      },
  { value: 'overall', label: 'Tempo todo'      },
];

export default periods;