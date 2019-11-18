import { fetchPlaylistInformation } from './core/spotify_splitter'

export const playlistInfo = (event, context, callback) => {
  if (!event || !event.pathParameters || !event.pathParameters.id) {
    callback(null, { statusCode: 404, body: '' })
    return
  }

  fetchPlaylistInformation(event.pathParameters.id, (err, res) => {
    if (err) {
      callback(null, {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          error: err,
          message: res
        })
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(
          res
        )
      })
    }
  })
}
