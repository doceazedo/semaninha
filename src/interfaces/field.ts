import type Color from './color';

export default interface Field {
  id: string,
  values?: string[],
  colors?: Color[],
  label?: string,
}