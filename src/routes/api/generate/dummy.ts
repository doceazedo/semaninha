import type { EndpointOutput } from '@sveltejs/kit';
import { dummy as theme } from '../../../themes';
import { validateGenerateRequest, logUsage, handlebarsToImage } from '../../../utils/api';

export async function post({ request }): Promise<EndpointOutput> {
  const body = await request.json();
  const [ params, validationError ] = await validateGenerateRequest(body, theme.ratios);
  if (validationError) return validationError;

  const start = new Date();

  // const dummy = fetchDummyData(4);
  // params = { ...params, ...dummy };

  const result = await handlebarsToImage(theme.slug, params);

  const end = new Date();
  const timeElapsed = end.getTime() - start.getTime();
  logUsage(params.user.name, theme.slug, timeElapsed, params?.fields);

  return result;
}