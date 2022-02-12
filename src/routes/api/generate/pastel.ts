import type { EndpointOutput } from '@sveltejs/kit';
import tinycolor from 'tinycolor2';
import { pastel as theme } from '../../../themes';
import { validateGenerateRequest, logUsage, handlebarsToImage } from '../../../utils/api';
import { fetchTopX } from '../../../utils/api/last-fm';

export async function post({ request }): Promise<EndpointOutput> {
  const body = await request.json();
  const [ params, validationError ] = await validateGenerateRequest(body, theme.ratios);
  if (validationError) return validationError;

  const start = new Date();

  const [ topx, topxError ] = await fetchTopX(params.user.name, params.period, 3, params.fields.topx);
  if (topxError) return topxError;
  params.topx = topx;

  const titlesByX = {
    'tracks':  'músicas',
    'artists': 'artistas',
    'albums':  'álbuns',
  };

  const titlesByPeriod = {
    '7day':    'da semana',
    '1month':  'do mês',
    '3month':  'em 3 meses',
    '6month':  'em 6 meses',
    '12month': 'desse ano',
    'overall': 'de sempre',
  };

  params.title = `Top ${titlesByX[params.fields.topx]} ${titlesByPeriod[params.period]}:`;

  const colors = theme.fields.find(x => x.id == 'color');
  params.fields.colors = colors.colors[params.fields.color].color;

  params.fields.textColor = tinycolor(params.fields.colors[0]).getBrightness() > 75 ? '#000' : '#fff';

  const result = await handlebarsToImage(theme.slug, params);

  const end = new Date();
  const timeElapsed = end.getTime() - start.getTime();
  logUsage(params.user.name, theme.slug, timeElapsed, params?.fields);
  
  return result;
}