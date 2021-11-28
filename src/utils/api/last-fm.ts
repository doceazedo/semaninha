import dotenv from 'dotenv';
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
    const deezer = await(await fetch(`https://api.deezer.com/search?q=${track.name} ${track.artist.name}`)).json();
    if (!deezer.total) continue; // TODO: use cover from last.fm as placeholder/fallback
    track.image = deezer.data[0].album.cover_big; // TODO: return all sizes
  }

  return [
    data.toptracks,
    null
  ];
}