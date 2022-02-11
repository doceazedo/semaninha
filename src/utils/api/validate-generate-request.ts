import type { Ratio } from '../../enums';
import type { Field } from '../../interfaces';
import { fetchUser } from './last-fm';
import { periods } from '../../helpers';

interface Params {
  user: string,
  period: string,
  ratio: string,
  fields?: Field[]
}

export const validateGenerateRequest = async (params: Params, ratios: Ratio[], fields: Field[] = []): Promise<[any, any]> => {
  const [ user, userError ] = await fetchUser(params?.user);
  if (userError) return [ null, { status: 400, body: { error: userError } } ];

  const period = periods.find(x => x.value == params?.period);
  if (!period) return [ null, { status: 400, body: { error: 'Invalid period' } } ];

  const ratio = ratios.find(x => x == params?.ratio); // se params.ratio for do tipo Ratio, dá pra usar: .includes(params?.ratio)
  if (!ratio) return [ null, { status: 400, body: { error: 'Invalid ratio' } } ];

  const fieldErrors: string[] = [];
  fields.forEach(field => {
    const inputValue = params?.fields[field.id];
    if (!inputValue) fieldErrors.push(`Missing field ${field.id}`);
    
    const isInputValid = field.values?.find(x => x == inputValue) || (inputValue >= 0 && inputValue < field.colors.length);
    if (!isInputValid) fieldErrors.push(`Invalid value for field ${field.id}`);
  });
  if (fieldErrors.length) return [ null, { status: 400, body: { error: fieldErrors.join('. ') } } ];

  params.user = user; // patch user with already fetched data

  return [ params, null ];
}
