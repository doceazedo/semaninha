import dotenv from 'dotenv';
import { fetchArtistImage, fetchTrackCover, fetchAlbumCover } from './spotify';

dotenv.config();

const fetchLastFmData = async (params): Promise<any> => {
  params = new URLSearchParams(params).toString();
  const lastfmKey: string = process.env['LASTFM_KEY'];
  const data = await(await fetch(`https://ws.audioscrobbler.com/2.0/?api_key=${lastfmKey}&format=json&${params}`)).json();
  return data;
}

export const fetchUser = async (user: string): Promise<[any, any]> => {
  if (!user) return [ null, 'Username is required' ];

  const data = await fetchLastFmData({
    method: 'user.getInfo',
    user
  });

  if (data?.error) return [ null, 'Could not find user' ];

  return [
    data?.user,
    null
  ];
}

export const fetchTopTracks = async (user: string, period = '7day', limit = 4): Promise<[any, any]> => {
  const data = await fetchLastFmData({
    method: 'user.gettoptracks',
    user,
    period,
    limit
  });

  if (data?.error) return [ null, { status: 500, body: { error: data?.message } } ];

  for (const track of data.toptracks.track) {
    track.image = await fetchTrackCover(track.artist.name, track.name); // TODO: return all sizes
  }

  return [
    data.toptracks,
    null
  ];
}

export const fetchTopArtists = async (user: string, period = '7day', limit = 4): Promise<[any, any]> => {
  const data = await fetchLastFmData({
    method: 'user.gettopartists',
    user,
    period,
    limit
  });

  if (data?.error) return [ null, { status: 500, body: { error: data?.message } } ];

  for (const artist of data.topartists.artist) {
    artist.image = await fetchArtistImage(artist.name);
  }

  return [
    data.topartists,
    null
  ];
}

export const fetchTopAlbums = async (user: string, period = '7day', limit = 4): Promise<[any, any]> => {
  const data = await fetchLastFmData({
    method: 'user.gettopalbums',
    user,
    period,
    limit
  });

  if (data?.error) return [ null, { status: 500, body: { error: data?.message } } ];

  for (const album of data.topalbums.album) {
    album.image = await fetchAlbumCover(album.artist.name, album.name); // TODO: return all sizes
  }

  return [
    data.topalbums,
    null
  ];
}

export const fetchTopX = async (user: string, period = '7day', limit = 4, topx: string): Promise<[any, any]> => {
  switch (topx) {
    case 'tracks': {
      const [ tracks, tracksError ] = await fetchTopTracks(user, period, limit);
      if (tracksError) return [ tracks, tracksError ];
      
      return [ { topx: tracks.track }, null ];
      break;
    }

    case 'artists': {
      const [ artists, artistsError ] = await fetchTopArtists(user, period, limit);
      if (artistsError) return [ artists, artistsError ];

      return [ { topx: artists.artist }, null ];
      break;
    }

    case 'albums': {
      const [ albums, albumsError ] = await fetchTopAlbums(user, period, limit);
      if (albumsError) return [ albums, albumsError ];

      return [ { topx: albums.album }, null ];
      break;
    }
  }
}