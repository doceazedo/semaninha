import type { EndpointOutput } from '@sveltejs/kit';
import { grid as theme } from '../../../themes';
import { validateGenerateRequest, logUsage, handlebarsToImage } from '../../../utils/api';
import { fetchTopX } from '../../../utils/api/last-fm';

export async function post({ request }): Promise<EndpointOutput> {
  const body = await request.json();
  const [ params, validationError ] = await validateGenerateRequest(body, theme.ratios);
  if (validationError) return validationError;

  const start = new Date();

  let limit: number;
  switch (params.fields.select) {
    case '3x3':
      limit = 9;
      break;
    case '5x5':
      limit = 25;
      break;
    case '10x10':
      limit = 100;
      break;
    default:
      return { status: 400, body: { error: `Invalid value for field select` } };
      break;
  }
  params.size = Number(params.fields.select.split('x')[0]);

  const [ topx, topxError ] = await fetchTopX(params.user.name, params.period, limit, params.fields.topx);
  if (topxError) return topxError;
  params.topx = topx;

  params.fields.bool = params.fields.bool === '1';
  if (params.size == 10) params.fields.bool = false;

  const result = await handlebarsToImage(theme.slug, params);

  const end = new Date();
  const timeElapsed = end.getTime() - start.getTime();
  logUsage(params.user.name, theme.slug, timeElapsed, params?.fields);

  return result;
}