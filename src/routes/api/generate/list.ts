import type { EndpointOutput } from '@sveltejs/kit';
import { list as theme } from '../../../themes';
import { validateGenerateRequest, logUsage, handlebarsToImage } from '../../../utils/api';
import { fetchTopX } from '../../../utils/api/last-fm';

export async function post({ request }): Promise<EndpointOutput> {
  const body = await request.json();
  const [ params, validationError ] = await validateGenerateRequest(body, theme.ratios, theme.fields);
  if (validationError) return validationError;

  const start = new Date();

  const [ topx, topxError ] = await fetchTopX(params.user.name, params.period, 4, params.fields.topx);
  if (topxError) return topxError;
  params.topx = topx;

  const titlesByX = {
    'tracks':  'As músicas',
    'artists': 'Os artistas',
    'albums':  'Os álbuns',
  };

  const titlesByPeriod = {
    '7day':    'nessa semana',
    '1month':  'nesse mês',
    '3month':  'em 3 meses',
    '6month':  'em 6 meses',
    '12month': 'nesse ano',
    'overall': 'de sempre',
  };

  params.title = `${titlesByX[params.fields.topx]} que eu mais ouvi ${titlesByPeriod[params.period]}:`;

  const color = theme.fields.find(x => x.id == 'color');
  params.fields.color = color.colors[params.fields.color].color[0];

  const result = await handlebarsToImage(theme.slug, params);

  const end = new Date();
  const timeElapsed = end.getTime() - start.getTime();
  logUsage(params.user.name, theme.slug, timeElapsed, params?.fields);

  return result;
}