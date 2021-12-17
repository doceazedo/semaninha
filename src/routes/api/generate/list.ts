import type { EndpointOutput } from '@sveltejs/kit';
import { list as theme } from '../../../themes';
import { validateGenerateRequest, handlebarsToImage } from '../../../utils/api';
import { fetchTopArtists } from '../../../utils/api/last-fm';

export async function post(request): Promise<EndpointOutput> {
  const [ params, validationError ] = await validateGenerateRequest(request.body, theme.ratios);
  if (validationError) return validationError;

  const [ artists, artistsError ] = await fetchTopArtists(params.user.name, params.period, 4);
  if (artistsError) return artistsError;
  params.artists = artists;

  const result = await handlebarsToImage(theme.slug, params);
  return result;
}