import { deepEqual, equal } from 'assert'
import { extractHeader } from './extractor'

const code1 = `
/*! module.exports = {
  a: 1,
  b: 2
} !*/
123
`

const code2 = `
//!module.exports = {
//!  a: 1,
//!  b: 2
//!}
123
`

const code3 = `
##!module.exports = {
##!  a: 1,
##!  b: 2
##!}
123
`

const code4 = `
/*! 123456
*/
`

const result = {
  header: `module.exports = {
  a: 1,
  b: 2
}`,
  body: '123\n'
}

describe('Header extractor', () => {
  it('/*! header !*/', () => {
    deepEqual(extractHeader(code1), result)
  })
  it('//! header', () => {
    deepEqual(extractHeader(code2), result)
  })
  it('##! header', () => {
    deepEqual(extractHeader(code3), result)
  })
  it('invalid header', () => {
    equal(extractHeader(code4), false)
  })
})
