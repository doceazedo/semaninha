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

export const fetchAlbumCover = async (artist: string, title: string): Promise<string> => {
  await setupApi();

  const query = `${artist} ${title}`;
  const albums = await spotifyApi.searchAlbums(query, { limit: 10 });
  const items = albums.body.albums.items;
  let album = items.find(item => item.artists[0].name == artist && item.name.toLowerCase() == title.toLowerCase());

  if (!album)
    album = items.find(item => item.artists[0].name.toLowerCase() == artist.toLowerCase() && item.name.toLowerCase() == title.toLowerCase());

  return album ? album.images[0].url : '';
}

export const fetchTrackCover = async (artist: string, title: string): Promise<string> => {
  await setupApi();

  const query = `${artist} ${title}`;
  const tracks = await spotifyApi.searchTracks(query, { limit: 10 });
  const items = tracks.body.tracks.items;
  let track = items.find(item =>
    item.name == title &&
    item.artists[0].name == artist
  );

  if (!track)
    track = items.find(item =>
      item.name.toLowerCase() == title.toLowerCase() &&
      item.artists[0].name.toLowerCase() == artist.toLowerCase()
    );

  return track ? track.album.images[0].url : '';
}
