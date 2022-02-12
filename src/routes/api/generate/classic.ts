import type { EndpointOutput } from '@sveltejs/kit';
import { classic as theme } from '../../../themes';
import { validateGenerateRequest, logUsage, handlebarsToImage } from '../../../utils/api';
import { fetchTopTracks } from '../../../utils/api/last-fm';

export async function post(request): Promise<EndpointOutput> {
  const [ params, validationError ] = await validateGenerateRequest(request.body, theme.ratios);
  if (validationError) return validationError;

  const start = new Date();

  const [ tracks, tracksError ] = await fetchTopTracks(params.user.name, params.period, 4);
  if (tracksError) return tracksError;
  params.tracks = tracks;

  // const dummy = fetchDummyData(4);
  // params = { ...params, ...dummy };

  const titlesByPeriod = {
    '7day':    'Mais ouvidas da semana',
    '1month':  'Mais ouvidas do mês',
    '3month':  'Mais ouvidas em 3 meses',
    '6month':  'Mais ouvidas em 6 meses',
    '12month': 'Mais ouvidas do ano',
    'overall': 'Mais ouvidas de sempre',
  };
  params.title = titlesByPeriod[params.period];

  const result = await handlebarsToImage(theme.slug, params);

  const end = new Date();
  const timeElapsed = end.getTime() - start.getTime();
  logUsage(params.user.name, theme.slug, timeElapsed, params?.fields);

  return result;
}