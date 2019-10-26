import SpotifyWebApi from 'spotify-web-api-node'
import { chunk } from '../core/arrays'

var spotifyApi = new SpotifyWebApi({
  clientId: 'b899d386f8034b089f9b77e41515ec1d',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

const SPOTIFY_TRACKS_LIMIT = 100

const fetchPaginatedPlaylist = async (connectedSpotifyApi, playlistId, totalTracksOnPlaylist) => {
  const callsToMake = Math.ceil(totalTracksOnPlaylist / SPOTIFY_TRACKS_LIMIT)
  const offsets = [...Array(callsToMake).keys()].map((i) => (i * SPOTIFY_TRACKS_LIMIT))

  const allTracks = await Promise.all(offsets.map(async (offset) => {
    return connectedSpotifyApi.getPlaylistTracks(playlistId,
      {
        limit: SPOTIFY_TRACKS_LIMIT,
        offset: offset
      })
  }))

  const combinedTracks = allTracks.reduce((a, c) => a.concat(c.body.items), [])
  return combinedTracks
}

export const fetchPlaylist = (playlistId) => {
  return new Promise((resolve, reject) => {
    spotifyApi.clientCredentialsGrant().then(
      function (data) {
        spotifyApi.setAccessToken(data.body.access_token)

        spotifyApi.getPlaylistTracks(playlistId, { limit: SPOTIFY_TRACKS_LIMIT }).then(
          async function (data) {
            const totalTracksOnPlaylist = data.body.total
            if (totalTracksOnPlaylist <= SPOTIFY_TRACKS_LIMIT) {
              resolve(data.body)
            } else {
              const combinedTracks = await fetchPaginatedPlaylist(spotifyApi, playlistId, totalTracksOnPlaylist)
              resolve({ items: combinedTracks })
            }
          },
          function (err) {
            reject(err, 'cannot get playlist')
          }
        )
      },
      function (err) {
        reject(err, 'Something went wrong when retrieving an access token')
      }
    )
  })
}

const SPOTIFY_LOOKUP_LIMIT = 50

export const fetchArtists = (artists) => {
  return new Promise((resolve, reject) => {
    spotifyApi.clientCredentialsGrant().then(
      async function (data) {
        spotifyApi.setAccessToken(data.body.access_token)

        try {
          const data = await Promise.all(
            chunk(artists, SPOTIFY_LOOKUP_LIMIT).map(async (chunkOfArtists) => {
              const partialResults = await spotifyApi.getArtists(chunkOfArtists)
              return partialResults.body
            }))
          resolve({ artists: data.reduce((acc, current) => acc.concat(current.artists), []) })
        } catch (err) {
          console.error('cannot get artists', err, artists)
          reject(err)
        }
      },
      function (err) {
        console.error('Something went wrong when retrieving an access token')
        reject(err)
      }
    )
  })
}
