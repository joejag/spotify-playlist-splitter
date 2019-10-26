import { go } from './core/spotify_splitter'

export const hello = (event, context, callback) => {
  go((err, res) => {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err,
          message: res
        })
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: res
        })
      })
    }
  })
}
