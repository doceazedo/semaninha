import type { EndpointOutput } from '@sveltejs/kit';
import { dummy as theme } from '../../../themes';
import { validateGenerateRequest, handlebarsToImage } from '../../../utils/api';

export async function post(request): Promise<EndpointOutput> {
  const [ params, validationError ] = await validateGenerateRequest(request.body, theme.ratios);
  if (validationError) return validationError;

  // const dummy = fetchDummyData(4);
  // params = { ...params, ...dummy };

  const result = await handlebarsToImage(theme.slug, params);
  return result;
}