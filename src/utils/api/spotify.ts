import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const refreshToken = process.env['SPOTIFY_REFRESH_TOKEN'];
const clientId = process.env['SPOTIFY_CLIENT_ID'];
const clientSecret = process.env['SPOTIFY_CLIENT_SECRET'];

const spotifyApi = new SpotifyWebApi();
spotifyApi.setCredentials({
  refreshToken,
  clientId,
  clientSecret,
});

const setupApi = async () => {
  const spotifyTokens = await spotifyApi.refreshAccessToken();
  spotifyApi.setAccessToken(spotifyTokens.body.access_token);
}

export const fetchArtistImage = async (name: string): Promise<string> => {
  await setupApi();

  const artists = await spotifyApi.searchArtists(name, { limit: 5 });
  const artist = artists.body.artists.items.find(artist => artist.name.toLowerCase() == name.toLowerCase())
  return artist ? artist.images[0].url : '';
}

export const fetchCoverImage = async (query: string): Promise<string> => {
  await setupApi();

  const tracks = await spotifyApi.searchTracks(query, { limit: 1 });
  const items = tracks.body.tracks.items;
  return items.length ? items[0].album.images[0].url : '';
}