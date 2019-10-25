/* eslint-env jest */
import { helloFn } from './hello'

test('correct greeting is generated', () => {
  expect(helloFn('fixed'))
    .toBe('Hello, the current time is fixed.')
})
