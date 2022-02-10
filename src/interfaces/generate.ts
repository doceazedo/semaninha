import type { Period, Ratio } from '../enums';

export default interface Generate {
  username: string,
  period: Period,
  ratio: Ratio,
  theme: string,
}