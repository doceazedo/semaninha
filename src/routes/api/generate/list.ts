import type { EndpointOutput } from '@sveltejs/kit';
import { list as theme } from '../../../themes';
import { validateGenerateRequest, handlebarsToImage } from '../../../utils/api';
import { fetchTopX } from '../../../utils/api/last-fm';

export async function post(request): Promise<EndpointOutput> {
  const [ params, validationError ] = await validateGenerateRequest(request.body, theme.ratios, theme.fields);
  if (validationError) return validationError;

  const [ topx, topxError ] = await fetchTopX(params.user.name, params.period, 4, params.fields.topx);
  if (topxError) return topxError;
  params.topx = topx;

  const titles = {
    'tracks':  'As músicas',
    'artists': 'Os artistas',
    'albums':  'Os álbums',
  };
  params.title = titles[params.fields.topx];

  const color = theme.fields.find(x => x.id == 'color');
  params.fields.color = color.colors[params.fields.color].color[0];

  const result = await handlebarsToImage(theme.slug, params);
  return result;
}