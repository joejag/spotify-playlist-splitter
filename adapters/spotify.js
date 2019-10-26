var SpotifyWebApi = require('spotify-web-api-node')

var spotifyApi = new SpotifyWebApi({
  clientId: 'b899d386f8034b089f9b77e41515ec1d',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

export const fetchPlaylist = (playlistId, callback) => {
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      spotifyApi.setAccessToken(data.body.access_token)

      spotifyApi.getPlaylist(playlistId).then(
        function (data) {
          callback(null, data.body)
        },
        function (err) {
          callback(err, 'cannot get album')
        }
      )
    },
    function (err) {
      callback(err, 'Something went wrong when retrieving an access token')
    }
  )
}
