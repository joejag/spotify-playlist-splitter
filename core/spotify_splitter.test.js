/* eslint-env jest */
import { fetchPlaylistInformation } from './spotify_splitter'
import { fetchPlaylist, fetchArtists } from '../adapters/spotify'
jest.mock('../adapters/spotify')

// https://www.reddit.com/r/indieheads/comments/deja9p/pitchfork_the_200_best_songs_of_the_2010s/
// Target: https://open.spotify.com/playlist/16FzcfDid0m2i2EttomvSR?si=2x1eFR1ZTOuT_jjcPekDIg

export const simplePlaylist = {
  collaborative: false,
  description: '',
  external_urls: { spotify: 'https://open.spotify.com/playlist/4BcevT4vD6DfvR0bziEsry' },
  followers: { href: null, total: 0 },
  href: 'https://api.spotify.com/v1/playlists/4BcevT4vD6DfvR0bziEsry',
  id: '4BcevT4vD6DfvR0bziEsry',
  images: [{ height: 640, url: 'https://i.scdn.co/image/ab67616d0000b27374a77e48d8042b1b53280660', width: 640 }],
  name: 'Test playlist',
  owner: { display_name: 'joe_jag', external_urls: { spotify: 'https://open.spotify.com/user/joe_jag' }, href: 'https://api.spotify.com/v1/users/joe_jag', id: 'joe_jag', type: 'user', uri: 'spotify:user:joe_jag' },
  primary_color: null,
  public: true,
  snapshot_id: 'NSw0NGU3ZjA0M2EzM2EzODZmMWNhNjM5MjcwMWExNWY3ZWU4NTViN2Jh',
  tracks: {
    href: 'https://api.spotify.com/v1/playlists/4BcevT4vD6DfvR0bziEsry/tracks?offset=0&limit=100',
    items: [
      { added_at: '2019-10-26T19:01:14Z', added_by: { external_urls: { spotify: 'https://open.spotify.com/user/joe_jag' }, href: 'https://api.spotify.com/v1/users/joe_jag', id: 'joe_jag', type: 'user', uri: 'spotify:user:joe_jag' }, is_local: false, primary_color: null, track: { album: { album_type: 'album', artists: [{ external_urls: { spotify: 'https://open.spotify.com/artist/6mKqFxGMS5TGDZI3XkT5Rt' }, href: 'https://api.spotify.com/v1/artists/6mKqFxGMS5TGDZI3XkT5Rt', id: '6mKqFxGMS5TGDZI3XkT5Rt', name: 'Angel Olsen', type: 'artist', uri: 'spotify:artist:6mKqFxGMS5TGDZI3XkT5Rt' }], available_markets: ['AD', 'AE', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO', 'JP', 'KW', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY', 'QA', 'RO', 'SA', 'SE', 'SG', 'SK', 'SV', 'TH', 'TN', 'TR', 'TW', 'US', 'UY', 'VN', 'ZA'], external_urls: { spotify: 'https://open.spotify.com/album/5M8xQaQZuW2LZGVXZ3mlKN' }, href: 'https://api.spotify.com/v1/albums/5M8xQaQZuW2LZGVXZ3mlKN', id: '5M8xQaQZuW2LZGVXZ3mlKN', images: [{ height: 640, url: 'https://i.scdn.co/image/ab67616d0000b27374a77e48d8042b1b53280660', width: 640 }, { height: 300, url: 'https://i.scdn.co/image/ab67616d00001e0274a77e48d8042b1b53280660', width: 300 }, { height: 64, url: 'https://i.scdn.co/image/ab67616d0000485174a77e48d8042b1b53280660', width: 64 }], name: 'MY WOMAN', release_date: '2016-09-02', release_date_precision: 'day', total_tracks: 10, type: 'album', uri: 'spotify:album:5M8xQaQZuW2LZGVXZ3mlKN' }, artists: [{ external_urls: { spotify: 'https://open.spotify.com/artist/6mKqFxGMS5TGDZI3XkT5Rt' }, href: 'https://api.spotify.com/v1/artists/6mKqFxGMS5TGDZI3XkT5Rt', id: '6mKqFxGMS5TGDZI3XkT5Rt', name: 'Angel Olsen', type: 'artist', uri: 'spotify:artist:6mKqFxGMS5TGDZI3XkT5Rt' }], available_markets: ['AD', 'AE', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO', 'JP', 'KW', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY', 'QA', 'RO', 'SA', 'SE', 'SG', 'SK', 'SV', 'TH', 'TN', 'TR', 'TW', 'US', 'UY', 'VN', 'ZA'], disc_number: 1, duration_ms: 202200, episode: false, explicit: false, external_ids: { isrc: 'US38Y1628403' }, external_urls: { spotify: 'https://open.spotify.com/track/5uZLsGY9fknBd5Rxr7AIss' }, href: 'https://api.spotify.com/v1/tracks/5uZLsGY9fknBd5Rxr7AIss', id: '5uZLsGY9fknBd5Rxr7AIss', is_local: false, name: 'Shut Up Kiss Me', popularity: 63, preview_url: 'https://p.scdn.co/mp3-preview/418a6b2d206e2ebee3baa3c3fa34e70c825f4fd4?cid=b899d386f8034b089f9b77e41515ec1d', track: true, track_number: 3, type: 'track', uri: 'spotify:track:5uZLsGY9fknBd5Rxr7AIss' }, video_thumbnail: { url: null } },
      { added_at: '2019-10-26T19:01:22Z', added_by: { external_urls: { spotify: 'https://open.spotify.com/user/joe_jag' }, href: 'https://api.spotify.com/v1/users/joe_jag', id: 'joe_jag', type: 'user', uri: 'spotify:user:joe_jag' }, is_local: false, primary_color: null, track: { album: { album_type: 'album', artists: [{ external_urls: { spotify: 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb' }, href: 'https://api.spotify.com/v1/artists/5INjqkS1o8h1imAzPqGZBb', id: '5INjqkS1o8h1imAzPqGZBb', name: 'Tame Impala', type: 'artist', uri: 'spotify:artist:5INjqkS1o8h1imAzPqGZBb' }], available_markets: ['AD', 'AE', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO', 'KW', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY', 'QA', 'RO', 'SA', 'SE', 'SG', 'SK', 'SV', 'TH', 'TN', 'TR', 'TW', 'US', 'UY', 'VN', 'ZA'], external_urls: { spotify: 'https://open.spotify.com/album/79dL7FLiJFOO0EoehUHQBv' }, href: 'https://api.spotify.com/v1/albums/79dL7FLiJFOO0EoehUHQBv', id: '79dL7FLiJFOO0EoehUHQBv', images: [{ height: 640, url: 'https://i.scdn.co/image/249248e704f34007898ef0465f3c2b1c521d4347', width: 640 }, { height: 300, url: 'https://i.scdn.co/image/fb287005a4c80e87ad8d3eee6a01ff4b979ac0fb', width: 300 }, { height: 64, url: 'https://i.scdn.co/image/2e0f9ea6d3a71fb5583f3abb798f12aa4eac8563', width: 64 }], name: 'Currents', release_date: '2015-07-17', release_date_precision: 'day', total_tracks: 13, type: 'album', uri: 'spotify:album:79dL7FLiJFOO0EoehUHQBv' }, artists: [{ external_urls: { spotify: 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb' }, href: 'https://api.spotify.com/v1/artists/5INjqkS1o8h1imAzPqGZBb', id: '5INjqkS1o8h1imAzPqGZBb', name: 'Tame Impala', type: 'artist', uri: 'spotify:artist:5INjqkS1o8h1imAzPqGZBb' }], available_markets: ['AD', 'AE', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO', 'KW', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY', 'QA', 'RO', 'SA', 'SE', 'SG', 'SK', 'SV', 'TH', 'TN', 'TR', 'TW', 'US', 'UY', 'VN', 'ZA'], disc_number: 1, duration_ms: 467586, episode: false, explicit: false, external_ids: { isrc: 'AUUM71500292' }, external_urls: { spotify: 'https://open.spotify.com/track/2X485T9Z5Ly0xyaghN73ed' }, href: 'https://api.spotify.com/v1/tracks/2X485T9Z5Ly0xyaghN73ed', id: '2X485T9Z5Ly0xyaghN73ed', is_local: false, name: 'Let It Happen', popularity: 76, preview_url: null, track: true, track_number: 1, type: 'track', uri: 'spotify:track:2X485T9Z5Ly0xyaghN73ed' }, video_thumbnail: { url: null } },
      { added_at: '2019-10-26T19:01:44Z', added_by: { external_urls: { spotify: 'https://open.spotify.com/user/joe_jag' }, href: 'https://api.spotify.com/v1/users/joe_jag', id: 'joe_jag', type: 'user', uri: 'spotify:user:joe_jag' }, is_local: false, primary_color: null, track: { album: { album_type: 'album', artists: [{ external_urls: { spotify: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4' }, href: 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4', id: '3TVXtAsR1Inumwj472S9r4', name: 'Drake', type: 'artist', uri: 'spotify:artist:3TVXtAsR1Inumwj472S9r4' }], available_markets: ['AD', 'AE', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO', 'JP', 'KW', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY', 'QA', 'RO', 'SA', 'SE', 'SG', 'SK', 'SV', 'TH', 'TN', 'TR', 'TW', 'US', 'UY', 'VN', 'ZA'], external_urls: { spotify: 'https://open.spotify.com/album/1ATL5GLyefJaxhQzSPVrLX' }, href: 'https://api.spotify.com/v1/albums/1ATL5GLyefJaxhQzSPVrLX', id: '1ATL5GLyefJaxhQzSPVrLX', images: [{ height: 640, url: 'https://i.scdn.co/image/e6d17a95cac4810507dfb0a8242e4463d4c32a30', width: 640 }, { height: 300, url: 'https://i.scdn.co/image/9f5fa5dfc5e084427eb4627a87bfafb2f200e3a4', width: 300 }, { height: 64, url: 'https://i.scdn.co/image/ed0e8b6ee4bcdb0565e99bdeb3465eabc8b25bb3', width: 64 }], name: 'Scorpion', release_date: '2018-06-29', release_date_precision: 'day', total_tracks: 25, type: 'album', uri: 'spotify:album:1ATL5GLyefJaxhQzSPVrLX' }, artists: [{ external_urls: { spotify: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4' }, href: 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4', id: '3TVXtAsR1Inumwj472S9r4', name: 'Drake', type: 'artist', uri: 'spotify:artist:3TVXtAsR1Inumwj472S9r4' }], available_markets: ['AD', 'AE', 'AR', 'AT', 'AU', 'BE', 'BG', 'BH', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO', 'JP', 'KW', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY', 'QA', 'RO', 'SA', 'SE', 'SG', 'SK', 'SV', 'TH', 'TN', 'TR', 'TW', 'US', 'UY', 'VN', 'ZA'], disc_number: 1, duration_ms: 198973, episode: false, explicit: true, external_ids: { isrc: 'USCM51800004' }, external_urls: { spotify: 'https://open.spotify.com/track/6DCZcSspjsKoFjzjrWoCdn' }, href: 'https://api.spotify.com/v1/tracks/6DCZcSspjsKoFjzjrWoCdn', id: '6DCZcSspjsKoFjzjrWoCdn', is_local: false, name: "God's Plan", popularity: 86, preview_url: null, track: true, track_number: 5, type: 'track', uri: 'spotify:track:6DCZcSspjsKoFjzjrWoCdn' }, video_thumbnail: { url: null } }
    ],
    limit: 100,
    next: null,
    offset: 0,
    previous: null,
    total: 3
  },
  type: 'playlist',
  uri: 'spotify:playlist:4BcevT4vD6DfvR0bziEsry'
}

const artistsCannedResponse = {
  artists:
  [{
    external_urls: { spotify: 'https://open.spotify.com/artist/6mKqFxGMS5TGDZI3XkT5Rt' },
    followers: { href: null, total: 224704 },
    genres: ['alternative americana', 'art pop', 'chamber pop', 'dream pop', 'electropop', 'folk-pop', 'freak folk', 'indie folk', 'indie pop', 'indie rock', 'modern rock'],
    href: 'https://api.spotify.com/v1/artists/6mKqFxGMS5TGDZI3XkT5Rt',
    id: '6mKqFxGMS5TGDZI3XkT5Rt',
    images: [{ height: 640, url: 'https://i.scdn.co/image/18712a31eb800ec911d34a8f0bc758ddedaae3a9', width: 640 }, { height: 320, url: 'https://i.scdn.co/image/de1d6f3587157041234f4d9b30056e468d716653', width: 320 }, { height: 160, url: 'https://i.scdn.co/image/d6b507f6fc27fcc9962c4af5a99eaeea949db133', width: 160 }],
    name: 'Angel Olsen',
    popularity: 67,
    type: 'artist',
    uri: 'spotify:artist:6mKqFxGMS5TGDZI3XkT5Rt'
  }, {
    external_urls: { spotify: 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb' },
    followers: { href: null, total: 2909141 },
    genres: ['australian psych', 'neo-psychedelic', 'psychedelic rock'],
    href: 'https://api.spotify.com/v1/artists/5INjqkS1o8h1imAzPqGZBb',
    id: '5INjqkS1o8h1imAzPqGZBb',
    images: [{ height: 640, url: 'https://i.scdn.co/image/d258f00c11f658bc5d3fbe0b5491200996836e86', width: 640 }, { height: 320, url: 'https://i.scdn.co/image/b3140c45c6dbd8cffd1929308985552d084adeb9', width: 320 }, { height: 160, url: 'https://i.scdn.co/image/3e9f73171c582eb9173b7e791625d3c17f7bca1b', width: 160 }],
    name: 'Tame Impala',
    popularity: 80,
    type: 'artist',
    uri: 'spotify:artist:5INjqkS1o8h1imAzPqGZBb'
  }, {
    external_urls: { spotify: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4' },
    followers: { href: null, total: 41552229 },
    genres: ['canadian hip hop', 'canadian pop', 'hip hop', 'pop rap', 'rap', 'toronto rap'],
    href: 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4',
    id: '3TVXtAsR1Inumwj472S9r4',
    images: [{ height: 640, url: 'https://i.scdn.co/image/012ecd119617ac24ab56620ace4b81735b172686', width: 640 }, { height: 320, url: 'https://i.scdn.co/image/55e3fb26d67b4d71321440b3a440eecd9d8f20f7', width: 320 }, { height: 160, url: 'https://i.scdn.co/image/ad10179d5f27ba77c7d6c95abd6e26f6a227e0d5', width: 160 }],
    name: 'Drake',
    popularity: 97,
    type: 'artist',
    uri: 'spotify:artist:3TVXtAsR1Inumwj472S9r4'
  }]
}

test('it maps fields across', async (done) => {
  fetchPlaylist.mockImplementation((_) => Promise.resolve(simplePlaylist))
  fetchArtists.mockImplementation((_) => Promise.resolve(artistsCannedResponse))

  fetchPlaylistInformation(simplePlaylist.id, (_, data) => {
    expect(data.clean).toStrictEqual([
      {
        artists: ['Angel Olsen'],
        title: 'Shut Up Kiss Me',
        artistId: '6mKqFxGMS5TGDZI3XkT5Rt',
        genres: [
          'alternative americana',
          'art pop',
          'chamber pop',
          'dream pop',
          'electropop',
          'folk-pop',
          'freak folk',
          'indie folk',
          'indie pop',
          'indie rock',
          'modern rock'
        ]
      },
      {
        artists: ['Tame Impala'],
        title: 'Let It Happen',
        artistId: '5INjqkS1o8h1imAzPqGZBb',
        genres: [
          'australian psych',
          'neo-psychedelic',
          'psychedelic rock'
        ]
      },
      {
        artists: ['Drake'],
        title: "God's Plan",
        artistId: '3TVXtAsR1Inumwj472S9r4',
        genres: [
          'canadian hip hop',
          'canadian pop',
          'hip hop',
          'pop rap',
          'rap',
          'toronto rap'
        ]
      }
    ])

    done()
  })
})
