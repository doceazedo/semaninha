import type { Ratio } from '../../enums';
import { fetchUser } from './last-fm';
import { periods } from '../../helpers';

interface Params {
  user: string,
  period: string,
  ratio: string,
}

const validateGenerateRequest = async (params: Params, ratios: Ratio[]): Promise<[any, any]> => {
  const [ user, userError ] = await fetchUser(params?.user);
  if (userError) return [ null, { status: 400, body: { error: userError } } ];

  const period = periods.find(x => x.value == params?.period);
  if (!period) return [ null, { status: 400, body: { error: 'Invalid period' } } ];

  const ratio = ratios.find(x => x == params?.ratio); // se params.ratio for do tipo Ratio, dá pra usar: .includes(params?.ratio)
  if (!ratio) return [ null, { status: 400, body: { error: 'Invalid ratio' } } ];

  params.user = user; // patch user with already fetched data

  return [ params, null ];
}

export default validateGenerateRequest;