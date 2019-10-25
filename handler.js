import { helloFn } from './core/hello'

export const hello = (event, context, callback) => {
  const message = helloFn()
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message
    })
  })
}
