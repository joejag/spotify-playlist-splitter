var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: 'b899d386f8034b089f9b77e41515ec1d',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

export const fetchPlaylist = (playlistId) => {
  return new Promise((resolve, reject) => {
    spotifyApi.clientCredentialsGrant().then(
      function (data) {
        spotifyApi.setAccessToken(data.body.access_token)

        spotifyApi.getPlaylist(playlistId).then(
          function (data) {
            resolve(data.body)
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

function chunk (array, size) {
  const chunkedArray = []
  let index = 0
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index))
    index += size
  }
  return chunkedArray
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
