import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = process.env.REACT_APP_SPOTIFY_TOKEN_URL;
const SEARCH_URL = 'https://api.spotify.com/v1/search';

let accessToken = null;

const fetchAccessToken = async () => {
  try {
    const response = await axios.post(TOKEN_URL, null, {
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
    });
    accessToken = response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

const fetchWithRetry = async (url, options = {}, retries = 3) => {
  try {
    const response = await axios(url, options);
    return response;
  } catch (error) {
    if (retries > 0 && error.response && error.response.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 1;
      console.log(`Rate limit hit, retrying after ${retryAfter} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const fetchTracks = async (query) => {
  if (!accessToken) {
    await fetchAccessToken();
  }

  try {
    const response = await fetchWithRetry(SEARCH_URL, {
      params: {
        q: `${query} ASMR`,
        type: 'track',
        limit: 15,
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data.tracks.items.map(track => ({
      title: track.name,
      imageUrl: track.album.images[0]?.url || '',
      audioUrl: track.preview_url,
      author: track.artists[0].name,
      views: track.popularity,
    }));
  } catch (error) {
    console.error('Error fetching tracks from Spotify:', error);
    throw error;
  }
};
