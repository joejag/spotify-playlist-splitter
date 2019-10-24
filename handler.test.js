/* eslint-env jest */
import * as handler from './handler'

test('correct greeting is generated', () => {
  expect(handler.helloFn('fixed'))
    .toBe('Hello, the current time is fixed.')
})
