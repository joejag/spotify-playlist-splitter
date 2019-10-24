export const helloFn = (time = new Date().toTimeString()) => `Hello, the current time is ${time}.`

export const hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: helloFn()
    })
  }

  callback(null, response)
}
