import type { EndpointOutput } from '@sveltejs/kit';
import { grid as theme } from '../../../themes';
import { validateGenerateRequest, handlebarsToImage } from '../../../utils/api';
import { fetchTopTracks } from '../../../utils/api/last-fm';

export async function post(request): Promise<EndpointOutput> {
  const [ params, validationError ] = await validateGenerateRequest(request.body, theme.ratios);
  if (validationError) return validationError;

  const [ tracks, tracksError ] = await fetchTopTracks(params.user.name, params.period, 9);
  if (tracksError) return tracksError;
  params.tracks = tracks;

  const result = await handlebarsToImage(theme.slug, params);
  return result;
}